import FullScreenMenu from '@/components/FullScreenMenu';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PostJobsLayout() {
  const colorScheme = useColorScheme();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const textColor = Colors[colorScheme ?? 'light'].text;
  const backgroundColor = Colors[colorScheme ?? 'light'].background;

  const animatedScale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const animateSocialIcons = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedScale, {
            toValue: 1.1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(animatedScale, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };
    animateSocialIcons();
  }, [animatedScale]);

  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  const handleMenuItemPress = (screen: string) => {
    router.navigate(screen as any);
    handleCloseMenu();
  };

  const handleSocialPress = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open social media link', err));
  };

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          header: () => (
            <View style={{ flexDirection: 'column', backgroundColor: backgroundColor }}>
              <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                  <Image
                    source={require('@/assets/images/logo.png')}
                    style={styles.logo}
                  />
                  <Text style={[styles.headerTitle, { color: textColor }]}>SundarJobs</Text>
                </View>
                <TouchableOpacity onPress={handleMenuPress}>
                  <Ionicons name="menu" size={30} color={textColor} />
                </TouchableOpacity>
              </View>
              <View style={styles.socialGroupsContainer}>
                <Text style={[styles.groupTitle, { color: textColor }]}>Join Our Groups</Text>
                <View style={styles.socialIconsContainer}>
                  <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
                    <TouchableOpacity onPress={() => handleSocialPress('https://chat.whatsapp.com/your-whatsapp-group-link')}>
                      <Ionicons name="logo-whatsapp" size={30} color="#25D366" style={styles.socialIcon} />
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
                    <TouchableOpacity onPress={() => handleSocialPress('https://www.facebook.com/your-facebook-group-link')}>
                      <Ionicons name="logo-facebook" size={30} color="#1877F2" style={styles.socialIcon} />
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
                    <TouchableOpacity onPress={() => handleSocialPress('https://www.instagram.com/your-instagram-page-link')}>
                      <Ionicons name="logo-instagram" size={30} color="#E4405F" style={styles.socialIcon} />
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              </View>
              <View style={styles.appDownloadContainer}>
                <Text style={[styles.groupTitle, { color: textColor }]}>Download Our App</Text>
                <View style={styles.appIconsContainer}>
                  <TouchableOpacity onPress={() => handleSocialPress('https://play.google.com/store/apps/details?id=your.android.app.id')}>
                    <Ionicons name="logo-android" size={30} color="#3DDC84" style={styles.socialIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleSocialPress('https://apps.apple.com/us/app/your-ios-app-id/id1234567890')}>
                    <Ionicons name="logo-apple" size={30} color="#000000" style={styles.socialIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ),
        }}>
        <Stack.Screen name="index" options={{ title: 'Post a New Job' }} />
        <Stack.Screen name="templates" options={{ title: 'Job Templates' }} />
        <Stack.Screen name="preview" options={{ title: 'Job Post Preview' }} />
      </Stack>
      <FullScreenMenu isVisible={isMenuVisible} onClose={handleCloseMenu} onMenuItemPress={handleMenuItemPress} />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 40,
    borderBottomWidth: 0.5,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  socialGroupsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  appDownloadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
       padding: 10,
    borderBottomWidth:0.5
  },
  appIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
