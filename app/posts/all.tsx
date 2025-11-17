import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { supabase } from '@/lib/supabase';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface Job {
  id: string;
  title: string;
  job_title: string;
  vacancy: number;
  job_type?: string;
  category: string;
  experience: string;
  salary?: string;
  job_description: string;
  company_name?: string;
  company_address?: string;
  company_email: string;
  company_phone?: string;
  application_deadline?: string;
  additional_info?: string;
  poster_url?: string;
  is_draft?: boolean;
  user_id?: string;
  template_id?: string;
  template_style?: string;
}

export default function AllJobsScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const colors = Colors.light;
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        let query = supabase
          .from('jobs')
          .select('id, title, job_title, vacancy, job_type, category, experience, salary, job_description, company_name, company_address, company_email, company_phone, application_deadline, additional_info, poster_url, is_draft, user_id, template_id, template_style');

        if (user) {
          query = query.or(`is_draft.eq.false,user_id.eq.${user.id}`);
        } else {
          query = query.eq('is_draft', false);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;
        setJobs(data || []);
        setFilteredJobs(data || []);
      } catch (error: any) {
        console.error('Failed to fetch jobs:', error.message);
        Alert.alert('Error', 'Failed to fetch jobs.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredJobs(jobs);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = jobs.filter(job =>
        job.job_title.toLowerCase().includes(lowercasedQuery) ||
        (job.title && job.title.toLowerCase().includes(lowercasedQuery)) ||
        (job.company_name && job.company_name.toLowerCase().includes(lowercasedQuery))
      );
      setFilteredJobs(filtered);
    }
  }, [searchQuery, jobs]);

  const handleShare = (item: Job) => {
    const jobDetails = `
🌟 *New Job Opportunity!* 🌟

*Job Title:* ${item.job_title}
*Category:* ${item.category}
*Description:* ${item.title || 'N/A'}
*Job Type:* ${item.job_type || 'N/A'}
*Vacancy:* ${item.vacancy || 'N/A'}
*Experience:* ${item.experience || 'N/A'}
*Salary:* ${item.salary || 'N/A'}
*Job Description:* ${item.job_description || 'N/A'}
*Company Name:* ${item.company_name || 'N/A'}
*Company Address:* ${item.company_address || 'N/A'}
*Company Email:* ${item.company_email || 'N/A'}
*Company Phone:* ${item.company_phone || 'N/A'}
*Application Deadline:* ${item.application_deadline || 'N/A'}
*Additional Info:* ${item.additional_info || 'N/A'}

💼 *View more details:* ${item.poster_url || `https://sundarjobs.com/posts/preview?jobId=${item.id}&templateId=${item.template_id || ''}&styleId=${item.template_style || ''}`}

🚀 *Find more jobs like this on SundarJobs!*
    `;
    Share.share({
      message: jobDetails,
    }, {
      dialogTitle: 'Share Job Post',
    });
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.tint} />
        <Text style={[styles.loadingText, { color: colors.secondaryText }]}>
          Loading jobs...
        </Text>
      </View>
    );
  }

  if (filteredJobs.length === 0 && !loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="briefcase-outline" size={48} color={colors.tint} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No Jobs Found</Text>
          <Text style={[styles.emptySubtitle, { color: colors.secondaryText }]}>
            {searchQuery ? 'Try adjusting your search' : 'Start posting job opportunities'}
          </Text>
        </View>
      </ThemedView>
    );
  }

  const renderItem = ({ item }: { item: Job }) => (
    <View style={[styles.listItem, item.is_draft && styles.draftItem]}>
      <View style={styles.jobInfo}>
        <View style={styles.jobTitleContainer}>
          <Text style={styles.jobTitle} numberOfLines={1}>
            {item.job_title}
          </Text>
          {item.is_draft && (
            <View style={styles.draftBadge}>
              <Text style={styles.draftBadgeText}>Draft</Text>
            </View>
          )}
        </View>
        {item.company_name && (
          <Text style={styles.companyName} numberOfLines={1}>
            {item.company_name}
          </Text>
        )}
        <View style={styles.jobDetailsRow}>
          {item.job_type && (
            <Text style={styles.jobDetailText}>
              <Ionicons name="briefcase-outline" size={12} color="#6B7280" /> {item.job_type}
            </Text>
          )}
          {item.category && (
            <Text style={styles.jobDetailText}>
              <Ionicons name="pricetag-outline" size={12} color="#6B7280" /> {item.category}
            </Text>
          )}
        </View>
        <View style={styles.jobDetailsRow}>
          {item.experience && (
            <Text style={styles.jobDetailText}>
              <Ionicons name="hourglass-outline" size={12} color="#6B7280" /> {item.experience}
            </Text>
          )}
          {item.salary && (
            <Text style={styles.jobDetailText}>
              <Ionicons name="cash-outline" size={12} color="#6B7280" /> {item.salary}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.viewButton, { backgroundColor: colors.tint }]}
          onPress={() => {
            router.push({
              pathname: item.is_draft ? "/posts/templates" : "/posts/preview",
              params: item.is_draft
                ? { jobId: item.id }
                : {
                    jobId: item.id,
                    templateId: item.template_id || "default-template"
                  },
            });
          }}
        >
          <Ionicons name="eye-outline" size={16} color="white" />
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleShare(item)}
          style={[styles.button, styles.shareButton]}
        >
          <FontAwesome name="whatsapp" size={16} color="#25D366" />
          <Text style={[styles.buttonText, { color: '#25D366' }]}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search jobs..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={filteredJobs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  listContent: {
    backgroundColor: '#FFFFFF',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  jobInfo: {
    flex: 1,
    marginRight: 12,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  companyName: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  jobTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  draftBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  draftBadgeText: {
    color: '#EF4444',
    fontSize: 11,
    fontWeight: '600',
  },
  jobDetailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 4,
  },
  jobDetailText: {
    fontSize: 12,
    color: '#6B7280',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  draftItem: {
    backgroundColor: '#FFFBEB',
    borderLeftWidth: 4,
    borderLeftColor: '#FCD34D',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
  },
  viewButton: {
    backgroundColor: '#3B82F6',
  },
  shareButton: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 16,
  },
});
