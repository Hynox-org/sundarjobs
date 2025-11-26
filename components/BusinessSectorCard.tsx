import { BusinessSector } from '@/constants/businessSectors';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { SvgIcon } from './SvgIcon';
import { ThemedText } from './themed-text';

interface BusinessSectorCardProps {
  sector: BusinessSector;
  onPress: (sector: BusinessSector) => void;
}

// Dynamic Layout Calculation for 3 Columns
const { width } = Dimensions.get('window');
const SCREEN_PADDING = 10; // Matches HomeScreen padding
const COLUMN_GAP = 10; // Matches HomeScreen gap
// Formula: (Screen Width - Outer Padding - (Gap * 2)) / 3 columns
const CARD_WIDTH = (width - (SCREEN_PADDING * 2) - (COLUMN_GAP * 2)) / 3;

export function BusinessSectorCard({ sector, onPress }: BusinessSectorCardProps) {
  const [displayEnglish, setDisplayEnglish] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setDisplayEnglish((prev) => !prev);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  return (
    <Pressable
      onPress={() => onPress(sector)}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#f0f0f0' : '#fff',
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        styles.card,
      ]}
    >
      <View style={styles.iconWrapper}>
        {/* Increased icon size for better visibility */}
        <SvgIcon svg={sector.icon} width={75} height={75} color="#3CB371" />
      </View>

      <Animated.View style={{ opacity: fadeAnim, width: '100%' }}>
        <ThemedText
          style={styles.cardText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {displayEnglish ? sector.name : sector.name_ta}
        </ThemedText>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    // Taller aspect ratio (0.75) creates a vertical rectangle to fit content better
    aspectRatio: 0.75, 
    marginVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAECF0', // Softer border color
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', // Distribute space evenly
    paddingHorizontal: 4,
    paddingVertical: 12,
    
    // Clean shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  iconWrapper: {
    marginBottom: 12, // Space between icon and text
    alignItems: 'center',
    justifyContent: 'center',
    height: 60, // Fixed height for alignment
  },
  cardText: {
    fontSize: 11, // Readable size for 3-column grid
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 15, // Tighter line height for multi-line text
    color: '#333',
  },
});
