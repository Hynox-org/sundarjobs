import generateHtmlTemplate from "@/components/HtmlTemplate";
import {
  HTML_TEMPLATES,
  HtmlTemplate,
} from "@/constants/jobTemplates";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { supabase } from "@/lib/supabase"; // Import supabase
import { Ionicons } from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js"; // Import Session type
import { BlurView } from "expo-blur";
import { readAsStringAsync } from "expo-file-system/legacy";
import * as Print from "expo-print";
import { useLocalSearchParams, useRouter } from "expo-router";
import { shareAsync } from "expo-sharing";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import ViewShot from "react-native-view-shot";
import WebView from "react-native-webview";

interface JobPostFormData {
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
  template_style?: string; // Added to match category page
  poster_url?: string; // New field to store the URL of the uploaded poster
  additional_jobs?: { job_title: string; vacancy: number; experience: string }[]; // Added to match category page, experience is now required
}

export default function PreviewScreen() {
  const { jobId, templateId } = useLocalSearchParams();
  const [formData, setFormData] = useState<JobPostFormData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<HtmlTemplate | null>(
    null
  );
  const [loading, setLoading] = useState(true); // For initial data loading
  const [isPostingJob, setIsPostingJob] = useState(false); // For job posting action
  const [zoom, setZoom] = useState(1);
  const [webViewKey, setWebViewKey] = useState(0);
  const router = useRouter();
  const viewShotRef = useRef<ViewShot>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const startZoom = useRef(1);

  const colorScheme = useColorScheme();
  const isDark = false;
  const colors = isDark ? Colors.dark : Colors.light;
  const screenWidth = Dimensions.get("window").width;

  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state for authentication status

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setIsAuthenticated(!!session); // Set isAuthenticated based on session existence

      if (session) {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else if (profile) {
          setIsAdmin(profile.role === "admin");
        }
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setIsAuthenticated(!!session);
        if (session) {
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (error) {
            console.error("Error fetching profile:", error);
          } else if (profile) {
            setIsAdmin(profile.role === "admin");
          }
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const loadJobPost = async () => {
      if (!jobId) {
        console.error("No jobId provided for preview.");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", jobId)
          .single();

        if (error) {
          throw error;
        }

        setFormData(data || null);
      } catch (e) {
        console.error("Error loading job post from Supabase:", e);
        Alert.alert("Error", "Failed to load job post.");
      }

      if (templateId) {
        const template = HTML_TEMPLATES.find(
          (t: HtmlTemplate) => t.id === templateId
        );
        setSelectedTemplate(template || null);
      }
      setLoading(false);
    };

    loadJobPost();
  }, [jobId, templateId]);

  const handleLoginRedirect = () => {
    Alert.alert(
      "Login Required",
      "Please log in to view the full preview and request posting.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Login",
          onPress: () => router.push("/auth/authenticate" as any), // Redirect to login page
        },
      ]
    );
  };
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  const sharePdf = async () => {
    try {
      const htmlContent =
        formData && selectedTemplate
          ? generateHtmlTemplate({
            formData,
            template: selectedTemplate,
          })
          : "<h1>Loading...</h1>";
      if (!htmlContent) {
        Alert.alert("Error", "Job post content not ready");
        return;
      }
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await shareAsync(uri, {
        UTI: ".pdf",
        mimeType: "application/pdf",
      });
    } catch (error: any) {
      Alert.alert("Share Error", error.message);
      console.log(error);
    }
  };

  const shareOnWhatsApp = async () => {
    if (!formData) {
      Alert.alert("Error", "Job data not available.");
      return;
    }

    const item = formData; // Use formData as 'item' for consistent logic with category page

    const viewDetailsUrl =
      item.poster_url ||
      `https://sundarjobs.com/posts/preview?jobId=${item.id}&templateId=${item.template_id || ''
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
      fullShareMessage += "\n";
    }

    // Company Address
    if (item.company_address) {
      fullShareMessage += `\n location:${item.company_address}`;
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
      { dialogTitle: "Share Job Opportunity" }
    );
  };

  const handlePostJob = async () => {
    if (!formData || !selectedTemplate || !session) {
      Alert.alert("Error", "Job post data or session is missing.");
      return;
    }

    console.log("Post Job Data:", JSON.stringify({
      jobDetails: formData,
      templateDetails: selectedTemplate,
      colorDetails: colors
    }, null, 2));

    setIsPostingJob(true);
    try {
      // Generate HTML content
      const htmlContent = generateHtmlTemplate({
        formData: formData,
        template: selectedTemplate,
      });

      // Convert HTML to PDF first
      const { uri: pdfUri } = await Print.printToFileAsync({
        html: htmlContent,
      });

      // Read the file as base64
      const base64 = await readAsStringAsync(pdfUri, { encoding: "base64" });

      // Decode base64 to ArrayBuffer using base64-arraybuffer
      const { decode } = require("base64-arraybuffer");
      const arrayBuffer = decode(base64);

      const fileName = `poster-${formData.id}-${Date.now()}.pdf`;
      const filePath = `posters/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from("sundarjobs")
        .upload(filePath, arrayBuffer, {
          contentType: "application/pdf",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("sundarjobs")
        .getPublicUrl(filePath);

      if (!publicUrlData?.publicUrl) {
        throw new Error("Could not get public URL for the uploaded file.");
      }

      // Update job data
      const { error: updateError } = await supabase
        .from("jobs")
        .update({
          is_draft: false,
          poster_url: publicUrlData.publicUrl,
        })
        .eq("id", formData.id);

      if (updateError) throw updateError;

      setFormData((prev) => ({
        ...prev!,
        is_draft: false,
        poster_url: publicUrlData.publicUrl,
      }));

      Alert.alert(
        "Success",
        "Job poster uploaded and job posted successfully!"
      );
      router.push("/(tabs)");
    } catch (error: any) {
      Alert.alert("Post Job Error", error.message);
      console.error("Post Job Error:", error);
    } finally {
      setIsPostingJob(false);
    }
  };

  const handleBack = () => {
    router.push({ pathname: "/(tabs)" });
  };

  if (loading) {
    // Only check for initial loading
    return (
      <View
        style={[
          styles.centeredContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.tint} />
        <Text style={[styles.loadingText, { color: colors.secondaryText }]}>
          Preparing job post preview...
        </Text>
      </View>
    );
  }

  if (!formData || !selectedTemplate) {
    return (
      <View
        style={[
          styles.centeredContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <Ionicons
          name="warning"
          size={48}
          color={colors.secondaryText}
          style={{ marginBottom: 10 }}
        />
        <Text style={[styles.errorText, { color: colors.text }]}>
          Could not load job post preview.
        </Text>
        <TouchableOpacity
          style={[styles.backButton, { marginTop: 20 }]}
          onPress={() => router.back()}
        >
          <Text style={{ color: colors.tint, fontWeight: "600" }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const htmlContent =
    formData && selectedTemplate
      ? generateHtmlTemplate({
        formData: formData,
        template: selectedTemplate,
      })
      : "<h1>Loading...</h1>";

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      startZoom.current = zoom;
    })
    .onUpdate((e) => {
      const newZoom = startZoom.current * e.scale;
      const clamped = Math.min(Math.max(newZoom, 0.5), 2.0);
      runOnJS(setZoom)(clamped);
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
      >
        {isPostingJob && (
          <BlurView
            intensity={90}
            tint={isDark ? "dark" : "light"}
            style={StyleSheet.absoluteFill}
          >
            <View
              style={[
                styles.centeredContainer,
                { backgroundColor: "transparent" },
              ]}
            >
              <ActivityIndicator size="large" color={colors.tint} />
              <Text style={[styles.loadingText, { color: colors.secondaryText }]}>
                Posting job...
              </Text>
            </View>
          </BlurView>
        )}

        {/* Top Control Bar */}
        <View
          style={[
            styles.topControls,
            {
              backgroundColor: colors.cardBackground,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <View style={styles.zoomControls}>
            <TouchableOpacity
              style={[
                styles.zoomButton,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                },
              ]}
              onPress={handleZoomOut}
            >
              <Ionicons name="remove-outline" size={20} color={colors.tint} />
            </TouchableOpacity>
            <Text style={[styles.zoomText, { color: colors.text }]}>
              {Math.round(zoom * 100)}%
            </Text>
            <TouchableOpacity
              style={[
                styles.zoomButton,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                },
              ]}
              onPress={handleZoomIn}
            >
              <Ionicons name="add-circle" size={20} color={colors.tint} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.zoomButton,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                },
              ]}
              onPress={handleResetZoom}
            >
              <Text style={[styles.zoomResetText, { color: colors.text }]}>
                1x
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.quotationTitle, { color: colors.text }]}>
            {formData.job_title}
          </Text>
        </View>

        {/* PDF Viewer with Blur + Login Overlay */}
        <View
          style={[
            styles.pdfContainer,
            { backgroundColor: colors.background, flex: 1 },
          ]}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            scrollEventThrottle={16}
            scrollEnabled={isAuthenticated}
          >
            <GestureDetector gesture={pinchGesture}>
              <View style={[styles.pdfWrapper, { transform: [{ scale: zoom }] }]}>
                {htmlContent ? (
                  <>

                    <WebView
                      key={webViewKey}
                      originWhitelist={["*"]}
                      source={{ html: htmlContent }}
                      style={styles.webView}
                      scalesPageToFit={true}
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                      scrollEnabled={false}
                      pinchGestureEnabled={false}
                      startInLoadingState={true}
                      renderLoading={() => (
                        <View style={styles.loadingOverlay}>
                          <ActivityIndicator size="small" color={colors.tint} />
                        </View>
                      )}
                      onError={(error) => console.log("WebView error:", error)}
                    />
                    {/* Transparent overlay to capture gestures */}
                    <View style={StyleSheet.absoluteFill} />

                    {/* Blur + Login Prompt */}
                    {!isAuthenticated && (
                      <>
                        <BlurView
                          intensity={90}
                          tint={isDark ? "dark" : "light"}
                          style={StyleSheet.absoluteFill}
                        />
                        <View
                          style={[
                            StyleSheet.absoluteFill,
                            {
                              justifyContent: "center",
                              alignItems: "center",
                              padding: 24,
                            },
                          ]}
                        >
                          <Ionicons
                            name="lock-closed"
                            size={56}
                            color={colors.secondaryText}
                            style={{ marginBottom: 16 }}
                          />
                          <Text
                            style={{
                              color: colors.text,
                              fontSize: 18,
                              fontWeight: "600",
                              textAlign: "center",
                              marginBottom: 8,
                            }}
                          >
                            Login to View Preview
                          </Text>
                          <TouchableOpacity
                            style={{
                              backgroundColor: colors.tint,
                              paddingHorizontal: 28,
                              paddingVertical: 14,
                              borderRadius: 10,
                            }}
                            onPress={handleLoginRedirect}
                          >
                            <Text
                              style={{
                                color: "#fff",
                                fontWeight: "600",
                                fontSize: 16,
                              }}
                            >
                              Login Now
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  </>
                ) : null}
              </View>
            </GestureDetector>

            {isAuthenticated && isAdmin && (
              <>
                {/* Post Job Button - BELOW Preview */}
                <View style={{ paddingTop: 20, paddingBottom: 10 }}>
                  <TouchableOpacity
                    style={[
                      {
                        backgroundColor:
                          isAuthenticated && isAdmin && formData.is_draft
                            ? colors.tint
                            : "#ccc", // Only enable if authenticated AND admin
                        paddingVertical: 14,
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 8,
                      },
                    ]}
                    onPress={handlePostJob} // Call handlePostJob
                    disabled={!isAuthenticated || !isAdmin || !formData.is_draft} // Disable if not authenticated, not admin, or already posted
                  >
                    <Ionicons name="paper-plane" size={20} color="#fff" />
                    <Text
                      style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}
                    >
                      {isAuthenticated && isAdmin && formData.is_draft
                        ? "Post Job"
                        : !formData.is_draft
                          ? "Job Posted"
                          : "Request to Post"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </View>

        {/* Bottom Action Bar (No Request to Post) */}
        <View
          style={[
            styles.bottomActions,
            {
              backgroundColor: colors.cardBackground,
              borderTopColor: colors.border,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.actionButton}
            onPress={sharePdf}
          // disabled={formData.is_draft}
          >
            <Ionicons
              name="document-text-outline"
              size={22}
              color={
                isAuthenticated && isAdmin && !formData.is_draft
                  ? colors.tint
                  : colors.secondaryText
              }
            />
            <Text
              style={[
                styles.actionButtonText,
                {
                  color:
                    isAuthenticated && isAdmin ? colors.secondaryText : "#888",
                },
              ]}
            >
              Share PDF
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={shareOnWhatsApp}
          // disabled={formData.is_draft}
          >
            <Ionicons
              name="logo-whatsapp"
              size={22}
              color={
                isAuthenticated && isAdmin && !formData.is_draft
                  ? colors.tint
                  : colors.secondaryText
              }
            />
            <Text
              style={[
                styles.actionButtonText,
                {
                  color:
                    isAuthenticated && isAdmin ? colors.secondaryText : "#888",
                },
              ]}
            >
              WhatsApp
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleBack}>
            <Ionicons
              name="close-circle"
              size={22}
              color={colors.secondaryText}
            />
            <Text
              style={[styles.actionButtonText, { color: colors.secondaryText }]}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "500",
  },
  errorText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  topControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingTop: 50,
    borderBottomWidth: 1,
    gap: 15,
  },
  zoomControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  zoomButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  zoomResetText: {
    fontSize: 12,
    fontWeight: "600",
  },
  zoomText: {
    fontSize: 13,
    fontWeight: "600",
    minWidth: 45,
    textAlign: "center",
  },
  quotationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
  pdfContainer: {
    flex: 1,
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexGrow: 1,
  },
  pdfWrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  webView: {
    width: "100%",
    height: 600,
    padding: 20,
  },
  noContent: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingOverlay: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    paddingBottom: 30,
    gap: 5,
  },
  actionButton: {
    alignItems: "center",
    padding: 8,
    flex: 1,
  },
  actionButtonText: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: "500",
  },
});
