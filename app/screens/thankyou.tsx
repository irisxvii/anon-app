import { useRouter } from 'expo-router';
import {StyleSheet, TouchableOpacity, Text } from 'react-native';

import LottieView from 'lottie-react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ThemedView style={styles.mainContainer}>
      <LottieView 
        source={require('@/assets/animations/tickk.json')} 
        autoPlay 
        loop={false} 
        style={styles.tickAnimation}
      />
        <ThemedText type="title" style={styles.appTitle}>
          Thank You !
        </ThemedText>
        <ThemedText style={styles.caption}>
          Your report has been submitted anonymously. We appreciate your commitment to keeping our campus safe.
        </ThemedText>

        <TouchableOpacity style={styles.buttonFilled}
        onPress={() => router.push('/screens/report')}>
          <Text style={styles.buttonTextFilled}>Report Another Issue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOutlined}
        onPress={() => router.push('/(tabs)')}>
          <Text style={styles.buttonTextOutlined}>Go Home</Text>
        </TouchableOpacity>
        </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
   tickAnimation: {
    width: 120,
    height: 120,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  caption: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.7,
    paddingHorizontal: 20,
  },
  
  buttonFilled: {
    width: '80%',
    backgroundColor: '#10B77F',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },

  buttonOutlined: {
    width: '80%',
    borderColor: '#10B77F',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },  

  buttonTextFilled: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },

  buttonTextOutlined: {
    color: '#10B77F',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
