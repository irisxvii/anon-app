import { useRouter } from 'expo-router';
import {StyleSheet, TouchableOpacity, Text } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();
  return (
      <ThemedView style={styles.mainContainer}>
        <ThemedText type="title" style={styles.appTitle}>
          Speak Up!
        </ThemedText>
        <ThemedText style={styles.caption}>
          Help keep our campus safe by reporting concerns anonymously. Your voice matters!
        </ThemedText>

        <TouchableOpacity style={styles.buttonOutlined}
        onPress={() => router.push('/myReports')}>
          <Text style={styles.buttonTextOutlined}>My Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonFilled}
        onPress={() => router.push('/report')}>
          <Text style={styles.buttonTextFilled}>Report Now</Text>
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
    width: '80%',
    borderColor: '#10B77F',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  
  buttonFilled: {
    width: '80%',
    backgroundColor: '#10B77F',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
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
