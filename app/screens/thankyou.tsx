import { useRouter } from 'expo-router';
import {StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import LottieView from 'lottie-react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ThemedView style={styles.mainContainer}>
      <View style={styles.background} />
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
    paddingHorizontal: 20,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#10B77F',
    opacity: 0.1,
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
    width: '100%',
    backgroundColor: '#10B77F',
    paddingVertical: 12,
    borderRadius: 12,
  },

  buttonOutlined: {
    width: '100%',
    borderColor: '#10B77F',
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 12,
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
