import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function WhatsappScreen() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const backgroundColor = Colors[colorScheme ?? 'light'].background;

  const phoneNumber = '+919876543210'; // Replace with your business WhatsApp number

  const handleWhatsAppPress = () => {
    let url = `whatsapp://send?phone=${phoneNumber}`;
    if (Platform.OS === 'ios') {
      url = `whatsapp://wa.me/${phoneNumber}`;
    }
    Linking.openURL(url).catch(err => console.error('Failed to open WhatsApp', err));
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Ionicons name="logo-whatsapp" size={80} color={tintColor} />
      <Text style={[styles.title, { color: textColor }]}>Chat on WhatsApp</Text>
      <Text style={[styles.description, { color: textColor }]}>
        Connect with us directly on WhatsApp for quick support and inquiries.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleWhatsAppPress}>
        <Text style={styles.buttonText}>Start Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#25D366', // WhatsApp green
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
