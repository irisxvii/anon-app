import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Pill, Shield, Eye, CircleAlert } from 'lucide-react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ReportCategory } from '@/hooks/useReport';
import { useRouter } from 'expo-router';

export default function ReportScreen() {
  const router = useRouter();

  const handleCategorySelect = (category: ReportCategory) => {
    router.push({
      pathname: '/screens/detail',
      params: { category }
    });
  };

  return (

      <ThemedView style={styles.mainContainer}>
        <ThemedText type="title" style={styles.appTitle}>
          Select Category
        </ThemedText>
        <ThemedText style={styles.caption}>
          Choose the type of incident to report
        </ThemedText>

      <View style={styles.buttonsGrid}>
        <TouchableOpacity style={styles.buttonOutlined}
          onPress={() => handleCategorySelect('Drug Related')}
        >
          <Pill size={38} color="white" />
          <Text style={styles.buttonTextOutlined}>Drug{'\n'}Related</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOutlined}
          onPress={() => handleCategorySelect('Abuse Cases')}
        >
          <Shield size={39} color="white" />
          <Text style={styles.buttonTextOutlined}>Abuse{'\n'}Cases</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOutlined}
          onPress={() => handleCategorySelect('Suspicious Activity')}
        >
          <Eye size={39} color="white" />
          <Text style={styles.buttonTextOutlined}>Suspicious Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOutlined}
          onPress={() => handleCategorySelect('Other Issues')}
        >
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: -12,
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

