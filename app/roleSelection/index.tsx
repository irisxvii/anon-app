import { useRouter } from 'expo-router';
import { GraduationCap, Shield, ArrowRight} from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp, withSpring } from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');

export default function RoleSelectionScreen() {
  const router = useRouter();
  return (
    <ThemedView style={styles.mainContainer}>
      <View style={styles.background} />
      
      <Animated.View 
        entering={FadeInDown.delay(200).springify()} 
        style={styles.headerContainer}
      >
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/icoon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <ThemedText type="title" style={styles.appTitle}>
          Welcome to Speak Up!
        </ThemedText>
        <ThemedText style={styles.caption}>
          Choose your role to continue
        </ThemedText>
      </Animated.View>

      <Animated.View 
        entering={FadeInUp.delay(400).springify()}
        style={styles.contentContainer}
      >
        <View style={styles.cardContainer}>
          <TouchableOpacity 
            style={styles.buttonOutlined} 
            onPress={() => router.replace('/(tabs)')}
          >
            <Animated.View 
              entering={FadeInUp.delay(600).springify()}
              style={styles.buttonContent}
            >
              <View style={styles.iconContainer}>
                <GraduationCap size={24} color="#10B77F" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.buttonTextOutlined}>Continue as User</Text>
                <Text style={styles.buttonSubtext}>Submit anonymous reports</Text>
              </View>
              <ArrowRight size={20} color="#10B77F" />
            </Animated.View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity 
            style={styles.buttonFilled} 
            onPress={() => router.push('/adminLogin')}
          >
            <Animated.View 
              entering={FadeInUp.delay(800).springify()}
              style={styles.buttonContent}
            >
              <View style={styles.iconContainer}>
                <Shield size={24} color="black" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.buttonTextFilled}>Admin Login</Text>
                <Text style={styles.buttonSubtext}>Manage and review reports</Text>
              </View>
              <ArrowRight size={20} color="black" />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <Animated.View 
          entering={FadeInUp.delay(1000).springify()}
          style={styles.infoBox}
        >
          <ThemedText style={styles.infoText}>
            Your privacy is our priority. All reports are completely anonymous.
          </ThemedText>
        </Animated.View>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
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
    gap: 8,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(16, 183, 127, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 48,
    height: 48,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 16,
    opacity: 0.8,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
    marginTop: 30,
  },
  cardContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonOutlined: {
    borderColor: '#10B77F',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  buttonFilled: {
    backgroundColor: '#10B77F',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(16, 183, 127, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  buttonTextOutlined: {
    color: '#10B77F',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextFilled: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSubtext: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 12,
  },
  infoBox: {
    width: '100%',
    backgroundColor: 'rgba(16, 183, 127, 0.05)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 183, 127, 0.1)',
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
  },
}); 