import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ReportCategory, useReport } from '@/hooks/useReport';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp, withSpring } from 'react-native-reanimated';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function ReportDetailScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: ReportCategory }>();
  const { submitReport, isSubmitting, error } = useReport();
  
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [vehicle, setVehicle] = useState('');

  const handleSubmit = async () => {
    console.log('Starting submission..');
    if (!description || !location || !date) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      console.log('Submitting report with data:', {
        category,
        description,
        location,
        date,
        ...(vehicle ? { vehicle } : {}),
      });

      await submitReport({
        category,
        description,
        location,
        date,
        ...(vehicle ? { vehicle } : {}),
      });

      console.log('Report submitted successfully');
      router.push('/screens/thankyou');
    } catch (err) {
      console.error('Error submitting report:', err);
      Alert.alert('Error', error || 'Failed to submit report. Please try again.');
    }
  };

  return (
    <ThemedView style={styles.mainContainer}>
      <View style={styles.background} />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <ThemedText type="title" style={styles.appTitle}>
            Report Details
          </ThemedText>
          <ThemedText style={styles.caption}>
            Please provide as much information as possible to help us address the issue effectively.
          </ThemedText>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300).springify()}>
          <Text style={styles.label}>Description <Text style={styles.required}>*</Text></Text>
          <AnimatedTextInput
            style={styles.textBox}
            placeholder="Describe the issue."
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).springify()}>
          <Text style={styles.label}>Location <Text style={styles.required}>*</Text></Text>
          <AnimatedTextInput
            style={styles.textBoxSingleLine}
            placeholder="Where did this occur? Be as specific as possible"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={location}
            onChangeText={setLocation}
          />
        </Animated.View>
        
        <Animated.View entering={FadeInUp.delay(500).springify()}>
          <Text style={styles.label}>Date and Time <Text style={styles.required}>*</Text></Text>
          <AnimatedTextInput
            style={styles.textBoxSingleLine}
            placeholder="When did this happen?"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={date}
            onChangeText={setDate}
          />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(600).springify()}>
          <Text style={styles.label}>Vehicle Details (Optional)</Text>
          <AnimatedTextInput
            style={styles.textBoxSingleLine}
            placeholder="Color, type, license plate etc."
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={vehicle}
            onChangeText={setVehicle}
          />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(700).springify()}>
          <View style={{ marginTop: 20 }}>
            <AnimatedTouchableOpacity 
              style={[styles.buttonFilled, isSubmitting && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonTextFilled}>
                {isSubmitting ? 'Submitting..' : 'Submit Report'}
              </Text>
            </AnimatedTouchableOpacity>
          </View>
        </Animated.View>
        </ScrollView>
      </ThemedView>
  ); 
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
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
  scrollContainer: {
    paddingVertical: 30,
    gap: 15,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  caption: {
    fontSize: 16,
    opacity: 0.7,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    marginBottom: 9,
  },  
  textBox: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  textBoxSingleLine: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  
  buttonFilled: {
    width: '100%',
    backgroundColor: '#10B77F',
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonTextFilled: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  required: {
    color: '#FF4444',
  },
});
