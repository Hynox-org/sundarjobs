import { Colors } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';

interface JobPostFormData {
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
  template_id?: string;
  template_style?: string;
}

export default function CategoryJobsScreen() {
  const { category } = useLocalSearchParams();
  const [jobs, setJobs] = useState<JobPostFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const colors = Colors.light;
const PAGE_SIZE = 10; // Jobs per page
const [page, setPage] = useState(1);
const maxPage = Math.ceil(jobs.length / PAGE_SIZE);

const paginatedJobs = jobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
          .select('id, title, job_title, vacancy, job_type, category, experience, salary, job_description, company_name, company_address, company_email, company_phone, application_deadline, additional_info, poster_url, template_id, template_style')
          .eq('category', category as string)
          .eq('is_draft', false);

        if (error) throw error;
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.tint} />
        <Text style={[styles.loadingLabel, { color: colors.secondaryText }]}>
          Loading...
        </Text>
      </View>
    );
  }

  if (jobs.length === 0) {
    return (
      <View style={styles.emptyState}>
        <View style={styles.emptyContent}>
          <View style={[styles.redBar, { backgroundColor: colors.tint }]} />
          
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            NO JOBS{'\n'}AVAILABLE
          </Text>
          
          <Text style={[styles.emptyDescription, { color: colors.secondaryText }]}>
            No positions in {category} right now.
          </Text>
          
          <TouchableOpacity 
            onPress={() => router.back()}
            style={[styles.emptyBackButton, { backgroundColor: colors.text }]}
            activeOpacity={0.7}
          >
            <Text style={styles.emptyBackText}>← BACK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const renderJobItem = ({ item, index }: { item: JobPostFormData; index: number }) => (
  //   <View style={styles.magazineCard}>
  //     {/* Compact header */}
  //     <View style={styles.cardRow}>
  //       <View style={[styles.leftBar, { backgroundColor: colors.tint }]} />
        
  //       <View style={styles.cardContent}>
  //         {/* Small number indicator */}
  //         <View style={styles.numberRow}>
  //           <Text style={[styles.compactNumber, { color: colors.tint }]}>
  //             {String(index + 1).padStart(2, '0')}
  //           </Text>
  //           <View style={[styles.horizontalLine, { backgroundColor: colors.border }]} />
  //         </View>

  //         {/* Compact job title */}
  //         <Text style={[styles.compactTitle, { color: colors.text }]}>
  //           {item.job_title.toUpperCase()}
  //         </Text>

  //         {/* Small category */}
  //         <View style={styles.categorySection}>
  //           <View style={[styles.verticalBar, { backgroundColor: colors.secondary }]} />
  //           <Text style={[styles.categoryLabel, { color: colors.icon }]}>
  //             {item.category.toUpperCase()}
  //           </Text>
  //         </View>

  //         {/* Job Details as Text */}
  //         <View style={styles.detailsSection}>
  //           <Text style={[styles.detailsHeading, { color: colors.secondaryText }]}>
  //             JOB TITLE
  //           </Text>
  //           <Text style={[styles.detailText, { color: colors.text }]}>
  //             {item.job_title}
  //           </Text>

  //           {item.title && (
  //             <>
  //               <Text style={[styles.detailsHeading, { color: colors.secondaryText, marginTop: 8 }]}>
  //                 DESCRIPTION
  //               </Text>
  //               <Text style={[styles.detailText, { color: colors.text }]}>
  //                 {item.title}
  //               </Text>
  //             </>
  //           )}
  //         </View>

  //         {/* Compact CTA */}
  //         <TouchableOpacity 
  //           onPress={() => router.push({
  //         pathname: "/posts/preview",
  //         params: {
  //           jobId: item.id,
  //           templateId: item.template_id,
  //         },
  //       })}
  //       style={[styles.actionButton, { backgroundColor: colors.tint }]}
  //       activeOpacity={0.85}
  //     >
  //       <Text style={styles.actionButtonText}>VIEW</Text>
  //       <Ionicons name="eye-outline" size={16} color="white" />
  //     </TouchableOpacity>
  //     <TouchableOpacity
  //       onPress={() => {
  //         const jobURL = item.poster_url || `https://sundarjobs.com/posts/preview?id=${item.id}&template_id=${item.template_id || ''}&template_style=${item.template_style || ''}`;
  //         Share.share({
  //           message: `Check out this job poster!\n${jobURL}`,
  //         }, { dialogTitle: 'Share Job Poster' });
  //       }}
  //       style={[styles.actionButton, { backgroundColor: "#25D366" }]}
  //       activeOpacity={0.85}
  //     >
  //       <Text style={styles.actionButtonText}>SHARE</Text>
  //       <FontAwesome name="whatsapp" size={16} color="white" />
  //     </TouchableOpacity>
  //   </View>
  // </View>
  <View style={styles.posterCard}>
    {/* Poster Image */}
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.posterIndex}>{String(index + 1).padStart(2, '0')}</Text>
      <Image
        source={{ uri: item.poster_url  }}
        style={styles.posterImage}
        resizeMode="cover"
        alt={`Poster for job ${item.job_title}`}
      />
    </View>
    {/* Buttons */}
    <View style={styles.cardActions}>
      <TouchableOpacity
        onPress={() => router.push({
          pathname: "/posts/preview",
          params: {
            jobId: item.id,
            templateId: item.template_id,
          },
        })}
        style={[styles.actionButton, { backgroundColor: colors.tint }]}
        activeOpacity={0.85}
      >
        <Text style={styles.actionButtonText}>VIEW</Text>
        <Ionicons name="eye-outline" size={16} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          const jobURL = item.poster_url || `https://sundarjobs.com/posts/preview?id=${item.id}&template_id=${item.template_id || ''}&template_style=${item.template_style || ''}`;
          Share.share({
            message: `Check out this job poster!\n${jobURL}`,
          }, { dialogTitle: 'Share Job Poster' });
        }}
        style={[styles.actionButton, { backgroundColor: "#25D366" }]}
        activeOpacity={0.85}
      >
        <Text style={styles.actionButtonText}>SHARE</Text>
        <FontAwesome name="whatsapp" size={16} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);
  return (
    <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      {/* <FlatList
        data={jobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.magazineList}
        showsVerticalScrollIndicator={false}
      /> */}
       <FlatList
  data={paginatedJobs}
  renderItem={renderJobItem}
  keyExtractor={(item) => item.id}
  contentContainerStyle={styles.magazineList}
  showsVerticalScrollIndicator={false}
/>
<View style={styles.paginationBar}>
  <TouchableOpacity
    disabled={page === 1}
    style={[styles.paginationButton, page === 1 && styles.paginationDisabled]}
    onPress={() => setPage(page - 1)}
  >
    <Text style={styles.paginationText}>← Prev</Text>
  </TouchableOpacity>
  <Text style={styles.paginationInfo}>{`Page ${page} of ${maxPage}`}</Text>
  <TouchableOpacity
    disabled={page === maxPage}
    style={[styles.paginationButton, page === maxPage && styles.paginationDisabled]}
    onPress={() => setPage(page + 1)}
  >
    <Text style={styles.paginationText}>Next →</Text>
  </TouchableOpacity>
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#EDF2F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLabel: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyContent: {
    width: '100%',
    maxWidth: 320,
  },
  redBar: {
    height: 4,
    width: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 32,
  },
  emptyDescription: {
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
  },
  emptyBackButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  emptyBackText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  magazineList: {
    padding: 12,
    paddingTop: 16,
  },
  // magazineCard: {
  //   backgroundColor: 'white',
  //   marginBottom: 16,
  //   overflow: 'hidden',
  // },
  // cardRow: {
  //   flexDirection: 'row',
  // },
  // leftBar: {
  //   width: 4,
  // },
  // cardContent: {
  //   flex: 1,
  //   padding: 14,
  // },
  // numberRow: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 8,
  // },
  // compactNumber: {
  //   fontSize: 24,
  //   fontWeight: '700',
  //   marginRight: 10,
  // },
  // horizontalLine: {
  //   flex: 1,
  //   height: 1,
  // },
  // compactTitle: {
  //   fontSize: 15,
  //   fontWeight: '700',
  //   marginBottom: 8,
  //   lineHeight: 20,
  //   letterSpacing: -0.3,
  // },
  // categorySection: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 12,
  // },
  // verticalBar: {
  //   height: 14,
  //   width: 3,
  //   marginRight: 8,
  // },
  // categoryLabel: {
  //   fontSize: 10,
  //   fontWeight: '700',
  //   letterSpacing: 1.2,
  // },
  // detailsSection: {
  //   marginTop: 4,
  // },
  // detailsHeading: {
  //   fontSize: 9,
  //   fontWeight: '700',
  //   marginBottom: 8,
  //   letterSpacing: 1.5,
  // },
  // detailText: {
  //   fontSize: 13,
  //   lineHeight: 18,
  //   marginBottom: 4,
  // },
  // pdfWrapper: {
  //   borderRadius: 8,
  //   overflow: 'hidden',
  //   borderLeftWidth: 3,
  // },
  // compactWebView: {
  //   width: '100%',
  //   height: 200,
  // },
  // magazineLoading: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // readMoreButton: {
  //   marginTop: 12,
  //   paddingVertical: 12,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 16,
  // },
  // readMoreText: {
  //   color: 'white',
  //   fontSize: 12,
  //   fontWeight: '700',
  //   letterSpacing: 1.5,
  // },
  whatsappShareButton: {
    marginTop: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 4,
    gap: 8,
  },
  whatsappShareText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  bottomStripe: {
    height: 3,
    width: '100%',
  },
  posterCard: {
  backgroundColor: 'white',
  borderRadius: 12,
  padding: 10,
  marginBottom: 18,
  alignItems: 'center',
  elevation: 2,
},
posterImage: {
  width: 180,
  height: 240,
  borderRadius: 10,
  backgroundColor: '#eee',
  marginBottom: 10,
},
posterIndex: {
  fontSize: 16,
  fontWeight: '700',
  color: '#aaa',
  marginBottom: 6,
},
cardActions: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 18,
},
actionButton: {
  paddingVertical: 8,
  paddingHorizontal: 18,
  borderRadius: 6,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  marginTop: 4,
},
actionButtonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 13,
  marginRight: 6,
},
paginationBar: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 20,
  marginTop: 10,
  marginBottom: 20,
},
paginationButton: {
  padding: 8,
  borderRadius: 6,
  backgroundColor: Colors.light.tint,
},
paginationDisabled: {
  backgroundColor: '#eee',
},
paginationText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 14,
},
paginationInfo: {
  fontSize: 14,
  fontWeight: '500',
},

});
