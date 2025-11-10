import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { JOB_CATEGORIES } from "@/constants/jobCategories";
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

interface FormData {
  title: string;
  jobTitle: string;
  vacancy: string;
  jobType: string;
  category: string;
  experience: string;
  salary: string;
  jobDescription: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  applicationDeadline: string;
  additionalInfo: string;
}

export default function JobForm() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 768;
  const isMediumScreen = width >= 768 && width < 1024;

  const [form, setForm] = useState<FormData>({
    title: "",
    jobTitle: "",
    vacancy: "",
    jobType: "",
    category: "",
    experience: "",
    salary: "",
    jobDescription: "",
    companyName: "",
    companyAddress: "",
    companyEmail: "",
    companyPhone: "",
    applicationDeadline: "",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const jobTypes = [
    "Full Time",
    "Part Time",
    "Internship",
    "Contract",
    "Temporary",
    "Other",
  ];

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = () => {
    const required: (keyof FormData)[] = [
      "title",
      "jobTitle",
      "vacancy",
      "category",
      "experience",
      "jobDescription",
      "companyEmail",
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

    if (Platform.OS === "web") {
      alert("Form submitted successfully!");
    } else {
      Alert.alert("Success", "Form submitted successfully!");
    }
    console.log("Form Data:", form);
  };

  const containerPadding = isSmallScreen ? 16 : isMediumScreen ? 40 : 80;

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

        {/* Job Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Information</Text>

          {/* Title */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Job Posting Title <Text style={styles.required}>*</Text>
            </Text>
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
                Job Title <Text style={styles.required}>*</Text>
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
              <Text style={styles.label}>
                Category <Text style={styles.required}>*</Text>
              </Text>
              <View
                style={[
                  styles.pickerWrapper,
                  errors.category && styles.inputError,
                ]}
              >
                <Picker
                  selectedValue={form.category}
                  onValueChange={(value) => handleChange("category", value)}
                  style={styles.picker}
                  dropdownIconColor="#6B7280"
                >
                  {JOB_CATEGORIES.map((c) => (
                    <Picker.Item key={c} label={c} value={c} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={[styles.formGroup, styles.flex1]}>
              <Text style={styles.label}>Job Type</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={form.jobType}
                  onValueChange={(value) => handleChange("jobType", value)}
                  style={styles.picker}
                  dropdownIconColor="#6B7280"
                >
                  <Picker.Item label="Select job type" value="" color="#9CA3AF" />
                  {jobTypes.map((t) => (
                    <Picker.Item key={t} label={t} value={t} />
                  ))}
                </Picker>
              </View>
            </View>
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

            <View style={[styles.formGroup, styles.flex1]}>
              <Text style={styles.label}>Salary Range</Text>
              <TextInput
                placeholder="e.g., 3-5 LPA"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                value={form.salary}
                onChangeText={(text) => handleChange("salary", text)}
              />
            </View>
          </View>

          {/* Job Description */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Job Description <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              placeholder="Describe the role, qualifications, and required skills..."
              placeholderTextColor="#9CA3AF"
              style={[
                styles.input,
                styles.textarea,
                errors.jobDescription && styles.inputError,
              ]}
              multiline
              numberOfLines={6}
              value={form.jobDescription}
              onChangeText={(text) => handleChange("jobDescription", text)}
            />
          </View>
        </View>

        {/* Company Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Information</Text>

          {/* Company Name & Address */}
          <View style={[styles.row, isSmallScreen && styles.column]}>
            <View style={[styles.formGroup, styles.flex1]}>
              <Text style={styles.label}>Company Name</Text>
              <TextInput
                placeholder="e.g., TCS"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
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
              <Text style={styles.label}>
                Company Email <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                placeholder="e.g., careers@company.com"
                placeholderTextColor="#9CA3AF"
                style={[
                  styles.input,
                  errors.companyEmail && styles.inputError,
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Details</Text>

          {/* Application Deadline */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Application Deadline</Text>
            <TextInput
              placeholder="e.g., 2025-12-31"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              value={form.applicationDeadline}
              onChangeText={(text) => handleChange("applicationDeadline", text)}
            />
            <Text style={styles.helperText}>Format: YYYY-MM-DD</Text>
          </View>

          {/* Additional Info */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Additional Information</Text>
            <TextInput
              placeholder="Interview process, benefits, contact details, etc."
              placeholderTextColor="#9CA3AF"
              style={[styles.input, styles.textarea]}
              multiline
              numberOfLines={4}
              value={form.additionalInfo}
              onChangeText={(text) => handleChange("additionalInfo", text)}
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.submitText}>Submit Job Posting</Text>
        </TouchableOpacity>

        {/* Bottom Padding for mobile */}
        <View style={{ height: 40 }} />
      </ScrollView>
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
    minHeight: "100%",
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
  picker: {
    color: "#111827",
    fontSize: 15,
    height: 48,
    ...Platform.select({
      android: {
        height: 50,
      },
      web: {
        outlineWidth: 0,
        borderWidth: 0,
        backgroundColor: "transparent",
        cursor: "pointer",
      },
    }),
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
  submitBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
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
  submitText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
