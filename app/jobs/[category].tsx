import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';

interface JobPostFormData {
  id: string;
  title: string;
  job_title: string;
  category: string;
  poster_url?: string;
  template_id?: string;
  template_style?: string;
}

export default function CategoryJobsScreen() {
  const { category } = useLocalSearchParams();
  const [jobs, setJobs] = useState<JobPostFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const colorScheme = useColorScheme();
  const isDark = false;
  const colors = isDark ? Colors.dark : Colors.light;

  useEffect(() => {
    const fetchJobsByCategory = async () => {
      if (!category) {
        Alert.alert("Error", "No category provided.");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('id, title, job_title, category, poster_url, template_id, template_style')
          .eq('category', category as string)
          .eq('is_draft', false);

        if (error) {
          throw error;
        }

        setJobs(data || []);
      } catch (e: any) {
        console.error("Error fetching jobs by category:", e);
        Alert.alert("Error", `Failed to load jobs for ${category}: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsByCategory();
  }, [category]);

  if (loading) {
    return (
      <ThemedView style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={colors.tint} />
        <Text style={[styles.loadingText, { color: colors.secondaryText }]}>Loading jobs...</Text>
      </ThemedView>
    );
  }

  if (jobs.length === 0) {
    return (
      <ThemedView style={styles.centeredContainer}>
        <Ionicons name="information-circle-outline" size={48} color={colors.secondaryText} style={{ marginBottom: 10 }} />
        <Text style={[styles.noJobsText, { color: colors.text }]}>No jobs found for "{category}".</Text>
        <TouchableOpacity style={[styles.backButton, { marginTop: 20 }]} onPress={() => router.back()}>
          <Text style={{ color: colors.tint, fontWeight: '600' }}>Go Back</Text>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  const renderJobItem = ({ item }: { item: JobPostFormData }) => (
    <View style={[styles.jobCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
      <Text style={[styles.jobTitle, { color: colors.text }]}>{item.job_title}</Text>
      <Text style={[styles.jobCategory, { color: colors.secondaryText }]}>Category: {item.category}</Text>
      
      {item.poster_url && (
        <View style={styles.posterPreviewContainer}>
          <Text style={[styles.posterLabel, { color: colors.secondaryText }]}>Job Poster Preview:</Text>
          <WebView
            source={{ 
              uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(item.poster_url)}` 
            }}
            style={styles.pdfWebView}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scrollEnabled={true}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={colors.tint} />
                <Text style={{ color: colors.secondaryText, marginTop: 8 }}>Loading PDF...</Text>
              </View>
            )}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
          />
          <TouchableOpacity 
            style={[styles.viewFullButton, { backgroundColor: colors.tint }]}
            onPress={() => router.push({
              pathname: '/posts/preview',
              params: {
                jobId: item.id,
                templateId: item.template_id,
                styleId: item.template_style,
              }
            })}
          >
            <Ionicons name="eye" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.viewFullButtonText}>View Full Details</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '500',
  },
  noJobsText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  listContentContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  jobCard: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  jobCategory: {
    fontSize: 14,
    marginBottom: 10,
  },
  posterPreviewContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    paddingTop: 10,
    borderTopColor: '#eee',
  },
  posterLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  pdfWebView: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 10,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  viewFullButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewFullButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
