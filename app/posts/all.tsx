import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
  Text 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/theme';

interface Job {
  id: string;
  title: string;
  job_title: string;
  vacancy: number;
  job_type?: string;
  category: string;
  experience: string;
  salary?: string;
  company_name?: string;
  company_address?: string;
  application_deadline?: string;
  is_draft?: boolean;
  user_id?: string;
  template_id?: string;
  template_style?: string;
}

export default function AllJobsScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const colors = Colors.light;

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        let query = supabase
          .from('jobs')
          .select('id, title, job_title, vacancy, job_type, category, experience, salary, company_name, company_address, application_deadline, is_draft, user_id, template_id, template_style');

        if (user) {
          query = query.or(`is_draft.eq.false,user_id.eq.${user.id}`);
        } else {
          query = query.eq('is_draft', false);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;
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

  if (jobs.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <View style={[styles.emptyIconCircle, { backgroundColor: `${colors.tint}1A` }]}>
          <Ionicons name="briefcase-outline" size={48} color={colors.tint} />
        </View>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>NO JOBS POSTED</Text>
        <Text style={[styles.emptySubtitle, { color: colors.secondaryText }]}>
          Start posting job opportunities
        </Text>
      </View>
    );
  }

  const renderItem = ({ item, index }: { item: Job; index: number }) => {
    const isExpired = item.application_deadline 
      ? new Date(item.application_deadline) < new Date() 
      : false;

    return (
      <Link
        href={
          (item.is_draft
            ? `/posts/templates?jobId=${item.id}`
            : `/posts/preview?jobId=${item.id}&templateId=${item.template_id || 'default-template'}&styleId=${item.template_style || 'default-style'}`) as any
        }
        asChild
      >
        <TouchableOpacity activeOpacity={0.85}>
          <View style={styles.jobCard}>
            {/* Left accent bar */}
            <View style={[styles.leftAccent, { backgroundColor: colors.tint }]} />
            
            <View style={styles.cardContent}>
              {/* Header row with number and status */}
              <View style={styles.headerRow}>
                <View style={styles.numberContainer}>
                  <Text style={[styles.jobNumber, { color: colors.tint }]}>
                    {String(index + 1).padStart(2, '0')}
                  </Text>
                  <View style={[styles.numberLine, { backgroundColor: colors.border }]} />
                </View>
                
                {/* Status badge */}
                {item.is_draft ? (
                  <View style={[styles.draftBadge, { backgroundColor: `${colors.icon}1A` }]}>
                    <Ionicons name="create-outline" size={12} color={colors.icon} />
                    <Text style={[styles.badgeText, { color: colors.icon }]}>DRAFT</Text>
                  </View>
                ) : isExpired ? (
                  <View style={[styles.expiredBadge, { backgroundColor: '#6c757d1A' }]}>
                    <Ionicons name="time-outline" size={12} color="#6c757d" />
                    <Text style={[styles.badgeText, { color: '#6c757d' }]}>EXPIRED</Text>
                  </View>
                ) : (
                  <View style={[styles.activeBadge, { backgroundColor: `${colors.tint}1A` }]}>
                    <Ionicons name="checkmark-circle" size={12} color={colors.tint} />
                    <Text style={[styles.badgeText, { color: colors.tint }]}>ACTIVE</Text>
                  </View>
                )}
              </View>

              {/* Job title */}
              <Text style={[styles.jobTitle, { color: colors.text }]}>
                {item.job_title.toUpperCase()}
              </Text>

              {/* Company name if available */}
              {item.company_name && (
                <View style={styles.companyRow}>
                  <Ionicons name="business-outline" size={14} color={colors.secondaryText} />
                  <Text style={[styles.companyName, { color: colors.secondaryText }]}>
                    {item.company_name}
                  </Text>
                </View>
              )}

              {/* Category tag */}
              <View style={styles.categoryRow}>
                <View style={[styles.categoryBar, { backgroundColor: colors.secondary }]} />
                <Text style={[styles.categoryText, { color: colors.icon }]}>
                  {item.category.toUpperCase()}
                </Text>
              </View>

              {/* Job details grid */}
              <View style={styles.detailsGrid}>
                {/* Vacancy */}
                <View style={styles.detailItem}>
                  <Ionicons name="people-outline" size={14} color={colors.secondaryText} />
                  <Text style={[styles.detailLabel, { color: colors.secondaryText }]}>
                    {item.vacancy} {item.vacancy === 1 ? 'Position' : 'Positions'}
                  </Text>
                </View>

                {/* Job type */}
                {item.job_type && (
                  <View style={styles.detailItem}>
                    <Ionicons name="time-outline" size={14} color={colors.secondaryText} />
                    <Text style={[styles.detailLabel, { color: colors.secondaryText }]}>
                      {item.job_type}
                    </Text>
                  </View>
                )}

                {/* Experience */}
                <View style={styles.detailItem}>
                  <Ionicons name="school-outline" size={14} color={colors.secondaryText} />
                  <Text style={[styles.detailLabel, { color: colors.secondaryText }]}>
                    {item.experience}
                  </Text>
                </View>

                {/* Salary */}
                {item.salary && (
                  <View style={styles.detailItem}>
                    <Ionicons name="cash-outline" size={14} color={colors.secondaryText} />
                    <Text style={[styles.detailLabel, { color: colors.secondaryText }]}>
                      {item.salary}
                    </Text>
                  </View>
                )}
              </View>

              {/* Deadline if available */}
              {item.application_deadline && (
                <View style={styles.deadlineRow}>
                  <Ionicons name="calendar-outline" size={12} color={isExpired ? '#6c757d' : colors.tint} />
                  <Text style={[styles.deadlineText, { 
                    color: isExpired ? '#6c757d' : colors.tint 
                  }]}>
                    Deadline: {new Date(item.application_deadline).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Text>
                </View>
              )}

              {/* View button */}
              <View style={[styles.viewButton, { backgroundColor: colors.tint }]}>
                <Text style={styles.viewButtonText}>
                  {item.is_draft ? 'CONTINUE EDITING' : 'VIEW DETAILS'}
                </Text>
                <Ionicons name="arrow-forward" size={14} color="white" />
              </View>
            </View>

            {/* Bottom gradient stripe */}
            <LinearGradient
              colors={[colors.tint, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.bottomGradient}
            />
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
  },
  listContent: {
    padding: 12,
    paddingTop: 16,
  },
  jobCard: {
    backgroundColor: 'white',
    marginBottom: 16,
    overflow: 'hidden',
  },
  leftAccent: {
    width: 4,
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  cardContent: {
    padding: 14,
    paddingLeft: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  jobNumber: {
    fontSize: 22,
    fontWeight: '700',
    marginRight: 10,
  },
  numberLine: {
    flex: 1,
    height: 1,
  },
  draftBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  expiredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 20,
    letterSpacing: -0.3,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  companyName: {
    fontSize: 13,
    fontWeight: '500',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBar: {
    height: 14,
    width: 3,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 5,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  deadlineText: {
    fontSize: 11,
    fontWeight: '600',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 4,
  },
  viewButtonText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  bottomGradient: {
    height: 3,
    width: '100%',
  },
});
