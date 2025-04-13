import { Image, StyleSheet, Platform, TouchableOpacity, Text, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (

      <ThemedView style={styles.mainContainer}>
        <ThemedText type="title" style={styles.appTitle}>
          What would you like to report?
        </ThemedText>
        <ThemedText style={styles.caption}>
          Select a category that best describes your concern
        </ThemedText>

        <View style={styles.buttonsGrid}>
        <TouchableOpacity style={styles.buttonOutlined}>
          <Text style={styles.buttonTextOutlined}>Drug Related</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOutlined}>
          <Text style={styles.buttonTextOutlined}>Abuse Cases</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOutlined}>
          <Text style={styles.buttonTextOutlined}>Suspicious Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOutlined}>
          <Text style={styles.buttonTextOutlined}>Other Issues</Text>
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
    gap: 15,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  caption: {
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.7,
    paddingHorizontal: 20,
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  buttonOutlined: {
    width: '40%',
    borderColor: '#10B77F',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  
  buttonFilled: {
    width: '40%',
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
