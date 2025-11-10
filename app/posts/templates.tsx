import { ThemedText } from '@/components/themed-text';
import { HTML_TEMPLATES, HtmlTemplate } from '@/constants/jobTemplates';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface FormData {
  id?: string;
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

export default function TemplatesScreen() {
  const [jobPosts, setJobPosts] = useState<FormData[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<{ postId: string; template: HtmlTemplate } | null>(null);
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadJobPosts = async () => {
      try {
        const storageKey = "jobPosts";
        const storedData = Platform.OS === 'web'
          ? localStorage.getItem(storageKey)
          : await AsyncStorage.getItem(storageKey);
        if (storedData) {
          setJobPosts(JSON.parse(storedData));
        }
      } catch (e) {
        console.error("Error loading job posts from local storage:", e);
      }
    };

    loadJobPosts();
  }, []);

  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const textColor = Colors[colorScheme ?? 'light'].text;

  const handleSelectTemplate = useCallback((template: HtmlTemplate, jobPost: FormData) => {
    setSelectedTemplate({ postId: jobPost.id!, template });
    setSelectedStyleId(template.styles[0]?.id || null); // Select the first style by default
  }, []);

  const handleSelectStyle = useCallback((styleId: string, jobPost: FormData) => {
    if (selectedTemplate && selectedTemplate.postId === jobPost.id) {
      setSelectedStyleId(styleId);
      router.push({
        pathname: "/posts/preview",
        params: {
          jobPostData: JSON.stringify(jobPost),
          templateId: selectedTemplate!.template.id,
          styleId: styleId,
        },
      });
    }
  }, [selectedTemplate, router]);

  const handlePreview = useCallback((jobPost: FormData) => {
    if (selectedTemplate && selectedTemplate.postId === jobPost.id && selectedStyleId) {
      router.push({
        pathname: "/posts/preview",
        params: {
          jobPostData: JSON.stringify(jobPost),
          templateId: selectedTemplate!.template.id,
          styleId: selectedStyleId,
        },
      });
    } else {
      // Optionally, provide feedback to the user if no style is selected
      console.warn("Please select a template and a style before previewing.");
    }
  }, [selectedTemplate, selectedStyleId, router]);

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
              <ThemedText style={styles.cardSubtitle}>{post.jobTitle} at {post.companyName}</ThemedText>
              <ThemedText style={styles.cardDetail}>Category: {post.category}</ThemedText>
              <ThemedText style={styles.cardDetail}>Experience: {post.experience}</ThemedText>

              <View style={styles.templateSelectionContainer}>
                <ThemedText type="defaultSemiBold" style={styles.templateSelectionTitle}>Choose a Template:</ThemedText>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.templateScroll}>
                  {HTML_TEMPLATES.map((template: HtmlTemplate) => {
                    const isSelected = selectedTemplate?.postId === post.id && selectedTemplate?.template.id === template.id;
                    const displayStyle = template.styles[0]; // Use the first style for display in template list
                    return (
                      <TouchableOpacity
                        key={template.id}
                        style={[
                          styles.templateOption,
                          {
                            backgroundColor: displayStyle.backgroundColor,
                            borderColor: displayStyle.primaryColor,
                            borderWidth: isSelected ? 3 : 1, // Highlight selected template
                          }
                        ]}
                        onPress={() => handleSelectTemplate(template, post)}
                      >
                        <ThemedText style={[styles.templateOptionText, { color: displayStyle.textColor }]}>{template.name}</ThemedText>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                {selectedTemplate?.postId === post.id && selectedTemplate!.template.styles.length > 0 && (
                  <View style={styles.styleSelectionContainer}>
                    <ThemedText type="defaultSemiBold" style={styles.styleSelectionTitle}>Choose a Style:</ThemedText>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.templateScroll}>
                      {selectedTemplate!.template.styles.map((style) => {
                        const isStyleSelected = selectedStyleId === style.id;
                        return (
                          <TouchableOpacity
                            key={style.id}
                            style={[
                              styles.templateOption,
                              {
                                backgroundColor: style.backgroundColor,
                                borderColor: style.primaryColor,
                                borderWidth: isStyleSelected ? 3 : 1, // Highlight selected style
                              }
                            ]}
                            onPress={() => handleSelectStyle(style.id, post)}
                          >
                            <ThemedText style={[styles.templateOptionText, { color: style.textColor }]}>{style.name}</ThemedText>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                )}
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
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
  styleSelectionContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  styleSelectionTitle: {
    fontSize: 16,
    marginBottom: 10,
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
});
