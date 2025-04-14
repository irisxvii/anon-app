import { useRouter } from 'expo-router';
import {StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HowToReport() {
    const router = useRouter();
  return (

      <ThemedView style={styles.mainContainer}>
        <ThemedText type="title" style={styles.appTitle}>
          My Reports
        </ThemedText>
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
