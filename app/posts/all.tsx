import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Platform, Alert } from 'react-native';

interface Job {
  id: string;
  title: string;
  is_draft?: boolean;
  user_id?: string;
  template_id?: string;
  template_style?: string;
}

export default function AllJobsScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        let query = supabase.from('jobs').select('*, template_id, template_style');

        if (user) {
          // Fetch public jobs and user's own drafts
          query = query.or(`is_draft.eq.false,user_id.eq.${user.id}`);
        } else {
          // Only fetch public jobs if not logged in
          query = query.eq('is_draft', false);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setJobs(data || []);
      } catch (error: any) {
        console.error('Failed to fetch jobs:', error.message);
        Alert.alert('Error', 'Failed to fetch jobs.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const renderItem = ({ item }: { item: Job }) => (
    <Link
      href={
        (item.is_draft
          ? `/posts/templates?jobId=${item.id}`
          : `/posts/preview?jobId=${item.id}&templateId=${item.template_id || 'default-template'}&styleId=${item.template_style || 'default-style'}`) as any
      }
      asChild
    >
      <TouchableOpacity style={styles.jobItem}>
        <ThemedText type="subtitle">{item.title}</ThemedText>
        <ThemedText>{item.is_draft ? 'Draft' : 'Published'}</ThemedText>
      </TouchableOpacity>
    </Link>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">All Jobs</ThemedText>
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    marginTop: 16,
  },
  jobItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
