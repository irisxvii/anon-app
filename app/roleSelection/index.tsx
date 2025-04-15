import { useRouter } from 'expo-router';
import { GraduationCap, Shield } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function RoleSelectionScreen() {
  const router = useRouter();
  return (
      <ThemedView style={styles.mainContainer}>
        <ThemedText type="title" style={styles.appTitle}>
          Speak Up!
        </ThemedText>
        <ThemedText style={styles.caption}>
          Help keep our campus safe by reporting concerns anonymously. 
        </ThemedText>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.buttonOutlined} 
            onPress={() => router.replace('/(tabs)')}
          >
            <View style={styles.buttonContent}>
              <GraduationCap size={48} color="#10B77F" />
              <Text style={styles.buttonTextOutlined}>Continue as User</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.buttonFilled} 
            onPress={() => router.push('/adminLogin')}
          >
            <View style={styles.buttonContent}>
              <Shield size={40} color="black" />
              <Text style={styles.buttonTextFilled}>Admin Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  caption: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.7,
    paddingHorizontal: 20,
  },
  buttonOutlined: {
    borderColor: '#10B77F',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  buttonFilled: {
    backgroundColor: '#10B77F',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    justifyContent: 'center',
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
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 