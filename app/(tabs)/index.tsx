import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BUSINESS_SECTORS, BusinessSector } from '@/constants/businessSectors';
import { BusinessSectorCard } from '@/components/BusinessSectorCard';

export default function HomeScreen() {
  const handleCardPress = (sector: BusinessSector) => {
    Alert.alert('Sector Selected', `You selected: ${sector.name}`);
    // Implement navigation or other actions here
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={BUSINESS_SECTORS}
        renderItem={({ item }) => (
          <BusinessSectorCard sector={item} onPress={handleCardPress} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
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
