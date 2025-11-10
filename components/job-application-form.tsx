import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Dimensions } from "react-native";
export default function Form() {
  const [form, setForm] = useState({
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

  const categories = [
    "IT",
    "Electronics",
    "Mechanical",
    "Civil",
    "Chemical",
    "Management",
    "Agriculture",
    "Science",
    "Mathematics",
    "Humanities",
    "Business",
    "Social Sciences",
    "Health Sciences",
    "Other",
  ];

  const jobTypes = [
    "Full Time",
    "Part Time",
    "Internship",
    "Contract",
    "Temporary",
    "Other",
  ];

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
      console.log("Submit button pressed"); 
    const required = [
      "title",
      "jobTitle",
      "vacancy",
      "category",
      "experience",
      "jobDescription",
      "companyEmail",
    ];
    const missing = required.filter((key) => !form[key as keyof typeof form]);
    if (missing.length > 0) {
      Alert.alert("Missing Fields", `Please fill in: ${missing.join(", ")}`);
      return;
    }
    Alert.alert("Success", "Form submitted successfully!");
    console.log("Form Data:", form);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Job Form</Text>

        {/* Title */}
        <View style={styles.formGroup} >
            <Text style={styles.label}>Title*</Text>
            <TextInput
                placeholder="Eg: Mega Hiring / Job Vacancy"
                style={styles.fullwidth}
                value={form.title}
                onChangeText={(text) => handleChange("title", text)}
            />
        </View>

        {/* Job Title & Vacancy */}
        <View style={styles.row}>
            <View style={styles.formGroupHalf}>
                <Text style={styles.label}>Job Title*</Text>
                <TextInput
                    placeholder="Eg: Software Engineer"
                    style={styles.half}
                    value={form.jobTitle}
                    onChangeText={(text) => handleChange("jobTitle", text)}
                />
            </View>
            <View style={styles.formGroupHalf}>
                <Text style={styles.label}>Vacancy*</Text>
                <TextInput
                    placeholder="Eg: 5"
                    style={styles.half}
                    keyboardType="numeric"
                    value={form.vacancy}
                    onChangeText={(text) => handleChange("vacancy", text)}
                />
            </View>
        </View>

        {/* Job Type & Category */}
        {/* Job Type & Category */}
<View style={styles.row}>
  {/* Category */}
  <View style={styles.formGroupHalf}>
    <Text style={styles.label}>Category</Text>
    <View style={styles.pickerWrapper}>
      <Picker
        selectedValue={form.category}
        onValueChange={(value) => handleChange("category", value)}
        style={styles.picker}
        dropdownIconColor="#111827"
      >
        <Picker.Item label="Select Category" value="" />
        {categories.map((c) => (
          <Picker.Item key={c} label={c} value={c} />
        ))}
      </Picker>
    </View>
  </View>

  {/* Job Type */}
  <View style={styles.formGroupHalf}>
    <Text style={styles.label}>Job Type</Text>
    <View style={styles.pickerWrapper}>
      <Picker
        selectedValue={form.jobType}
        onValueChange={(value) => handleChange("jobType", value)}
        style={styles.picker}
        dropdownIconColor="#111827"
      >
        <Picker.Item label="Select Job Type" value="" />
        {jobTypes.map((t) => (
          <Picker.Item key={t} label={t} value={t} />
        ))}
      </Picker>
    </View>
  </View>
</View>


        {/* Experience & Salary */}
        <View style={styles.row}>
            <View style={styles.formGroupHalf}>
                <Text style={styles.label}>Experience</Text>
                <TextInput
                    placeholder="Eg: Fresher / 2 years"
                    style={styles.half}
                    value={form.experience}
                    onChangeText={(text) => handleChange("experience", text)}
                />
            </View>
            <View style={styles.formGroupHalf}>
                <Text style={styles.label}>Salary</Text>
                <TextInput
                    placeholder="Eg: 3 LPA"
                    style={styles.half}
                    value={form.salary}
                    onChangeText={(text) => handleChange("salary", text)}
                />
            </View>
        </View>

        {/* Job Description */}
        <View style={styles.formGroup}>
            <Text style={styles.label}>Job Description</Text>
            <TextInput
                placeholder="About the job, qualification , skills needed..."
                style={[styles.fullwidth, styles.textarea]}
                multiline
                value={form.jobDescription}
                onChangeText={(text) => handleChange("jobDescription", text)}
            />
        </View>

        {/* Company Info */}
        <View style={styles.row}>
            <View style={styles.formGroupHalf}>
                <Text style={styles.label}>Company Name</Text>
                <TextInput
                    placeholder="Eg: TCS "
                    style={styles.half}
                    value={form.companyName}
                    onChangeText={(text) => handleChange("companyName", text)}
                />
            </View>
            <View style={styles.formGroupHalf}>
                <Text style={styles.label}>Company Address</Text>
                <TextInput
                    placeholder="Eg: Coimbatore"
                    style={styles.half}
                    value={form.companyAddress}
                    onChangeText={(text) => handleChange("companyAddress", text)}
                />
            </View> 
        </View>

        <View style={styles.row}>
            <View style={styles.formGroupHalf}>
                <Text style={styles.label}>Company Email</Text>
                <TextInput
                    placeholder="Eg: abcd@gmail.com"
                    style={styles.half}
                    keyboardType="email-address"
                    value={form.companyEmail}
                    onChangeText={(text) => handleChange("companyEmail", text)}
                />
            </View>
            <View style={styles.formGroupHalf}>
                <Text style={styles.label}>Company Phone</Text>
                <TextInput
                    placeholder="Eg: 9876543210"
                    style={styles.half}
                    keyboardType="phone-pad"
                    value={form.companyPhone}
                    onChangeText={(text) => handleChange("companyPhone", text)}
                />
            </View>
        </View>

        {/* Deadline & Additional Info */}
        <View style={styles.formGroup}>
            <Text style={styles.label}>Application Deadline</Text>
            <TextInput
                placeholder="Eg: 2023-12-31"
                style={styles.half}
                value={form.applicationDeadline}
                onChangeText={(text) => handleChange("applicationDeadline", text)}
            />
        </View>

        <View style={styles.formGroup}>
            <Text style={styles.label}>Additional Info</Text>
            <TextInput
                placeholder="Interview process, contact info..."
                style={[styles.fullwidth, styles.textarea]}
                multiline
                value={form.additionalInfo}
                onChangeText={(text) => handleChange("additionalInfo", text)}
            />
        </View>
        
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>

    </ScrollView>
  );
}
const screenheight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    paddingVertical: "2%",
    paddingHorizontal: "16%",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    // marginBottom: "1%",
    textAlign: "center",
    color: "#111827",
  },
  formGroup: {
    marginBottom: "1%",
  },
  formGroupHalf: {
    flex: 1,
    marginBottom: "1%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: "0.5%",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#A0AEC0",
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    overflow: "hidden", // ensures no clipping
    height: 48, // consistent field height
    justifyContent: "center",
  },
  picker: {
    color: "#111827",
    fontSize: 16,
    height: 48,
    paddingHorizontal: 10,
    ...Platform.select({
      android: {
        paddingVertical: 0,
        height: 51,
      },
      
      web: {
        outlineWidth: 0,
        borderWidth: 0,
        backgroundColor: "transparent",
        height: "100%",
      },
    }),
  },


//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: "#A0AEC0",
//     borderRadius: 8,
//     backgroundColor: "#F9FAFB",
//     overflow: "hidden",
//   },
  input: {
    // borderWidth: 1,
    // borderColor: "#A0AEC0",
    borderColor: "#A0AEC0",
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#111827",
},
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 60,
  },
  half: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#A0AEC0",
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#111827",
  },
  fullwidth: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#A0AEC0",
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#111827",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitBtn: {
    marginTop: 18,
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    elevation: 2,
  },
  submitText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
});

