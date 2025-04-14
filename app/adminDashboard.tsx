import { useRouter } from 'expo-router';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function MyReports() {
    const router = useRouter();

    const [status1, setStatus1] = useState('Pending');
    const [status2, setStatus2] = useState('Pending');

    const toggleStatus = (currentStatus: string, setStatus: Function) => {
    setStatus(currentStatus === 'Pending' ? 'Resolved' : 'Pending');
  };

  return (

      <ThemedView style={styles.mainContainer}>
        <ThemedText type="title" style={styles.appTitle}>
          Recent Reports
        </ThemedText>
        <ThemedText style={styles.caption}>
        Overview of all submitted concerns.
                </ThemedText>

        {/* Report 1 */}
        <View style={styles.reportBox}>
        <View style={styles.reportHeader}>
          <Text style={styles.reportTitle}>Suspicious Activity</Text>

          <TouchableOpacity 
          onPress={() => toggleStatus(status1, setStatus1)}>
            <Text
              style={[
                styles.reportStatus,
                status1 === 'Resolved' && styles.resolved,
              ]}
            >
              {status1}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.reportDescription}>
          Someone was seen standing near the...
        </Text>
        <Text style={styles.reportDate}>Reported on: April 12, 2025</Text>
      </View>

        {/* Report 2 */}
        <View style={styles.reportBox}>
        <View style={styles.reportHeader}>
          <Text style={styles.reportTitle}>Abuse Cases</Text>
          <TouchableOpacity onPress={() => toggleStatus(status2, setStatus2)}>
            <Text
              style={[
                styles.reportStatus,
                status2 === 'Resolved' && styles.resolved,
              ]}
            >
              {status2}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.reportDescription}>
          A group of students were seen gather...
        </Text>
        <Text style={styles.reportDate}>Reported on: April 10, 2025</Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 25,
    paddingVertical: 45,
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
  resolved: {
    color: '#00CC66', 
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
