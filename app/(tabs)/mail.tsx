import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function MailScreen() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const backgroundColor = Colors[colorScheme ?? 'light'].background;

  const businessEmail = 'info@sundarjobs.com'; // Replace with your business email

  const handleMailPress = () => {
    Linking.openURL(`mailto:${businessEmail}`).catch(err => console.error('Failed to open mail app', err));
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Ionicons name="mail" size={80} color={tintColor} />
      <Text style={[styles.title, { color: textColor }]}>Contact Us via Email</Text>
      <Text style={[styles.description, { color: textColor }]}>
        Send us an email for any business inquiries, feedback, or support.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleMailPress}>
        <Text style={styles.buttonText}>Send Email</Text>
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
    backgroundColor: '#DB4437', // Gmail red
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
