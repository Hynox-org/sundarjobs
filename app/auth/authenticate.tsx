import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from '../../lib/supabase';

export default function AuthenticateScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      Alert.alert(
        'Welcome to SundarJobs! 🎉',
        'Please Check out the Job Vacancies',
        [{ text: 'OK', onPress: () => router.replace('/') }]
      );
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      Alert.alert('Sign Up Error', error.message);
    } else {
      Alert.alert(
        'Welcome to SundarJobs! 🎉',
        'Please Check out the Job Vacancies',
        [{ text: 'OK', onPress: () => router.replace('/') }]
      );
    }
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Floating Card Container */}
        <View style={styles.floatingCard}>
          {/* Login Form */}
          {mode === 'login' && (
            <View style={styles.formContainer}>
              <View style={styles.sectionHeader}>
                <Ionicons name="log-in-outline" size={28} color="#EF233C" />
                <Text style={styles.sectionTitle}>Sign In</Text>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputLabelRow}>
                  <Ionicons name="mail-outline" size={18} color="#8D80AD" />
                  <Text style={styles.inputLabel}>Email Address</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="your.email@example.com"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!loading}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputLabelRow}>
                  <Ionicons name="lock-closed-outline" size={18} color="#8D80AD" />
                  <Text style={styles.inputLabel}>Password</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    editable={!loading}
                  />
                  <TouchableOpacity 
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-outline" : "eye-off-outline"} 
                      size={22} 
                      color="#8D80AD" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.primaryButton, loading && styles.buttonDisabled]}
                onPress={signInWithEmail}
                disabled={loading}
              >
                <LinearGradient
                  colors={!loading ? ['#EF233C', '#FBB13C'] : ['#CCCCCC', '#AAAAAA']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.primaryButtonText}>
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Text>
                  <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {/* Signup Form */}
          {mode === 'signup' && (
            <View style={styles.formContainer}>
              <View style={styles.sectionHeader}>
                <Ionicons name="create-outline" size={28} color="#EF233C" />
                <Text style={styles.sectionTitle}>Create Your Account</Text>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputLabelRow}>
                  <Ionicons name="person-outline" size={18} color="#8D80AD" />
                  <Text style={styles.inputLabel}>Full Name</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    placeholderTextColor="#999"
                    value={fullName}
                    onChangeText={setFullName}
                    editable={!loading}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputLabelRow}>
                  <Ionicons name="mail-outline" size={18} color="#8D80AD" />
                  <Text style={styles.inputLabel}>Email Address</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="your.email@example.com"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!loading}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputLabelRow}>
                  <Ionicons name="lock-closed-outline" size={18} color="#8D80AD" />
                  <Text style={styles.inputLabel}>Password</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Create a strong password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    editable={!loading}
                  />
                  <TouchableOpacity 
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-outline" : "eye-off-outline"} 
                      size={22} 
                      color="#8D80AD" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputLabelRow}>
                  <Ionicons name="shield-checkmark-outline" size={18} color="#8D80AD" />
                  <Text style={styles.inputLabel}>Confirm Password</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Re-enter password"
                    placeholderTextColor="#999"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    editable={!loading}
                  />
                  <TouchableOpacity 
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons 
                      name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                      size={22} 
                      color="#8D80AD" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.primaryButton, loading && styles.buttonDisabled]}
                onPress={signUpWithEmail}
                disabled={loading}
              >
                <LinearGradient
                  colors={!loading ? ['#EF233C', '#FBB13C'] : ['#CCCCCC', '#AAAAAA']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.primaryButtonText}>
                    {loading ? 'Creating...' : 'Create Account'}
                  </Text>
                  <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {/* Toggle Login/Signup */}
          <View style={styles.toggleContainer}>
            {mode === 'login' ? (
              <View style={styles.toggleRow}>
                <Text style={styles.toggleText}>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() => {
                    setMode('signup');
                  }}
                  disabled={loading}
                >
                  <Text style={styles.toggleLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.toggleRow}>
                <Text style={styles.toggleText}>Already have an account?</Text>
                <TouchableOpacity
                  onPress={() => {
                    setMode('login');
                  }}
                  disabled={loading}
                >
                  <Text style={styles.toggleLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Security Badge */}
        <View style={styles.securityBadge}>
          <Ionicons name="shield-checkmark" size={20} color="#8D80AD" />
          <Text style={styles.securityText}>Secure & Encrypted</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F4',
    paddingTop: 40,

  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
    display: "flex",
    justifyContent: "center",
  },
  headerWrapper: {
    height: 240,
    position: 'relative',
    marginBottom: -40,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 240,
  },
  diagonalCut: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#EDF2F4',
    transform: [{ skewY: '-3deg' }],
  },
  headerContent: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 16,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    opacity: 0.95,
    marginTop: 4,
  },
  floatingCard: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },
  formContainer: {
    gap: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  inputContainer: {
    gap: 8,
  },
  inputLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2F4',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  eyeIcon: {
    padding: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  primaryButtonFlex: {
    flex: 1,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  gradientButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#EF233C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#EF233C',
  },
  toggleContainer: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#EDF2F4',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  toggleText: {
    fontSize: 15,
    color: '#666666',
  },
  toggleLink: {
    fontSize: 15,
    color: '#EF233C',
    fontWeight: '700',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
  },
  securityText: {
    fontSize: 13,
    color: '#8D80AD',
    fontWeight: '600',
  },
});
