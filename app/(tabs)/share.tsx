import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ShareScreen() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const backgroundColor = Colors[colorScheme ?? 'light'].background;

  const handleSharePress = () => {
    // Replace with your actual Play Store link
    const playStoreLink = 'https://play.google.com/store/apps/details?id=com.yourcompany.yourapp';
    Linking.openURL(playStoreLink).catch(err => console.error('Failed to open Play Store link', err));
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Ionicons name="share" size={80} color={tintColor} />
      <Text style={[styles.title, { color: textColor }]}>Share SundarJobs</Text>
      <Text style={[styles.description, { color: textColor }]}>
        Spread the word about SundarJobs! Click the button below to share the app with your friends and family.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleSharePress}>
        <Text style={styles.buttonText}>Share App</Text>
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
    backgroundColor: '#007bff', // Example button color
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
