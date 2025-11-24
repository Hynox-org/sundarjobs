import { StyleSheet, View, FlatList, Alert, Platform, Image, TouchableOpacity, Text, Modal } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BUSINESS_SECTORS, BusinessSector } from '@/constants/businessSectors';
import { BusinessSectorCard } from '@/components/BusinessSectorCard';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router'; // Import useRouter

interface JobPostFormData {
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
  isDraft?: boolean;
  templateId?: string;
  templateStyle?: string;
  isPosted?: boolean;
  posterUrl?: string;
}

export default function HomeScreen() {
  const router = useRouter(); // Initialize useRouter

  const handleCardPress = (sector: BusinessSector) => {
    // Navigate to the new page with the category as a parameter
    router.push({
      pathname: "/jobs/[category]" as any,
      params: { category: sector.name },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={BUSINESS_SECTORS}
        renderItem={({ item }) => (
          <BusinessSectorCard sector={item} onPress={handleCardPress} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.cardListContainer}
        columnWrapperStyle={styles.cardListColumnWrapper}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    marginBottom: 20,
  },
  cardListContainer: {
    paddingHorizontal: 10,
  },
  cardListColumnWrapper: {
    justifyContent: 'space-around',
  },
});
