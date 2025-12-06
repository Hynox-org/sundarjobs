import { ThemedText } from '@/components/themed-text';
import SelectionModal from "@/components/ui/SelectionModal";
import { JOB_CATEGORIES } from "@/constants/jobCategories";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from "@/lib/supabase";
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

interface AdditionalJob {
  job_title: string;
  vacancy: number;
  experience: string;
}

interface FormData {
  id?: string;
  title: string;
  jobTitle: string;
  vacancy: string;
  category: string;
  experience: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  additional_jobs?: AdditionalJob[];
  isDraft?: boolean;
  templateId?: string;
  templateStyle?: string;
}

export default function PostJobsScreen() {
  const [form, setForm] = useState<FormData>({
    title: "",
    jobTitle: "",
    vacancy: "",
    category: "",
    experience: "",
    companyName: "",
    companyAddress: "",
    companyEmail: "",
    companyPhone: "",
    additional_jobs: [],
  });

  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const router = useRouter();
  const params = useLocalSearchParams();
  const { jobId } = params;
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const textColor = Colors[colorScheme ?? 'light'].text;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (jobId) {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", jobId)
          .single();

        if (error) {
          console.error("Error fetching job details:", error);
          Alert.alert("Error", "Error fetching job details.");
          router.replace("/posts");
          return;
        }

        if (data) {
          setForm({
            id: data.id,
            title: data.title,
            jobTitle: data.job_title,
            vacancy: data.vacancy?.toString(),
            category: data.category,
            experience: data.experience?.toString(),
            companyName: data.company_name,
            companyAddress: data.company_address,
            companyEmail: data.company_email,
            companyPhone: data.company_phone,
            additional_jobs: data.additional_jobs || [],
            isDraft: data.is_draft,
          });
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [jobId]);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleAdditionalJobChange = (index: number, field: keyof AdditionalJob, value: string | number) => {
    if (!form.additional_jobs) return;
    const updatedJobs = [...form.additional_jobs];
    if (field === "vacancy" && typeof value === "string") {
      updatedJobs[index][field] = Number(value);
    } else {
      updatedJobs[index][field] = value as never;
    }
    setForm({ ...form, additional_jobs: updatedJobs });
  };

  const handleRemoveAdditionalJob = (index: number) => {
    if (!form.additional_jobs) return;
    const updatedJobs = form.additional_jobs.filter((_, i) => i !== index);
    setForm({ ...form, additional_jobs: updatedJobs });
  };

  const handleAddAdditionalJob = () => {
    if ((form.additional_jobs?.length ?? 0) >= 5) return;
    const newJob: AdditionalJob = { job_title: "", vacancy: 0, experience: "" };
    setForm((prev) => ({
      ...prev,
      additional_jobs: [...(prev.additional_jobs ?? []), newJob],
    }));
  };

  const handleSaveJob = async (action: "draft" | "template") => {
    const required: (keyof FormData)[] = [
      "title",
      "jobTitle",
      "vacancy",
      "category",
      "experience",
      "companyName",
    ];

    const newErrors: Partial<Record<keyof FormData, boolean>> = {};
    const missing = required.filter((key) => {
      if (!form[key]) {
        newErrors[key] = true;
        return true;
      }
      return false;
    });

    if (missing.length > 0) {
      setErrors(newErrors);
      Alert.alert("Missing Fields", `Please fill in: ${missing.join(", ")}`);
      return;
    }

    if (!form.companyPhone && !form.companyEmail && !form.companyAddress) {
      Alert.alert("Company Info Required", "Please provide at least one: email, phone, or address.");
      return;
    }

    if (!user) {
      Alert.alert("Error", "You must be logged in to post a job.");
      return;
    }

    try {
      const jobData = {
        title: form.title,
        job_title: form.jobTitle,
        vacancy: parseInt(form.vacancy, 10),
        category: form.category,
        experience: form.experience,
        company_name: form.companyName,
        company_address: form.companyAddress,
        company_email: form.companyEmail,
        company_phone: form.companyPhone,
        additional_jobs: form.additional_jobs?.filter(job =>
          job.job_title !== "" || job.vacancy !== 0 || job.experience !== ""
        ) || [],
        user_id: user.id,
        is_draft: action === "draft",
      };

      let data, error;
      if (form.id) {
        ({ data, error } = await supabase
          .from("jobs")
          .update(jobData)
          .eq("id", form.id)
          .select());
      } else {
        ({ data, error } = await supabase.from("jobs").insert([jobData]).select());
      }

      if (error) throw error;

      const newJobId = data?.[0]?.id || form.id;

      if (action === "draft") {
        Alert.alert("Success", "Job saved as draft!");
        router.push("/posts/all");
      } else if (action === "template") {
        router.push({
          pathname: "/posts/templates",
          params: { jobId: newJobId },
        });
      }
    } catch (e) {
      console.error("Error saving job post:", e);
      Alert.alert("Error", "Error saving job post.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Ionicons name={jobId ? "create-outline" : "add-circle-outline"} size={28} color={textColor} />
              <ThemedText style={[styles.heading, { color: textColor, marginBottom: 0 }]}>
                {jobId ? "Edit Job" : "Post New Job"}
              </ThemedText>
            </View>
            <ThemedText style={[styles.subheading, { color: textColor }]}>
              {jobId ? "Update your job details below" : "Fill in the details to create a job post"}
            </ThemedText>
          </View>

          {/* Job Information Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconTitleRow}>
                <Ionicons name="briefcase-outline" size={20} color="#111827" />
                <Text style={styles.cardTitle}>Job Information</Text>
              </View>
            </View>

            {/* Poster Title */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Poster Title <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                placeholder="e.g., Mega Hiring Drive 2025"
                placeholderTextColor="#9CA3AF"
                style={[styles.textInput, errors.title && styles.inputError]}
                value={form.title}
                onChangeText={(text) => handleChange("title", text)}
              />
            </View>

            {/* Job Position */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Job Position <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                placeholder="e.g., Software Engineer"
                placeholderTextColor="#9CA3AF"
                style={[styles.textInput, errors.jobTitle && styles.inputError]}
                value={form.jobTitle}
                onChangeText={(text) => handleChange("jobTitle", text)}
              />
            </View>

            {/* Vacancy & Experience Row */}
            <View style={styles.rowGroup}>
              <View style={styles.halfWidth}>
                <Text style={styles.inputLabel}>
                  Vacancies <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  placeholder="5"
                  placeholderTextColor="#9CA3AF"
                  style={[styles.textInput, errors.vacancy && styles.inputError]}
                  keyboardType="numeric"
                  value={form.vacancy}
                  onChangeText={(text) => handleChange("vacancy", text)}
                />
              </View>

              <View style={styles.halfWidth}>
                <Text style={styles.inputLabel}>
                  Experience (years) <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  placeholder="2-5"
                  placeholderTextColor="#9CA3AF"
                  style={[styles.textInput, errors.experience && styles.inputError]}
                  value={form.experience}
                  onChangeText={(text) => handleChange("experience", text)}
                />
              </View>
            </View>

            {/* Category */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Category <Text style={styles.required}>*</Text>
              </Text>
              <TouchableOpacity
                style={[styles.selectInput, errors.category && styles.inputError]}
                onPress={() => setCategoryModalVisible(true)}
                activeOpacity={0.7}
              >
                <Text style={form.category ? styles.selectText : styles.selectPlaceholder}>
                  {form.category || "Select a category"}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Additional Jobs Card */}
          {form.additional_jobs && form.additional_jobs.length > 0 && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconTitleRow}>
                  <Ionicons name="layers-outline" size={20} color="#111827" />
                  <Text style={styles.cardTitle}>Additional Positions</Text>
                </View>
              </View>

              {form.additional_jobs.map((job: AdditionalJob, idx: number) => (
                <View key={idx} style={styles.additionalJobCard}>
                  <View style={styles.additionalJobHeader}>
                    <Text style={styles.additionalJobTitle}>Position {idx + 1}</Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveAdditionalJob(idx)}
                      style={styles.removeButton}
                      activeOpacity={0.7}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Ionicons name="trash-outline" size={14} color="#DC2626" />
                        <Text style={styles.removeButtonText}>Remove</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <TextInput
                    placeholder="Job Title"
                    placeholderTextColor="#9CA3AF"
                    style={[styles.textInput, styles.additionalInput]}
                    value={job.job_title}
                    onChangeText={(text) => handleAdditionalJobChange(idx, "job_title", text)}
                  />

                  <View style={styles.rowGroup}>
                    <View style={styles.halfWidth}>
                      <TextInput
                        placeholder="Vacancies"
                        placeholderTextColor="#9CA3AF"
                        style={styles.textInput}
                        keyboardType="numeric"
                        value={job.vacancy.toString()}
                        onChangeText={(text) => handleAdditionalJobChange(idx, "vacancy", text)}
                      />
                    </View>
                    <View style={styles.halfWidth}>
                      <TextInput
                        placeholder="Experience"
                        placeholderTextColor="#9CA3AF"
                        style={styles.textInput}
                        value={job.experience}
                        onChangeText={(text) => handleAdditionalJobChange(idx, "experience", text)}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Add Additional Job Button */}
          {(form.additional_jobs?.length ?? 0) < 5 && (
            <TouchableOpacity
              style={styles.addJobButton}
              onPress={handleAddAdditionalJob}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={20} color="#4F46E5" />
              <Text style={styles.addJobButtonText}>Add Another Position</Text>
            </TouchableOpacity>
          )}

          {/* Company Information Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconTitleRow}>
                <Ionicons name="business-outline" size={20} color="#111827" />
                <Text style={styles.cardTitle}>Company Information</Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Company Name <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                placeholder="e.g., TCS"
                placeholderTextColor="#9CA3AF"
                style={[styles.textInput, errors.companyName && styles.inputError]}
                value={form.companyName}
                onChangeText={(text) => handleChange("companyName", text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Company Location</Text>
              <TextInput
                placeholder="e.g., Coimbatore, Tamil Nadu"
                placeholderTextColor="#9CA3AF"
                style={styles.textInput}
                value={form.companyAddress}
                onChangeText={(text) => handleChange("companyAddress", text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Company Email</Text>
              <TextInput
                placeholder="e.g., careers@company.com"
                placeholderTextColor="#9CA3AF"
                style={styles.textInput}
                keyboardType="email-address"
                autoCapitalize="none"
                value={form.companyEmail}
                onChangeText={(text) => handleChange("companyEmail", text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Company Phone</Text>
              <TextInput
                placeholder="e.g., +91 98765 43210"
                placeholderTextColor="#9CA3AF"
                style={styles.textInput}
                keyboardType="phone-pad"
                value={form.companyPhone}
                onChangeText={(text) => handleChange("companyPhone", text)}
              />
            </View>

            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Ionicons name="information-circle-outline" size={20} color="#1E40AF" />
                <Text style={styles.infoText}>
                  Provide at least one contact method (email, phone, or location)
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Sticky Footer with Action Buttons */}
        <View style={styles.stickyFooter}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.draftButton]}
              onPress={() => handleSaveJob("draft")}
              activeOpacity={0.8}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Ionicons name="save-outline" size={20} color="#374151" />
                <Text style={[styles.buttonText, styles.draftButtonText]}>
                  Save Draft
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.primaryButton]}
              onPress={() => handleSaveJob("template")}
              activeOpacity={0.8}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={[styles.buttonText, styles.primaryButtonText]}>
                  Continue
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <SelectionModal
          isVisible={isCategoryModalVisible}
          data={JOB_CATEGORIES}
          onSelect={(value) => {
            handleChange("category", value);
            setCategoryModalVisible(false);
          }}
          onClose={() => setCategoryModalVisible(false)}
          title="Select Job Category"
          selectedValue={form.category}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F9FAFB",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  header: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.7,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardHeader: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  iconTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  required: {
    color: '#EF4444',
    fontWeight: '700',
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#111827',
    minHeight: 50,
  },
  inputError: {
    borderColor: '#EF4444',
    borderWidth: 2,
  },
  selectInput: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 15,
    color: '#111827',
    flex: 1,
  },
  selectPlaceholder: {
    fontSize: 15,
    color: '#9CA3AF',
    flex: 1,
  },
  selectArrow: {
    fontSize: 12,
    color: '#6B7280',
  },
  rowGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  additionalJobCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  additionalJobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  additionalJobTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },
  removeButton: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '700',
  },
  additionalInput: {
    marginBottom: 12,
  },
  addJobButton: {
    backgroundColor: '#EEF2FF',
    borderWidth: 2,
    borderColor: '#C7D2FE',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  addJobButtonText: {
    color: '#4F46E5',
    fontSize: 15,
    fontWeight: '700',
  },
  infoBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#1E40AF',
    lineHeight: 18,
    flex: 1,
  },
  // Sticky Footer
  stickyFooter: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  draftButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    ...Platform.select({
      ios: {
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  draftButtonText: {
    color: '#374151',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
});
