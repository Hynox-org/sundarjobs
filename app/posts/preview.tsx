import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Alert,
  Dimensions,
} from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import WebView from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { HTML_TEMPLATES, HtmlTemplate, JobPostFormData, TemplateStyle } from '@/constants/jobTemplates';
import generateHtmlTemplate from '@/components/HtmlTemplate';
import { BlurView } from 'expo-blur';
export default function PreviewScreen() {
  const { jobPostData, templateId, styleId } = useLocalSearchParams();
  const [formData, setFormData] = useState<JobPostFormData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<HtmlTemplate | null>(null);
  const [selectedTemplateStyle, setSelectedTemplateStyle] = useState<TemplateStyle | null>(null);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [webViewKey, setWebViewKey] = useState(0);
  const router = useRouter();

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'light';
  const colors = isDark ? Colors.dark : Colors.light;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (jobPostData) {
      setFormData(JSON.parse(jobPostData as string));
    }
    if (templateId) {
      const template = HTML_TEMPLATES.find((t: HtmlTemplate) => t.id === templateId);
      setSelectedTemplate(template || null);

      if (template && styleId) {
        const style = template.styles.find(s => s.id === styleId);
        setSelectedTemplateStyle(style || null);
      } else if (template && template.styles.length > 0) {
        setSelectedTemplateStyle(template.styles[0]); // Fallback to first style if styleId is missing
      }
    }
    setLoading(false);
  }, [jobPostData, templateId, styleId]);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginRedirect = () => {
    Alert.alert(
      'Login Required',
      'Please log in to view the full preview and request posting.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Login',
          onPress: () => setIsAuthenticated(true), // Simulate login
        },
      ]
    );
  };
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  const handleShare = async () => {
    try {
  const htmlContent = formData && selectedTemplate && selectedTemplateStyle ? generateHtmlTemplate({ formData, template: selectedTemplate, templateStyle: selectedTemplateStyle }) : '<h1>Loading...</h1>';
      if (!htmlContent) {
        Alert.alert('Error', 'Job post content not ready');
        return;
      }
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await shareAsync(uri, {
        UTI: '.pdf',
        mimeType: 'application/pdf',
      });
    } catch (error: any) {
      Alert.alert('Share Error', error.message);
      console.log(error);
    }
  };

  const handleEdit = () => {
    router.back();
  };

  const handleBack = () => {
    router.push({ pathname: '/(tabs)' });
  };

  if (loading || !formData || !selectedTemplate || !selectedTemplateStyle) {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.tint} />
        <Text style={[styles.loadingText, { color: colors.secondaryText }]}>
          Preparing job post preview...
        </Text>
      </View>
    );
  }

  if (!formData || !selectedTemplate || !selectedTemplateStyle) {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: colors.background }]}>
        <Ionicons name="warning" size={48} color={colors.secondaryText} style={{ marginBottom: 10 }} />
        <Text style={[styles.errorText, { color: colors.text }]}>Could not load job post preview.</Text>
        <TouchableOpacity style={[styles.backButton, { marginTop: 20 }]} onPress={() => router.back()}>
          <Text style={{ color: colors.tint, fontWeight: '600' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const htmlContent = formData && selectedTemplate && selectedTemplateStyle ? generateHtmlTemplate({ formData, template: selectedTemplate, templateStyle: selectedTemplateStyle }) : '<h1>Loading...</h1>';

    return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Control Bar */}
      <View style={[styles.topControls, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
        <View style={styles.zoomControls}>
          <TouchableOpacity
            style={[styles.zoomButton, { backgroundColor: colors.background, borderColor: colors.border }]}
            onPress={handleZoomOut}
            disabled={!isAuthenticated}
          >
            <Ionicons name="remove-outline" size={20} color={colors.tint} />
          </TouchableOpacity>
          <Text style={[styles.zoomText, { color: colors.text }]}>{Math.round(zoom * 100)}%</Text>
          <TouchableOpacity
            style={[styles.zoomButton, { backgroundColor: colors.background, borderColor: colors.border }]}
            onPress={handleZoomIn}
            disabled={!isAuthenticated}
          >
            <Ionicons name="add-circle" size={20} color={colors.tint} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.zoomButton, { backgroundColor: colors.background, borderColor: colors.border }]}
            onPress={handleResetZoom}
            disabled={!isAuthenticated}
          >
            <Text style={[styles.zoomResetText, { color: colors.text }]}>1x</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.quotationTitle, { color: colors.text }]}>
          {formData.jobTitle}
        </Text>
      </View>

      {/* PDF Viewer with Blur + Login Overlay */}
      <View style={[styles.pdfContainer, { backgroundColor: colors.background, flex: 1 }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
          scrollEnabled={isAuthenticated}
        >
          <View style={[styles.pdfWrapper, { transform: [{ scale: zoom }] }]}>
            {htmlContent ? (
              <View style={{ position: 'relative' }}>
                <WebView
                  key={webViewKey}
                  originWhitelist={['*']}
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
                  onError={(error) => console.log('WebView error:', error)}
                />

                {/* Blur + Login Prompt */}
                {!isAuthenticated && (
                  <>
                    <BlurView intensity={90} tint={isDark ? 'dark' : 'light'} style={StyleSheet.absoluteFill} />
                    <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center', padding: 24 }]}>
                      <Ionicons name="lock-closed" size={56} color={colors.secondaryText} style={{ marginBottom: 16 }} />
                      <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 8 }}>
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
                        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>Login Now</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            ) : null}
          </View>

          {/* Request to Post Button - BELOW Preview */}
          <View style={{ paddingTop: 20, paddingBottom: 10 }}>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: isAuthenticated ? colors.tint : '#ccc',
                  paddingVertical: 14,
                  paddingHorizontal: 15,
                  borderRadius: 10,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 8,
                },
              ]}
              onPress={() => isAuthenticated && Alert.alert('Success', 'Request to post sent!')}
              disabled={!isAuthenticated}
            >
              <Ionicons name="paper-plane" size={20} color="#fff" />
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
                Request to Post
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Bottom Action Bar (No Request to Post) */}
      <View style={[styles.bottomActions, { backgroundColor: colors.cardBackground, borderTopColor: colors.border }]}>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare} disabled={!isAuthenticated}>
          <Ionicons name="share-social" size={22} color={isAuthenticated ? colors.tint : colors.secondaryText} />
          <Text style={[styles.actionButtonText, { color: isAuthenticated ? colors.secondaryText : '#888' }]}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleEdit} disabled={!isAuthenticated}>
          <Ionicons name="create" size={22} color={isAuthenticated ? colors.tint : colors.secondaryText} />
          <Text style={[styles.actionButtonText, { color: isAuthenticated ? colors.secondaryText : '#888' }]}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleBack}>
          <Ionicons name="close-circle" size={22} color={colors.secondaryText} />
          <Text style={[styles.actionButtonText, { color: colors.secondaryText }]}>Close</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingTop: 50,
    borderBottomWidth: 1,
    gap: 15,
  },
  zoomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  zoomButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomResetText: {
    fontSize: 12,
    fontWeight: '600',
  },
  zoomText: {
    fontSize: 13,
    fontWeight: '600',
    minWidth: 45,
    textAlign: 'center',
  },
  quotationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  pdfContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexGrow: 1,
  },
  pdfWrapper: {
    width: "100%",
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    padding: '5%',
  },
  webView: {
    width: '100%',
    height: 500,
    padding: 20,
  },
  noContent: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    paddingBottom: 30,
    gap: 5,
  },
  actionButton: {
    alignItems: 'center',
    padding: 8,
    flex: 1,
  },
  actionButtonText: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
});
