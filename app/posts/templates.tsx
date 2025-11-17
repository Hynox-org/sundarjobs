import { ThemedText } from '@/components/themed-text';
import { HTML_TEMPLATES, HtmlTemplate } from '@/constants/jobTemplates';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '@/lib/supabase';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface FormData {
  id?: string;
  title: string;
  job_title: string;
  vacancy: number;
  job_type: string;
  category: string;
  experience: string;
  salary: string;
  job_description: string;
  company_name: string;
  company_address: string;
  company_email: string;
  company_phone: string;
  application_deadline: string;
  additional_info: string;
  is_draft?: boolean;
  template_id?: string;
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 900,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  noPostsText: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
  },
  jobPostCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 10,
  },
  cardDetail: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  templateSelectionContainer: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  templateSelectionTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  templateScroll: {
    paddingVertical: 5,
  },
  templateOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
  },
  templateOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  previewButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: "column",
    gap: 16,
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
  flex1: {
    flex: 1,
  },
});

export default function TemplatesScreen() {
  const [jobPosts, setJobPosts] = useState<FormData[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<{ postId: string; template: HtmlTemplate } | null>(null);
  const router = useRouter();
  const { jobId } = useLocalSearchParams<{ jobId?: string }>(); // Get jobId from router params

  useEffect(() => {
    const loadJobPosts = async () => {
      try {
        if (!jobId) {
          console.warn("No jobId provided for templates screen.");
          setJobPosts([]);
          return;
        }

        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setJobPosts([data]);
        } else {
          setJobPosts([]);
        }
      } catch (e) {
        console.error("Error loading job posts from Supabase:", e);
        Alert.alert("Error", "Failed to load job post.");
      }
    };

    loadJobPosts();
  }, [jobId]); // Re-run effect if jobId changes

  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const textColor = Colors[colorScheme ?? 'light'].text;

  const handleSelectTemplate = useCallback((template: HtmlTemplate, jobPost: FormData) => {
    setSelectedTemplate({ postId: jobPost.id!, template });
  }, []);

  const handlePreview = useCallback(() => {
    if (jobId && selectedTemplate) {
      router.push({
        pathname: "/posts/preview",
        params: {
          jobId: jobId,
          templateId: selectedTemplate.template.id,
        },
      });
    } else {
      console.warn("Please select a template before previewing.");
      if (Platform.OS === "web") {
        alert("Please select a template before previewing.");
      } else {
        Alert.alert("Selection Required", "Please select a template before previewing.");
      }
    }
  }, [jobId, selectedTemplate, router]);

  const handleSaveTemplate = useCallback(async (action: "draft" | "preview") => {
    if (!jobId || !selectedTemplate) {
      console.warn("Please select a template before saving or proceeding.");
      if (Platform.OS === "web") {
        alert("Please select a template.");
      } else {
        Alert.alert("Selection Required", "Please select a template.");
      }
      return;
    }

    try {
      const { error } = await supabase
        .from('jobs')
        .update({
          template_id: selectedTemplate.template.id,
          is_draft: true, // Always keep as draft when saving template details
        })
        .eq('id', jobId);

      if (error) {
        throw error;
      }

      console.log(`Job post ${jobId} updated with template and style. Action: ${action}`);

      if (action === "draft") {
        if (Platform.OS === "web") {
          alert("Job saved as draft with template details!");
        } else {
          Alert.alert("Success", "Job saved as draft with template details!");
        }
        router.push("/"); // Redirect to home page
      } else if (action === "preview") {
        if (Platform.OS === "web") {
          alert("Proceeding to preview!");
        } else {
          Alert.alert("Success", "Proceeding to preview!");
        }
        router.push({
          pathname: "/posts/preview",
          params: {
            jobId: jobId,
            templateId: selectedTemplate.template.id,
          },
        });
      }
    } catch (e) {
      console.error("Error updating job post with template details in Supabase:", e);
      if (Platform.OS === "web") {
        alert("Error saving template details.");
      } else {
        Alert.alert("Error", "Error saving template details.");
      } 
    }
  }, [jobId, selectedTemplate, router]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor }} contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, { backgroundColor }]}>
        <ThemedText type="title" style={[styles.title, { color: textColor }]}>Job Templates</ThemedText>
        <ThemedText type="subtitle" style={[styles.subtitle, { color: textColor }]}>
          Select a template and a style to preview your job post.
        </ThemedText>

        {jobPosts.length === 0 ? (
          <ThemedText style={[styles.noPostsText, { color: textColor }]}>No job posts available. Submit a job to see it here!</ThemedText>
        ) : (
          jobPosts.map((post) => (
            <View key={post.id} style={styles.jobPostCard}>
              <ThemedText type="defaultSemiBold" style={styles.cardTitle}>{post.title}</ThemedText>
              <ThemedText style={styles.cardSubtitle}>{post.job_title} at {post.company_name}</ThemedText>
              <ThemedText style={styles.cardDetail}>Category: {post.category}</ThemedText>
              <ThemedText style={styles.cardDetail}>Experience: {post.experience}</ThemedText>

              <View style={styles.templateSelectionContainer}>
                <ThemedText type="defaultSemiBold" style={styles.templateSelectionTitle}>Choose a Template:</ThemedText>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.templateScroll}>
  {HTML_TEMPLATES.map((template: HtmlTemplate) => {
    const isSelected = selectedTemplate?.postId === post.id && selectedTemplate?.template.id === template.id;

    return (
      <TouchableOpacity
        key={template.id}
        style={[
          styles.templateOption,
          {
            backgroundColor: isSelected ? '#2563EB' : '#FFFFFF',
            borderColor: isSelected ? '#2563EB' : '#E5E7EB',
            borderWidth: isSelected ? 2 : 1,
          }
        ]}
        onPress={() => handleSelectTemplate(template, post)}
      >
        <ThemedText style={[
          styles.templateOptionText, 
          { color: isSelected ? '#FFFFFF' : '#374151' }
        ]}>
          {template.name}
        </ThemedText>
      </TouchableOpacity>
    );
  })}
</ScrollView>
              </View>
            </View>
          ))
        )}

        {/* Action Buttons */}
        {jobPosts.length > 0 && (
          <View style={[styles.buttonGroup, { marginTop: 20 }]}>
            <TouchableOpacity
              style={[styles.submitBtn, styles.draftBtn, styles.flex1]}
              onPress={() => handleSaveTemplate("draft")}
              activeOpacity={0.8}
            >
              <ThemedText style={styles.submitText}>Save as Draft</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.submitBtn, styles.proceedBtn, styles.flex1]}
              onPress={() => handleSaveTemplate("preview")}
              activeOpacity={0.8}
            >
              <ThemedText style={styles.submitText}>Proceed to Preview</ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
