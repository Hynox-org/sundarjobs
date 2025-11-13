import { Stack } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const textColor = Colors[colorScheme ?? 'light'].text;
  const backgroundColor = Colors[colorScheme ?? 'light'].background;

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: ({ navigation }) => (
          <View style={[styles.headerContainer, { backgroundColor }]}>
            <View style={styles.headerLeft}>
              <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
              />
              <Text style={[styles.headerTitle, { color: textColor }]}>SundarJobs</Text>
            </View>
            {/* No menu icon or social links for auth pages */}
          </View>
        ),
      }}
    >
      <Stack.Screen name="authenticate" options={{ title: 'Login' }} />
    </Stack>
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
    borderColor: '#ccc', // Add a subtle border
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
});
