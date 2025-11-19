import { ThemedText } from '@/components/themed-text';
import SelectionModal from "@/components/ui/SelectionModal";
import { JOB_CATEGORIES } from "@/constants/jobCategories";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from "@/lib/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

interface AdditionalJob {
  job_title: string;
  vacancy: number;
  experience: string;
}

interface FormData {
  id?: string; // Add an optional ID for unique identification
  title: string;
  jobTitle: string;
  vacancy: string;
  // jobType: string;
  category: string;
  experience: string;
  // salary: string;
  // jobDescription: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  // applicationDeadline: string;
  // additionalInfo: string;
  additional_jobs?: AdditionalJob[];
  isDraft?: boolean; // Add isDraft flag
  templateId?: string; // Add templateId for selected template
  templateStyle?: string; // Add templateStyle for selected template style
}

export default function PostJobsScreen() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 768;
  const isMediumScreen = width >= 768 && width < 1024;

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
  const [isJobTypeModalVisible, setJobTypeModalVisible] = useState(false); // Keep this if jobType is reintroduced
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const router = useRouter();
  const params = useLocalSearchParams();
  const { jobId } = params;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (jobId) {
        // Fetch job details if jobId is present
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", jobId)
          .single();

        if (error) {
          console.error("Error fetching job details:", error);
          if (Platform.OS === "web") {
            alert("Error fetching job details.");
          } else {
            Alert.alert("Error", "Error fetching job details.");
          }
          router.replace("/posts"); // Redirect to post new job page on error
          return;
        }

        if (data) {
          setForm({
            id: data.id,
            title: data.title,
            jobTitle: data.job_title,
            vacancy: data.vacancy?.toString(),
            category: data.category,
            experience: data.experience,
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

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, boolean>>>({});

  // const jobTypes = [
  //   "Full Time",
  //   "Part Time",
  //   "Internship",
  //   "Contract",
  //   "Temporary",
  //   "Other",
  // ];

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
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
    if ((form.additional_jobs?.length ?? 0) >= 6) return;
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
      if (Platform.OS === "web") {
        alert(`Please fill in all required fields: ${missing.join(", ")}`);
      } else {
        Alert.alert("Missing Fields", `Please fill in: ${missing.join(", ")}`);
      }
      return;
    }

    if (!user) {
      if (Platform.OS === "web") {
        alert("You must be logged in to post a job.");
      } else {
        Alert.alert("Error", "You must be logged in to post a job.");
      }
      return;
      }

    try {
      const jobData = {
        title: form.title,
        job_title: form.jobTitle,
        vacancy: parseInt(form.vacancy, 10),
        // job_type: form.jobType,
        category: form.category,
        experience: form.experience,
        // salary: form.salary,
        // job_description: form.jobDescription,
        company_name: form.companyName,
        company_address: form.companyAddress,
        company_email: form.companyEmail,
        company_phone: form.companyPhone,
        // application_deadline: form.applicationDeadline || null,
        // additional_info: form.additionalInfo,
        additional_jobs: form.additional_jobs, // include additional jobs here
        user_id: user.id,
        is_draft: action === "draft",
      };

      // Filter out empty additional jobs before saving
      const filteredAdditionalJobs = jobData.additional_jobs?.filter(job => 
        job.job_title !== "" || job.vacancy !== 0 || job.experience !== ""
      ) || [];

      const jobDataToSave = {
        ...jobData,
        additional_jobs: filteredAdditionalJobs,
      };

      let data, error;
      if (form.id) {
        // Update existing job
        ({ data, error } = await supabase
          .from("jobs")
          .update(jobDataToSave)
          .eq("id", form.id)
          .select());
      } else {
        // Insert new job
        ({ data, error } = await supabase.from("jobs").insert([jobDataToSave]).select());
      }

      if (error) {
        throw error;
      }

      const newJobId = data?.[0]?.id || form.id; // Use existing form.id if updating, otherwise new ID
      console.log("Job post saved to Supabase with ID:", newJobId);

      if (action === "draft") {
        if (Platform.OS === "web") {
          alert("Job saved as draft!");
        } else {
          Alert.alert("Success", "Job saved as draft!");
        }
        router.push("/posts/all"); // Redirect to all jobs page to see the saved draft
      } else if (action === "template") {
        if (Platform.OS === "web") {
          alert("Proceeding to template selection!");
        } else {
          Alert.alert("Success", "Proceeding to template selection!");
        }
        router.push({
          pathname: "/posts/templates",
          params: { jobId: newJobId },
        }); // Pass jobId to template page
      }
    } catch (e) {
      console.error("Error saving job post to Supabase:", e);
      if (Platform.OS === "web") {
        alert("Error saving job post.");
      } else {
        Alert.alert("Error", "Error saving job post.");
      }
    }
  };

  const containerPadding = isSmallScreen ? 16 : isMediumScreen ? 40 : 80;

  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const textColor = Colors[colorScheme ?? 'light'].text;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading job details...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardView}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingHorizontal: containerPadding },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText type="title" style={[styles.heading, { color: textColor }]}>
            {jobId ? "Edit Job Post" : "Post a New Job"}
          </ThemedText>
          <ThemedText type="subtitle" style={[styles.subheading, { color: textColor }]}>
            {jobId ? "Edit the job application details below." : "Fill out the form below to post a job application."}
          </ThemedText>
        </View>

        {/* Job Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Information</Text>

          {/* Title */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Poster Title <Text style={styles.required}>*</Text></Text>
            <TextInput
              placeholder="e.g., Mega Hiring Drive 2025"
              placeholderTextColor="#9CA3AF"
              style={[
                styles.input,
                errors.title && styles.inputError,
              ]}
              value={form.title}
              onChangeText={(text) => handleChange("title", text)}
            />
          </View>

          {/* Job Title & Vacancy */}
          <View style={[styles.row, isSmallScreen && styles.column]}>
            <View style={[styles.formGroup, styles.flex1]}>
              <Text style={styles.label}>
                Job Position <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                placeholder="e.g., Software Engineer"
                placeholderTextColor="#9CA3AF"
                style={[
                  styles.input,
                  errors.jobTitle && styles.inputError,
                ]}
                value={form.jobTitle}
                onChangeText={(text) => handleChange("jobTitle", text)}
              />
            </View>

            <View style={[styles.formGroup, styles.flex1]}>
              <Text style={styles.label}>
                Number of Vacancies <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                placeholder="e.g., 5"
                placeholderTextColor="#9CA3AF"
                style={[
                  styles.input,
                  errors.vacancy && styles.inputError,
                ]}
                keyboardType="numeric"
                value={form.vacancy}
                onChangeText={(text) => handleChange("vacancy", text)}
              />
            </View>
          </View>

          {/* Category & Job Type */}
          <View style={[styles.row, isSmallScreen && styles.column]}>
            <View style={[styles.formGroup, styles.flex1]}>
              <Text style={styles.label}>Category <Text style={styles.required}>*</Text></Text>
              <TouchableOpacity
                style={[
                  styles.pickerWrapper,
                  errors.category && styles.inputError,
                  styles.touchablePicker,
                ]}
                onPress={() => setCategoryModalVisible(true)}
              >
                <Text style={form.category ? styles.pickerText : styles.placeholderText}>{form.category || "Select a category"}</Text>
              </TouchableOpacity>
            </View>

            {/* Uncomment if needed for job type */}
            {/* <View style={[styles.formGroup, styles.flex1]}>
              <Text style={styles.label}>Job Type</Text>
              <TouchableOpacity
                style={[styles.pickerWrapper, styles.touchablePicker]}  
                onPress={() => setJobTypeModalVisible(true)}
              >
                <Text style={form.jobType ? styles.pickerText : styles.placeholderText}>
                  {form.jobType || "Select job type"}
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>

          {/* Experience & Salary */}
          <View style={[styles.row, isSmallScreen && styles.column]}>
            <View style={[styles.formGroup, styles.flex1]}>
              <Text style={styles.label}>
                Experience Required <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                placeholder="e.g., Fresher or 2-5 years"
                placeholderTextColor="#9CA3AF"
                style={[
                  styles.input,
                  errors.experience && styles.inputError,
                ]}
                value={form.experience}
                onChangeText={(text) => handleChange("experience", text)}
              />
            </View>

            {/* Uncomment if needed for salary */}
            {/* <View style={[styles.formGroup, styles.flex1]}>
              <Text style={styles.label}>Salary Range</Text>
              <TextInput
                placeholder="e.g., 3-5 LPA"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                value={form.salary}
                onChangeText={(text) => handleChange("salary", text)}
              />
            </View> */}
          </View>

          {/* Additional Jobs Section */}
          <View style={{ marginVertical: 20 }}>
            <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>Additional Job Positions</Text>
              {form.additional_jobs?.map((job: AdditionalJob, idx: number) => (
                <View key={idx} style={{ marginBottom: 16, borderWidth: 1, borderColor: '#e0e0e0', padding: 12, borderRadius: 8 }}>
                  <TextInput
                    placeholder="Job Title"
                    style={[styles.input, { marginBottom: 10 }]}
                    value={job.job_title}
                    onChangeText={(text) => handleAdditionalJobChange(idx, "job_title", text)}
                  />
                  <TextInput
                    placeholder="Vacancy"
                    style={[styles.input, { marginBottom: 10 }]}
                    keyboardType="numeric"
                    value={job.vacancy.toString()}
                    onChangeText={(text) => handleAdditionalJobChange(idx, "vacancy", text)}
                  />
                  <TextInput
                    placeholder="Experience"
                    style={[styles.input, { marginBottom: 10 }]}
                    value={job.experience}
                    onChangeText={(text) => handleAdditionalJobChange(idx, "experience", text)}
                  />
                  <TouchableOpacity
                    style={[styles.submitBtn, { backgroundColor: "#EF4444" }]}
                    onPress={() => handleRemoveAdditionalJob(idx)}
                  >
                    <Text style={styles.submitText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
              {(form.additional_jobs?.length ?? 0) < 5 && (
                <TouchableOpacity style={[styles.submitBtn, { backgroundColor: "#2563EB" }]} onPress={handleAddAdditionalJob}>
                  <Text style={styles.submitText}>Add Another Job Position</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          {/* Company Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Company Information</Text>
            
            {/* Company Name & Address */}
            <View style={[styles.row, isSmallScreen && styles.column]}>
              <View style={[styles.formGroup, styles.flex1]}>
                <Text style={styles.label}>Company Name <Text style={styles.required}>*</Text></Text>
                <TextInput
                  placeholder="e.g., TCS"
                  placeholderTextColor="#9CA3AF"
                  style={[
                    styles.input,
                    errors.companyName && styles.inputError,
                  ]}
                  value={form.companyName}
                  onChangeText={(text) => handleChange("companyName", text)}
                />
              </View>

              <View style={[styles.formGroup, styles.flex1]}>
                <Text style={styles.label}>Company Location</Text>
                <TextInput
                  placeholder="e.g., Coimbatore, Tamil Nadu"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  value={form.companyAddress}
                  onChangeText={(text) => handleChange("companyAddress", text)}
                />
              </View>
            </View>
            
            {/* Company Email & Phone */}
            <View style={[styles.row, isSmallScreen && styles.column]}>
              <View style={[styles.formGroup, styles.flex1]}>
                <Text style={styles.label}>Company Email</Text>
                <TextInput
                  placeholder="e.g., careers@company.com"
                  placeholderTextColor="#9CA3AF"
                  style={[
                    styles.input,
                  ]}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={form.companyEmail}
                  onChangeText={(text) => handleChange("companyEmail", text)}
                />
              </View>

              <View style={[styles.formGroup, styles.flex1]}>
                <Text style={styles.label}>Company Phone</Text>
                <TextInput
                  placeholder="e.g., +91 98765 43210"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  keyboardType="phone-pad"
                  value={form.companyPhone}
                  onChangeText={(text) => handleChange("companyPhone", text)}
                />
              </View>
            </View>
          </View>
          
          {/* Additional Details Section */}
          {/* <View style={styles.section}> */}
            {/* <Text style={styles.sectionTitle}>Additional Details</Text> */}
            
            {/* Application Deadline */}
            {/* <View style={styles.formGroup}> */}
              {/* <Text style={styles.label}>Application Deadline</Text> */}
              {/* <TextInput
                placeholder="e.g., 2025-12-31"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                value={form.applicationDeadline}
                onChangeText={(text) => handleChange("applicationDeadline", text)}
              />
              <Text style={styles.helperText}>Format: YYYY-MM-DD</Text> */}
            {/* </View> */}
            
            {/* Additional Info */}
            {/* <View style={styles.formGroup}> */}
              {/* <Text style={styles.label}>Additional Information</Text>
              <TextInput
                placeholder="Interview process, benefits, contact details, etc."
                placeholderTextColor="#9CA3AF"
                style={[styles.input, styles.textarea]}
                multiline
                numberOfLines={4}
                value={form.additionalInfo}
                onChangeText={(text) => handleChange("additionalInfo", text)}
              /> */}
            {/* </View> */}
          {/* </View> */}

        {/* Action Buttons */}
        <View style={[styles.row, isSmallScreen && styles.column, styles.buttonGroup]}>
          <TouchableOpacity
            style={[styles.submitBtn, styles.draftBtn, styles.flex1]}
            onPress={() => handleSaveJob("draft")}
            activeOpacity={0.8}
          >
            <Text style={styles.submitText}>Save as Draft</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitBtn, styles.proceedBtn, styles.flex1]}
            onPress={() => handleSaveJob("template")}
            activeOpacity={0.8}
          >
            <Text style={styles.submitText}>Proceed with Templates</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Padding for mobile */}
        <View style={{ height: 40 }} />
      </ScrollView>

      <SelectionModal
        isVisible={isCategoryModalVisible}
        data={JOB_CATEGORIES}
        onSelect={(value) => handleChange("category", value)}
        onClose={() => setCategoryModalVisible(false)}
        title="Select Job Category"
        selectedValue={form.category}
      />
      
      {/* <SelectionModal
        isVisible={isJobTypeModalVisible}
        data={jobTypes}
        onSelect={(value) => {
          handleChange("jobType", value);
          setJobTypeModalVisible(false);
        }}
        onClose={() => setJobTypeModalVisible(false)}
        title="Select Job Type"
        selectedValue={form.jobType}
      /> */}
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  container: {
    paddingVertical: 24,
    backgroundColor: "#F9FAFB",
    ...Platform.select({
      web: {
        maxWidth: 1200,
        marginHorizontal: "auto",
        width: "100%",
      },
    }),
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
    ...Platform.select({
      web: {
        fontSize: 32,
      },
    }),
  },
  subheading: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  required: {
    color: "#EF4444",
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#111827",
    minHeight: 48,
    ...Platform.select({
      web: {
        // outlineStyle: "none", // Removed due to type incompatibility
        // transition: "border-color 0.2s, box-shadow 0.2s", // Removed due to type incompatibility
      },
    }),
  },
  inputError: {
    borderColor: "#EF4444",
    borderWidth: 2,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    minHeight: 48,
    justifyContent: "center",
  },
  touchablePicker: {
    paddingHorizontal: 14,
  },
  pickerText: {
    fontSize: 15,
    color: "#111827",
    paddingVertical: 12,
  },
  placeholderText: {
    fontSize: 15,
    color: "#9CA3AF",
    paddingVertical: 12,
  },
  textarea: {
    height: 120,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  helperText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    fontStyle: "italic",
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  column: {
    flexDirection: "column",
  },
  flex1: {
    flex: 1,
  },
  buttonGroup: {
    marginTop: 20,
    justifyContent: "space-between",
  },
  submitBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)",
        cursor: "pointer",
        transition: "background-color 0.2s, transform 0.1s",
      },
    }),
  },
  draftBtn: {
    backgroundColor: "#6B7280", // A different color for draft
  },
  proceedBtn: {
    backgroundColor: "#2563EB",
  },
  submitText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F9FAFB",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
});
