import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

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
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        checkAdminRole(session.user.id);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        checkAdminRole(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles') // Assuming 'profiles' is your table for user profiles
      .select('role')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user role:', error);
      setIsAdmin(false);
    } else if (data && data.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      onClose(); // Close the menu after logout
      router.replace('/auth/authenticate'); // Redirect to login screen
    }
  };

  const handleMenuItemPress = (screen: string) => {
    if (screen === 'logout') {
      handleLogout();
    } else {
      onMenuItemPress(screen);
    }
  };

  const menuLinks = [];

  if (session) {
    // menuLinks.push({ name: 'Profile', icon: 'person', screen: 'profile' });
    if (isAdmin) {
      menuLinks.push(
        { name: 'Post Jobs', icon: 'briefcase', screen: 'posts' }
      );
      menuLinks.push(
        { name: 'All Jobs', icon: 'list', screen: 'posts/all' }
      );
    }
    menuLinks.push({ name: 'Logout', icon: 'log-out', screen: 'logout' });
  } else {
    menuLinks.push({ name: 'Login/Register', icon: 'log-in', screen: 'auth/authenticate' });
  }

  return (
    <View style={[styles.overlay, { backgroundColor }]}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={30} color={textColor} />
      </TouchableOpacity>
      <View style={styles.menuContent}>
        {menuLinks.map((link, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={() => handleMenuItemPress(link.screen)}>
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
