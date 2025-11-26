import generateHtmlTemplate from '@/components/HtmlTemplate';
import { AdditionalJob, HTML_TEMPLATES } from '@/constants/jobTemplates';
import { Colors } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js'; // Import Session and User
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

interface JobPostFormData {
  id: string;
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
  poster_url: string;
  template_id: string;
  template_style: string;
  additional_jobs: AdditionalJob[];
  created_at: string; // Add created_at
  is_draft: boolean; // Add is_draft
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Palette = {
  background: '#EDF2F4',
  primary: '#EF233C',
  secondary: '#FBB13C',
  accent: '#8D80AD',
  text: '#000000',
};

const ITEMS_PER_PAGE = 5; // Number of jobs per page

export default function CategoryJobsScreen() {
  const { category } = useLocalSearchParams();
  const [jobs, setJobs] = useState<JobPostFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [session, setSession] = useState<Session | null>(null); // To store session
  const [user, setUser] = useState<User | null>(null); // To store user
  const router = useRouter();

  const colors = Colors.light;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      supabase.auth.getUser().then(({ data: { user } }) => {
        setUser(user);
      });
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        supabase.auth.getUser().then(({ data: { user } }) => {
          setUser(user);
        });
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []); // Run once on component mount

  const isAdmin = session && user && user.user_metadata?.is_admin === true;

  useEffect(() => {
    fetchJobsByCategory();
  }, [category, currentPage, isAdmin]); // Rerun fetchJobsByCategory when category, currentPage, or isAdmin changes

  const fetchJobsByCategory = async () => {
    if (!category) {
      Alert.alert('Error', 'No category provided.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const isAllCategory = category === 'all';
      // isAdmin is now derived from component state, so it's directly available here.

      let query = supabase
        .from('jobs')
        .select(
          'id, title, job_title, vacancy, job_type, category, experience, salary, job_description, company_name, company_address, company_email, company_phone, application_deadline, additional_info, poster_url, template_id, template_style, additional_jobs, created_at, is_draft',
          { count: 'exact' }
        );

      if (!isAllCategory) {
        query = query.eq('category', category as string);
      }

      if (!isAdmin) { // Use isAdmin from the component scope
        query = query.eq('is_draft', false);
      }

      const { count, error: countError } = await query.range(0, 0); // Get count first
      if (countError) throw countError;
      setTotalJobs(count || 0);

      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;
      setJobs(data || []);
    } catch (e: any) {
      console.error('Error fetching jobs by category:', e);
      Alert.alert('Error', `Failed to load jobs for ${category}: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalJobs / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: Palette.background }]}>
        <ActivityIndicator size="large" color={Palette.primary} />
        <Text style={styles.loadingLabel}>Loading jobs...</Text>
      </View>
    );
  }

  if (totalJobs === 0) {
    return (
      <View style={styles.emptyState}>
        <View style={[styles.emptyIconCircle, { backgroundColor: Palette.background }]}>
          <Ionicons name="briefcase-outline" size={48} color={Palette.accent} />
        </View>
        <Text style={styles.emptyTitle}>No Jobs Available</Text>
        <Text style={styles.emptyDescription}>
          There are currently no positions available in {category}.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.emptyBackButton, { backgroundColor: Palette.primary }]}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={18} color="white" />
          <Text style={styles.emptyBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleShare = (item: JobPostFormData) => {
  const viewDetailsUrl =
    item.poster_url ||
    `https://sundarjobs.com/posts/preview?jobId=${item.id}&templateId=${
      item.template_id || ''
    }&templateStyle=${item.template_style || ''}`;

  let fullShareMessage = '';

  // Main Job Title with vacancy and experience
  fullShareMessage += `${item.job_title} - ${item.vacancy} No`;
  if (item.experience) {
    fullShareMessage += `\n(${item.experience} Experience)`;
  }
  fullShareMessage += '\n';

  // Additional Jobs - Each on separate lines with proper formatting
  if (item.additional_jobs && item.additional_jobs.length > 0) {
    item.additional_jobs.forEach((adj) => {
      fullShareMessage += `\n${adj.job_title} - ${adj.vacancy} No`;
      if (adj.experience) {
        fullShareMessage += `\n(${adj.experience} Experience)`;
      }
    });
    fullShareMessage += '\n';
  }

  // Company Address
  if (item.company_address) {
    fullShareMessage += `\n${item.company_address}`;
  }

  // Contact Information
  if (item.company_email) {
    fullShareMessage += `\nSend Your Resume Thru Mail:\n${item.company_email}`;
  }

  if (item.company_phone) {
    fullShareMessage += `\nCall us : ${item.company_phone}`;
  }

  // View Details URL (if available)
  if (viewDetailsUrl) {
    fullShareMessage += `\n\n🔗 ${viewDetailsUrl}`;
  }

  // Static Footer Links
  fullShareMessage += `\n\n🔥🔥👇👇🔥🔥`;
  fullShareMessage += `\nFollow Our WhatsApp Channel( What's App la Follow Up பண்ணுற Option வந்துருச்சு )`;
  fullShareMessage += `\n\nhttps://whatsapp.com/channel/0029Va9NPxE2v1Iz9yMDVL3r`;
  fullShareMessage += `\n\nDownload App - Play Store Sankar Jobs https://play.google.com/store/apps/details?id=com.sankarjobs.app&hl=en_IN`;
  fullShareMessage += `\n\nDownload Apple App Store: https://apps.apple.com/in/app/sankar-jobs/id6741199664`;
  fullShareMessage += `\n\nOur Website\nhttp://www.sundarjobs.com`;
  fullShareMessage += `\n\nPlz share Your Friends 🙏`;

  Share.share(
    { message: fullShareMessage },
    { dialogTitle: 'Share Job Opportunity' }
  );
};


  const renderJobItem = ({ item, index }: { item: JobPostFormData; index: number }) => {
    const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
    const showDraftBadge = isAdmin && item.is_draft; // Use isAdmin from component scope

    return (
      <View style={styles.jobCard}>
        {/* Job Number Badge */}
        <View style={[styles.jobNumberBadge, { backgroundColor: Palette.primary }]}>
          <Text style={styles.jobNumberText}>#{String(globalIndex).padStart(2, '0')}</Text>
        </View>

        {/* Draft Badge */}
        {showDraftBadge && (
          <View style={[styles.draftBadge, { backgroundColor: Palette.secondary }]}>
            <Text style={styles.draftBadgeText}>DRAFT</Text>
          </View>
        )}

        {/* Category Badge */}
        <View style={styles.categoryContainer}>
          <View style={[styles.categoryBadge, { backgroundColor: Palette.accent }]}>
            <Text style={styles.categoryText}>{item.category.toUpperCase()}</Text>
          </View>
        </View>

        {/* WebView Preview - Always Visible */}
        {item.template_id && (
          <View style={[styles.webViewContainer, { borderColor: Palette.primary }]}>
            {(() => {
              const selectedTemplate = HTML_TEMPLATES.find(
                (t) => t.id === item.template_id
              );
              return (
                <WebView
                  originWhitelist={['*']}
                  source={{
                    html: selectedTemplate
                      ? generateHtmlTemplate({
                          formData: item,
                          template: selectedTemplate,
                        })
                      : '<h1>Template not found</h1>',
                  }}
                  style={styles.webView}
                  scalesPageToFit={true}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  scrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  startInLoadingState
                  renderLoading={() => (
                    <View style={styles.webViewLoading}>
                      <ActivityIndicator size="small" color={Palette.primary} />
                    </View>
                  )}
                  onError={(syntheticEvent) => {
                    console.error('WebView error:', syntheticEvent.nativeEvent);
                  }}
                />
              );
            })()}
          </View>
        )}

        {/* Buttons Container */}
        <View style={styles.buttonsContainer}>
          {/* Share Button */}
          <TouchableOpacity
            style={[styles.button, styles.shareButton, { backgroundColor: '#25D366' }]}
            onPress={() => handleShare(item)}
            activeOpacity={0.85}
          >
            <FontAwesome name="whatsapp" size={20} color="white" />
            <Text style={styles.buttonText}>Share on WhatsApp</Text>
          </TouchableOpacity>

          {/* View Button (only for draft jobs and admin users) */}
          {isAdmin && item.is_draft && (
            <TouchableOpacity
              style={[styles.button, styles.viewButton, { backgroundColor: colors.tint }]}
              onPress={() => {
                router.push({
                  pathname: item.is_draft ? '/posts' : '/posts/preview',
                  params: {
                    jobId: item.id,
                    templateId: item.template_id || 'default-template',
                  },
                });
              }}
            >
              <Ionicons name="eye-outline" size={16} color="white" />
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Bottom Accent Stripe */}
        <View style={[styles.bottomAccent, { backgroundColor: Palette.secondary }]} />
      </View>
    );
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <View style={styles.paginationContainer}>
        {/* Results Info */}
        <Text style={styles.paginationInfo}>
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, totalJobs)} of {totalJobs} jobs
        </Text>

        <View style={styles.paginationControls}>
          {/* Previous Button */}
          <TouchableOpacity
            style={[
              styles.paginationButton,
              { backgroundColor: currentPage === 1 ? '#D1D5DB' : Palette.primary },
            ]}
            onPress={handlePreviousPage}
            disabled={currentPage === 1}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={18} color="white" />
          </TouchableOpacity>

          {/* First Page */}
          {startPage > 1 && (
            <>
              <TouchableOpacity
                style={[
                  styles.pageNumberButton,
                  currentPage === 1 && { backgroundColor: Palette.primary },
                ]}
                onPress={() => handlePageSelect(1)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.pageNumberText,
                    currentPage === 1 && styles.activePageText,
                  ]}
                >
                  1
                </Text>
              </TouchableOpacity>
              {startPage > 2 && <Text style={styles.ellipsis}>...</Text>}
            </>
          )}

          {/* Page Numbers */}
          {pageNumbers.map((page) => (
            <TouchableOpacity
              key={page}
              style={[
                styles.pageNumberButton,
                currentPage === page && { backgroundColor: Palette.primary },
              ]}
              onPress={() => handlePageSelect(page)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.pageNumberText,
                  currentPage === page && styles.activePageText,
                ]}
              >
                {page}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Last Page */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <Text style={styles.ellipsis}>...</Text>}
              <TouchableOpacity
                style={[
                  styles.pageNumberButton,
                  currentPage === totalPages && { backgroundColor: Palette.primary },
                ]}
                onPress={() => handlePageSelect(totalPages)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.pageNumberText,
                    currentPage === totalPages && styles.activePageText,
                  ]}
                >
                  {totalPages}
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* Next Button */}
          <TouchableOpacity
            style={[
              styles.paginationButton,
              { backgroundColor: currentPage === totalPages ? '#D1D5DB' : Palette.primary },
            ]}
            onPress={handleNextPage}
            disabled={currentPage === totalPages}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-forward" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: Palette.background }]}>
      <FlatList
        data={jobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={totalPages > 1 ? renderPagination : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLabel: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  emptyState: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  emptyBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  emptyBackText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  jobNumberBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  jobNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 0.5,
  },
  categoryContainer: {
    padding: 16,
    paddingBottom: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 0.5,
  },
  webViewContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    backgroundColor: '#F9FAFB',
  },
  webView: {
    width: '100%',
    height: 450,
    backgroundColor: 'transparent',
  },
  webViewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 10,
  },
  shareButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 10,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
  viewButton: {
    backgroundColor: Colors.light.tint, // Use a distinct color for view button
  },
  draftBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  draftBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 0.5,
  },
  bottomAccent: {
    height: 4,
    width: '100%',
  },
  paginationContainer: {
    paddingTop: 24,
    paddingBottom: 16,
    alignItems: 'center',
  },
  paginationInfo: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
    fontWeight: '500',
  },
  paginationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  paginationButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageNumberButton: {
    minWidth: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  pageNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  activePageText: {
    color: 'white',
  },
  ellipsis: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '600',
    paddingHorizontal: 4,
  },
});
