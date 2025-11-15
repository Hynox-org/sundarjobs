import generateHtmlTemplate from "@/components/HtmlTemplate";
import {
  ALL_TEMPLATE_STYLES, // Added this import
  HTML_TEMPLATES,
  HtmlTemplate,
  TemplateStyle,
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
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  template_style?: string;
  poster_url?: string; // New field to store the URL of the uploaded poster
}

export default function PreviewScreen() {
  const { jobId, templateId, styleId } = useLocalSearchParams();
  const [formData, setFormData] = useState<JobPostFormData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<HtmlTemplate | null>(
    null
  );
  const [selectedTemplateStyle, setSelectedTemplateStyle] =
    useState<TemplateStyle | null>(null);
  const [loading, setLoading] = useState(true); // For initial data loading
  const [isPostingJob, setIsPostingJob] = useState(false); // For job posting action
  const [zoom, setZoom] = useState(1);
  const [webViewKey, setWebViewKey] = useState(0);
  const router = useRouter();
  const viewShotRef = useRef<ViewShot>(null);

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

        if (template && styleId) {
          const style = ALL_TEMPLATE_STYLES.find((s) => s.id === styleId);
          setSelectedTemplateStyle(style || null);
        } else if (template && template.styles.length > 0) {
          const defaultStyle = ALL_TEMPLATE_STYLES.find(s => s.id === template.styles[0]);
          setSelectedTemplateStyle(defaultStyle || null);
        }
      }
      setLoading(false);
    };

    loadJobPost();
  }, [jobId, templateId, styleId]);

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
  };

  const sharePdf = async () => {
    try {
      const htmlContent =
        formData && selectedTemplate && selectedTemplateStyle
          ? generateHtmlTemplate({
              formData,
              template: selectedTemplate,
              templateStyle: selectedTemplateStyle,
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
    try {
      const jobDetails = `
🌟 *New Job Opportunity!* 🌟

*Job Title:* ${formData.job_title}
*Category:* ${formData.category}
*Description:* ${formData.title || "N/A"}
*Job Type:* ${formData.job_type || "N/A"}
*Vacancy:* ${formData.vacancy || "N/A"}
*Experience:* ${formData.experience || "N/A"}
*Salary:* ${formData.salary || "N/A"}
*Job Description:* ${formData.job_description || "N/A"}
*Company Name:* ${formData.company_name || "N/A"}
*Company Address:* ${formData.company_address || "N/A"}
*Company Email:* ${formData.company_email || "N/A"}
*Company Phone:* ${formData.company_phone || "N/A"}
*Application Deadline:* ${formData.application_deadline || "N/A"}
*Additional Info:* ${formData.additional_info || "N/A"}

💼 *View more details:* ${
        formData.poster_url ||
        `https://sundarjobs.com/posts/preview?jobId=${formData.id}&templateId=${
          formData.template_id || ""
        }&styleId=${formData.template_style || ""}`
      }

🚀 *Find more jobs like this on SundarJobs!*
      `;
      await Share.share(
        {
          message: jobDetails,
        },
        {
          dialogTitle: "Share Job Post",
        }
      );
    } catch (error: any) {
      Alert.alert("Share Error", error.message);
      console.log(error);
    }
  };

  const handlePostJob = async () => {
    if (!formData || !selectedTemplate || !selectedTemplateStyle || !session) {
      Alert.alert("Error", "Job post data or session is missing.");
      return;
    }

    setIsPostingJob(true);
    try {
      // Generate HTML content
      const htmlContent = generateHtmlTemplate({
        formData: formData,
        template: selectedTemplate,
        templateStyle: selectedTemplateStyle,
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

  if (!formData || !selectedTemplate || !selectedTemplateStyle) {
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
    formData && selectedTemplate && selectedTemplateStyle
      ? generateHtmlTemplate({
          formData: formData,
          template: selectedTemplate,
          templateStyle: selectedTemplateStyle,
        })
      : "<h1>Loading...</h1>";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
          scrollEnabled={isAuthenticated}
        >
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
          disabled={formData.is_draft}
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
          disabled={formData.is_draft}
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
