import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { useRouter } from 'expo-router';

interface FullScreenMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onMenuItemPress: (screen: string) => void;
}

export default function FullScreenMenu({ isVisible, onClose, onMenuItemPress }: FullScreenMenuProps) {
  const colorScheme = useColorScheme();
  const textColor = Colors[colorScheme ?? 'light'].text;
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const tintColor = Colors[colorScheme ?? 'light'].tint;
  const router = useRouter();

  if (!isVisible) {
    return null;
  }

  const menuLinks = [
    { name: 'Home', icon: 'home', screen: 'index' },
    { name: 'About', icon: 'information-circle', screen: 'about' },
    { name: 'Share', icon: 'share', screen: 'share' },
    { name: 'WhatsApp', icon: 'logo-whatsapp', screen: 'whatsapp' },
    { name: 'Mail', icon: 'mail', screen: 'mail' },
    { name: 'Post Jobs', icon: 'briefcase', screen: 'posts' },
    { name: 'Templates', icon: 'document-text', screen: 'posts/templates' },
  ];

  return (
    <View style={[styles.overlay, { backgroundColor }]}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={30} color={textColor} />
      </TouchableOpacity>
      <View style={styles.menuContent}>
        {menuLinks.map((link, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={() => onMenuItemPress(link.screen)}>
            <Ionicons name={link.icon as any} size={24} color={tintColor} style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: textColor }]}>{link.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
  },
  menuContent: {
    marginTop: 50,
    width: '80%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
