import { useRouter } from 'expo-router';
import {StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HowToReport() {
    const router = useRouter();
  return (

      <ThemedView style={styles.mainContainer}>
        <ThemedText type="title" style={styles.appTitle}>
          My Reports
        </ThemedText>
        <ThemedText style={styles.caption}>
                  Track the status of your reports
                </ThemedText>

        <View style={styles.reportBox}>
        <View style={styles.reportHeader}>
          <Text style={styles.reportTitle}>Suspicious Activity</Text>
          <Text style={styles.reportStatus}>Pending</Text>
        </View>
        <Text style={styles.reportDescription}>
          Someone was seen standing near the...
        </Text>
        <Text style={styles.reportDate}>Reported on: April 12, 2025</Text>
      </View>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 25,
    paddingVertical: 85,
    flex: 1,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 16,
    opacity: 0.7,
  },  
  reportBox: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    borderWidth: .5, 
    borderColor: '#ddd', 
    marginTop: 20,
    gap: 6,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  reportStatus: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFA500', 
  },
  reportDescription: {
    fontSize: 15,
    color: 'white',
  },
  reportDate: {
    fontSize: 13,
    color: '#777',
  },
});
