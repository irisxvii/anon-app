import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Pill } from 'lucide-react-native';
import { Shield } from 'lucide-react-native';
import { Eye } from 'lucide-react-native';
import { CircleAlert } from 'lucide-react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

export default function ReportDetails() {
  const router = useRouter();
  return (

      <ThemedView style={styles.mainContainer}>
        <ThemedText type="title" style={styles.appTitle}>
          What would you like to report ?
        </ThemedText>
        <ThemedText style={styles.caption}>
          Select a category that best describes your concern
        </ThemedText>

        <View style={styles.buttonsGrid}>
        <TouchableOpacity style={styles.buttonOutlined}
        onPress={() => router.push('/detail')}>
          <Pill size={38} color="white" />
          <Text style={styles.buttonTextOutlined}>Drug{'\n'}Related</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOutlined}
        onPress={() => router.push('/detail')}>
          <Shield size={39} color="white" />
          <Text style={styles.buttonTextOutlined}>Abuse{'\n'}Cases</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOutlined}
        onPress={() => router.push('/detail')}>
          <Eye size={39} color="white" />
          <Text style={styles.buttonTextOutlined}>Suspicious Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOutlined}
        onPress={() => router.push('/detail')}>
          <CircleAlert size={39} color="white" />
          <Text style={styles.buttonTextOutlined}>Other{'\n'}Issues</Text>
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
    borderColor: 'white',
    opacity: 0.8,
    borderWidth: 2,
    paddingVertical: 18,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  
  buttonTextOutlined: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});

