import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function JobsLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const textColor = Colors[colorScheme ?? 'light'].text;
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const borderColor = Colors[colorScheme ?? 'light'].border;

  return (
    <Stack>
      <Stack.Screen
        name="[category]"
        options={{
          headerShown: true,
          header: ({ route }) => {
            const { category } = route.params as { category: string };
            return (
              <View style={[styles.headerContainer, { backgroundColor: backgroundColor, borderBottomColor: borderColor }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                  <Ionicons name="arrow-back" size={24} color={textColor} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                  <Image
                    source={require('@/assets/images/logo.png')}
                    style={styles.logo}
                  />
                  <Text style={[styles.headerTitle, { color: textColor }]}>Jobs in {category}</Text>
                </View>
              </View>
            );
          },
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
    borderBottomWidth: 1,
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start', // Align logo and title to the left
    marginRight: 0, // No need for extra margin
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
