import { BusinessSectorCard } from '@/components/BusinessSectorCard';
import { ThemedView } from '@/components/themed-view';
import { BUSINESS_SECTORS, BusinessSector } from '@/constants/businessSectors';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native';

// (JobPostFormData interface kept as reference, though not used in render)
interface JobPostFormData {
  id?: string;
  title: string;
  // ... other fields
}

export default function HomeScreen() {
  const router = useRouter();

  const handleCardPress = (sector: BusinessSector) => {
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
        numColumns={3} // Changed to 3 columns
        contentContainerStyle={styles.cardListContainer}
        columnWrapperStyle={styles.cardListColumnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardListContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5, // Reduced padding to give columns more room
    gap: 10, // Adds gap between rows
  },
  cardListColumnWrapper: {
    justifyContent: 'flex-start', // Align items to start
    gap: 10, // Adds gap between columns
  },
});
