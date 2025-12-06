import { ThemedText } from '@/components/themed-text';
import { HTML_TEMPLATES, HtmlTemplate } from '@/constants/jobTemplates';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Dimensions, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.7,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.6,
    lineHeight: 24,
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  jobCardHeader: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
    color: '#111827',
    lineHeight: 28,
  },
  jobSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 22,
  },
  jobDetailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailBadge: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  detailBadgeText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
  },
  templateSection: {
    marginTop: 4,
  },
  templateSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  templateTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  randomButton: {
    backgroundColor: '#EEF2FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  randomButtonText: {
    color: '#4F46E5',
    fontSize: 13,
    fontWeight: '700',
  },
  templateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  templateChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    minWidth: 100,
    alignItems: 'center',
  },
  templateChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedIndicator: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    backgroundColor: '#10B981',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  // Sticky Footer Styles
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
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  draftButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  primaryButton: {
    backgroundColor: '#2563EB',
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
  selectionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginBottom: 8,
    gap: 6,
  },
  selectionInfoText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10B981',
  },
});

export default function TemplatesScreen() {
  const [jobPosts, setJobPosts] = useState<FormData[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<{ postId: string; template: HtmlTemplate } | null>(null);
  const router = useRouter();
  const { jobId } = useLocalSearchParams<{ jobId?: string }>();

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
  }, [jobId]);

  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const textColor = Colors[colorScheme ?? 'light'].text;

  const handleSelectTemplate = useCallback((template: HtmlTemplate, jobPost: FormData) => {
    setSelectedTemplate({ postId: jobPost.id!, template });
  }, []);

  const handleRandomSelectTemplate = useCallback((jobPost: FormData) => {
    if (HTML_TEMPLATES.length > 0) {
      const randomIndex = Math.floor(Math.random() * HTML_TEMPLATES.length);
      const randomTemplate = HTML_TEMPLATES[randomIndex];
      setSelectedTemplate({ postId: jobPost.id!, template: randomTemplate });
    } else {
      Alert.alert("No Templates", "No templates available for random selection.");
    }
  }, []);

  const handleSaveTemplate = useCallback(async (action: "draft" | "preview") => {
    if (!jobId || !selectedTemplate) {
      Alert.alert("Selection Required", "Please select a template first.");
      return;
    }

    try {
      const { error } = await supabase
        .from('jobs')
        .update({
          template_id: selectedTemplate.template.id,
          is_draft: true,
        })
        .eq('id', jobId);

      if (error) {
        throw error;
      }

      if (action === "draft") {
        Alert.alert("Success", "Job saved as draft with template details!");
        router.push("/");
      } else if (action === "preview") {
        router.push({
          pathname: "/posts/preview",
          params: {
            jobId: jobId,
            templateId: selectedTemplate.template.id,
          },
        });
      }
    } catch (e) {
      console.error("Error updating job post:", e);
      Alert.alert("Error", "Error saving template details.");
    }
  }, [jobId, selectedTemplate, router]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={['top']}>
      <View style={styles.container}>
        {/* Scrollable Content */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <ThemedText style={[styles.title, { color: textColor }]}>
              Choose Template
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: textColor }]}>
              Select a design template for your job posting
            </ThemedText>
          </View>

          {/* Empty State */}
          {jobPosts.length === 0 ? (
            <View style={styles.emptyState}>
              <ThemedText style={styles.emptyStateIcon}>📋</ThemedText>
              <ThemedText style={[styles.emptyStateText, { color: textColor }]}>
                No job posts available.{'\n'}Submit a job to see it here!
              </ThemedText>
            </View>
          ) : (
            // Job Post Card
            jobPosts.map((post) => (
              <View key={post.id} style={styles.jobCard}>
                {/* Job Header */}
                <View style={styles.jobCardHeader}>
                  <ThemedText style={styles.jobTitle}>{post.title}</ThemedText>
                  <ThemedText style={styles.jobSubtitle}>
                    {post.job_title} • {post.company_name}
                  </ThemedText>
                  <View style={styles.jobDetailsRow}>
                    <View style={styles.detailBadge}>
                      <ThemedText style={styles.detailBadgeText}>
                        {post.category}
                      </ThemedText>
                    </View>
                    <View style={styles.detailBadge}>
                      <ThemedText style={styles.detailBadgeText}>
                        {post.experience} exp
                      </ThemedText>
                    </View>
                    <View style={styles.detailBadge}>
                      <ThemedText style={styles.detailBadgeText}>
                        {post.vacancy} positions
                      </ThemedText>
                    </View>
                  </View>
                </View>

                {/* Template Selection */}
                <View style={styles.templateSection}>
                  <View style={styles.templateSectionHeader}>
                    <ThemedText style={styles.templateTitle}>
                      Select Template
                    </ThemedText>
                    <TouchableOpacity
                      style={styles.randomButton}
                      onPress={() => handleRandomSelectTemplate(post)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="shuffle" size={16} color="#4F46E5" />
                      <ThemedText style={styles.randomButtonText}>Random</ThemedText>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.templateGrid}>
                    {HTML_TEMPLATES.map((template: HtmlTemplate) => {
                      const isSelected = selectedTemplate?.postId === post.id &&
                        selectedTemplate?.template.id === template.id;

                      return (
                        <TouchableOpacity
                          key={template.id}
                          style={[
                            styles.templateChip,
                            {
                              backgroundColor: isSelected ? '#EEF2FF' : '#FFFFFF',
                              borderColor: isSelected ? '#4F46E5' : '#E5E7EB',
                            }
                          ]}
                          onPress={() => handleSelectTemplate(template, post)}
                          activeOpacity={0.7}
                        >
                          <ThemedText style={[
                            styles.templateChipText,
                            { color: isSelected ? '#4F46E5' : '#6B7280' }
                          ]}>
                            {template.name}
                          </ThemedText>
                          {isSelected && (
                            <View style={styles.selectedIndicator}>
                              <ThemedText style={styles.checkmark}>✓</ThemedText>
                            </View>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        {/* Sticky Footer with Action Buttons */}
        {jobPosts.length > 0 && (
          <View style={styles.stickyFooter}>
            {selectedTemplate && (
              <View style={styles.selectionInfo}>
                <ThemedText style={styles.selectionInfoText}>
                  ✓ {selectedTemplate.template.name} selected
                </ThemedText>
              </View>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.draftButton]}
                onPress={() => handleSaveTemplate("draft")}
                activeOpacity={0.8}
              >
                <ThemedText style={[styles.buttonText, styles.draftButtonText]}>
                  Save Draft
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={() => handleSaveTemplate("preview")}
                activeOpacity={0.8}
              >
                <ThemedText style={[styles.buttonText, styles.primaryButtonText]}>
                  Preview
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
