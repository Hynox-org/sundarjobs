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

export default function PreviewScreen() {
  const { jobPostData, templateId } = useLocalSearchParams();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<JobTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [webViewKey, setWebViewKey] = useState(0);
  const router = useRouter();

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (jobPostData) {
      setFormData(JSON.parse(jobPostData as string));
    }
    if (templateId) {
      const template = JOB_TEMPLATES.find(t => t.id === templateId);
      setSelectedTemplate(template || null);
    }
    setLoading(false);
  }, [jobPostData, templateId]);

  const generateJobPostHtml = () => {
    if (!formData || !selectedTemplate) return '<h1>Loading...</h1>';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              background-color: ${selectedTemplate.backgroundColor || '#ffffff'};
              color: ${selectedTemplate.textColor || '#000000'};
              padding: 20px;
              line-height: 1.6;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              border-radius: 8px;
              overflow: hidden;
            }
            .header {
              text-align: center;
              padding: 40px 30px;
              background: linear-gradient(135deg, ${selectedTemplate.primaryColor || '#0ea5e9'} 0%, ${selectedTemplate.secondaryColor || '#06b6d4'} 100%);
              color: white;
            }
            h1 {
              font-size: 32px;
              font-weight: 700;
              margin-bottom: 10px;
              line-height: 1.2;
            }
            .company-name {
              font-size: 20px;
              font-weight: 500;
              opacity: 0.95;
              margin-bottom: 15px;
            }
            .badge-container {
              display: flex;
              justify-content: center;
              gap: 10px;
              flex-wrap: wrap;
              margin-top: 15px;
            }
            .badge {
              display: inline-block;
              padding: 8px 16px;
              background: rgba(255, 255, 255, 0.2);
              backdrop-filter: blur(10px);
              color: white;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 500;
              border: 1px solid rgba(255, 255, 255, 0.3);
            }
            .content {
              padding: 30px;
            }
            .section {
              margin-bottom: 30px;
              padding-bottom: 25px;
              border-bottom: 2px solid #f0f0f0;
            }
            .section:last-child {
              border-bottom: none;
            }
            .section-title {
              font-size: 22px;
              font-weight: 700;
              margin-bottom: 20px;
              color: ${selectedTemplate.primaryColor || '#0ea5e9'};
              display: flex;
              align-items: center;
              gap: 10px;
            }
            .section-title::before {
              content: '';
              width: 4px;
              height: 24px;
              background: ${selectedTemplate.primaryColor || '#0ea5e9'};
              border-radius: 2px;
            }
            .info-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 15px;
            }
            .info-item {
              padding: 15px;
              background: #f9fafb;
              border-radius: 8px;
              border-left: 3px solid ${selectedTemplate.primaryColor || '#0ea5e9'};
            }
            .label {
              font-size: 13px;
              font-weight: 600;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .value {
              font-size: 16px;
              font-weight: 500;
              color: #111827;
            }
            .description {
              line-height: 1.8;
              white-space: pre-wrap;
              font-size: 15px;
              color: #374151;
            }
            .contact-info {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }
            .contact-item {
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 12px;
              background: #f9fafb;
              border-radius: 8px;
            }
            .contact-icon {
              width: 40px;
              height: 40px;
              background: ${selectedTemplate.primaryColor || '#0ea5e9'};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              padding: 20px;
              background: #f9fafb;
              color: #6b7280;
              font-size: 14px;
            }
            @media print {
              body { padding: 0; }
              .container { box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${formData.jobTitle}</h1>
              <div class="company-name">${formData.companyName}</div>
              <div class="badge-container">
                <span class="badge">${formData.jobType}</span>
                <span class="badge">${formData.category}</span>
                <span class="badge">${formData.vacancy} Positions</span>
              </div>
            </div>
            
            <div class="content">
              <div class="section">
                <div class="section-title">Job Details</div>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="label">Vacancies</div>
                    <div class="value">${formData.vacancy}</div>
                  </div>
                  <div class="info-item">
                    <div class="label">Experience</div>
                    <div class="value">${formData.experience}</div>
                  </div>
                  <div class="info-item">
                    <div class="label">Salary</div>
                    <div class="value">${formData.salary}</div>
                  </div>
                  <div class="info-item">
                    <div class="label">Deadline</div>
                    <div class="value">${formData.applicationDeadline}</div>
                  </div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Job Description</div>
                <div class="description">${formData.jobDescription}</div>
              </div>

              <div class="section">
                <div class="section-title">Company Information</div>
                <div class="contact-info">
                  <div class="contact-item">
                    <div class="contact-icon">📍</div>
                    <div>
                      <div class="label">Address</div>
                      <div class="value">${formData.companyAddress}</div>
                    </div>
                  </div>
                  <div class="contact-item">
                    <div class="contact-icon">📧</div>
                    <div>
                      <div class="label">Email</div>
                      <div class="value">${formData.companyEmail}</div>
                    </div>
                  </div>
                  <div class="contact-item">
                    <div class="contact-icon">📞</div>
                    <div>
                      <div class="label">Phone</div>
                      <div class="value">${formData.companyPhone}</div>
                    </div>
                  </div>
                </div>
              </div>

              ${formData.additionalInfo ? `
                <div class="section">
                  <div class="section-title">Additional Information</div>
                  <div class="description">${formData.additionalInfo}</div>
                </div>
              ` : ''}
            </div>

            <div class="footer">
              Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </body>
      </html>
    `;
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
      const htmlContent = generateJobPostHtml();
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
    }
  };

  const handleEdit = () => {
    router.back();
  };

  const handleBack = () => {
    router.push({ pathname: '/(tabs)' });
  };

  if (loading || !formData || !selectedTemplate) {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.tint} />
        <Text style={[styles.loadingText, { color: colors.secondaryText }]}>
          Preparing job post preview...
        </Text>
      </View>
    );
  }

  if (!formData || !selectedTemplate) {
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

  const htmlContent = generateJobPostHtml();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Control Bar */}
      <View style={[styles.topControls, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
        <View style={styles.zoomControls}>
          <TouchableOpacity
            style={[styles.zoomButton, { backgroundColor: colors.background, borderColor: colors.border }]}
            onPress={handleZoomOut}
          >
            <Ionicons name="remove-outline" size={20} color={colors.tint} />
          </TouchableOpacity>
          <Text style={[styles.zoomText, { color: colors.text }]}>{Math.round(zoom * 100)}%</Text>
          <TouchableOpacity
            style={[styles.zoomButton, { backgroundColor: colors.background, borderColor: colors.border }]}
            onPress={handleZoomIn}
          >
            <Ionicons name="add-circle" size={20} color={colors.tint} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.zoomButton, { backgroundColor: colors.background, borderColor: colors.border }]}
            onPress={handleResetZoom}
          >
            <Text style={[styles.zoomResetText, { color: colors.text }]}>1x</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.quotationTitle, { color: colors.text }]}>
          {formData.jobTitle}
        </Text>
      </View>

      {/* PDF Viewer */}
      <View style={[styles.pdfContainer, { backgroundColor: colors.background }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
        >
          <View style={[styles.pdfWrapper, { transform: [{ scale: zoom }] }]}>
            {htmlContent ? (
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
            ) : (
              <View style={styles.noContent}>
                <Text style={{ color: colors.secondaryText }}>No content to display</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomActions, { backgroundColor: colors.cardBackground, borderTopColor: colors.border }]}>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Ionicons name="share-social" size={22} color={colors.tint} />
          <Text style={[styles.actionButtonText, { color: colors.secondaryText }]}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
          <Ionicons name="create" size={22} color={colors.tint} />
          <Text style={[styles.actionButtonText, { color: colors.secondaryText }]}>Edit</Text>
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
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  webView: {
    width: '100%',
    minHeight: 800,
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
