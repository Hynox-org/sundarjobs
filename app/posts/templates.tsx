import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JOB_TEMPLATES, JobTemplate } from '@/constants/jobTemplates';

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

  const handleSelectTemplate = (templateId: string, jobPost: FormData) => {
    router.push({
      pathname: "/posts/preview",
      params: { jobPostData: JSON.stringify(jobPost), templateId: templateId },
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor }} contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, { backgroundColor }]}>
        <ThemedText type="title" style={[styles.title, { color: textColor }]}>Job Templates</ThemedText>
        <ThemedText type="subtitle" style={[styles.subtitle, { color: textColor }]}>
          Select a template to preview your job post.
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
                  {JOB_TEMPLATES.map((template) => (
                    <TouchableOpacity
                      key={template.id}
                      style={[styles.templateOption, { backgroundColor: template.backgroundColor, borderColor: template.primaryColor }]}
                      onPress={() => handleSelectTemplate(template.id, post)}
                    >
                      <ThemedText style={[styles.templateOptionText, { color: template.textColor }]}>{template.name}</ThemedText>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
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
});
