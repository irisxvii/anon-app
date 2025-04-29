import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp, withSpring } from 'react-native-reanimated';
import { Lock, Clock, MessageSquare } from 'lucide-react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ThemedView style={styles.mainContainer}>
      <View style={styles.background} />
      
      <Animated.View 
        entering={FadeInDown.delay(200).springify()} 
        style={styles.headerContainer}
      >
        <Animated.View entering={FadeIn.delay(100).springify()}>
          <Image 
            source={require('@/assets/images/icoon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
        <ThemedText type="title" style={styles.appTitle}>
          Speak Up!
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Your Voice, Our Safety
        </ThemedText>
      </Animated.View>

      <Animated.View 
        entering={FadeInUp.delay(400).springify()}
        style={styles.contentContainer}
      >
        <ThemedText style={styles.caption}>
          Help keep our campus safe by reporting concerns anonymously. Your voice matters!
        </ThemedText>

        <View style={styles.featuresContainer}>
          <Animated.View 
            entering={FadeInUp.delay(600).springify()}
            style={styles.featureItem}
          >
            <View style={styles.featureIcon}>
              <Lock size={24} color="#10B77F" />
            </View>
            <ThemedText style={styles.featureTitle}>Anonymous</ThemedText>
            <ThemedText style={styles.featureText}>Your identity stays protected</ThemedText>
          </Animated.View>

          <Animated.View 
            entering={FadeInUp.delay(800).springify()}
            style={styles.featureItem}
          >
            <View style={styles.featureIcon}>
              <Clock size={24} color="#10B77F" />
            </View>
            <ThemedText style={styles.featureTitle}>Quick</ThemedText>
            <ThemedText style={styles.featureText}>Report in under 2 minutes</ThemedText>
          </Animated.View>

          <Animated.View 
            entering={FadeInUp.delay(1000).springify()}
            style={styles.featureItem}
          >
            <View style={styles.featureIcon}>
              <MessageSquare size={24} color="#10B77F" />
            </View>
            <ThemedText style={styles.featureTitle}>Simple</ThemedText>
            <ThemedText style={styles.featureText}>Easy to use interface</ThemedText>
          </Animated.View>
        </View>

        <TouchableOpacity 
          style={styles.buttonFilled}
          onPress={() => router.push('/screens/report')}
        >
          <Text style={styles.buttonTextFilled}>Report Now</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttonOutlined}
          onPress={() => router.push('/(tabs)/myReports')}
        >
          <Text style={styles.buttonTextOutlined}>My Reports</Text>
        </TouchableOpacity>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 70,
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
  headerContainer: {
    alignItems: 'center',
    paddingTop: 30,
    gap: 8,
  },
  logo: {
    width: 80,
    height: 80,
  },
  appTitle: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.8,
    marginTop: -5,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
    marginTop: 30,
  },
  caption: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.9,
    lineHeight: 24,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(16, 183, 127, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B77F',
    marginBottom: 2,
  },
  featureText: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 16,
  },
  buttonOutlined: {
    width: '95%',
    borderColor: '#10B77F',
    borderWidth: 2,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  
  buttonFilled: {
    width: '95%',
    backgroundColor: '#10B77F',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  
  buttonTextOutlined: {
    color: '#10B77F',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  
  buttonTextFilled: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
