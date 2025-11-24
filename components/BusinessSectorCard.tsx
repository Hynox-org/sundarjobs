import { BusinessSector } from '@/constants/businessSectors';
import React, { useState, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Animated } from 'react-native';
import { SvgIcon } from './SvgIcon';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface BusinessSectorCardProps {
  sector: BusinessSector;
  onPress: (sector: BusinessSector) => void;
}

export function BusinessSectorCard({ sector, onPress }: BusinessSectorCardProps) {
  const [displayEnglish, setDisplayEnglish] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity 1

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500, // Fade out duration
        useNativeDriver: true,
      }).start(() => {
        setDisplayEnglish((prev) => !prev);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500, // Fade in duration
          useNativeDriver: true,
        }).start();
      });
    }, 3000); // Switch every 3 seconds (2s display + 1s transition)

    return () => clearInterval(interval);
  }, [fadeAnim]);

  return (
    <Pressable onPress={() => onPress(sector)} style={({ pressed }) => [
      {
        backgroundColor: pressed ? '#f0f0f0' : '#fff',
      },
      styles.card,
    ]}>
      <ThemedView style={styles.iconContainer}>
        <SvgIcon svg={sector.icon} width={100} height={40} color="#007AFF" />
      </ThemedView>
      <Animated.View style={{ opacity: fadeAnim }}>
        <ThemedText style={styles.cardText}>
          {displayEnglish ? sector.name : sector.name_ta}
        </ThemedText>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '29%', // Adjust as needed for spacing
    aspectRatio: 0.75, // This makes the card square
    margin: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  iconContainer: {
    marginBottom: 5,  
    backgroundColor: 'transparent',
  },
  cardText: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
});
