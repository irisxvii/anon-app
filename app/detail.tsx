import { useRouter } from 'expo-router';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [vehicle, setVehicle] = useState('');
  return (
      <ThemedView style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}showsVerticalScrollIndicator={false}>
        <ThemedText type="title" style={styles.appTitle}>
          Report Details
        </ThemedText>
        <ThemedText style={styles.caption}>
          Please provide as much information as possible to help us address the issue effectively.
        </ThemedText>

        <Text style={styles.label} >Description</Text>
        <TextInput
        style={styles.textBox}
        placeholder="Describe the issue."
        placeholderTextColor="#888"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label} >Location</Text>
      <TextInput
        style={styles.textBoxSingleLine}
        placeholder="Where did this occur? Be as specific as possible"
        placeholderTextColor="#888"
        value={location}
        onChangeText={setLocation}
      />
      <Text style={styles.label} >Date and Time</Text>
      <TextInput
        style={styles.textBoxSingleLine}
        placeholder="When did this happen?"
        placeholderTextColor="#888"
        value={date}
        onChangeText={setDate}
      />
      <Text style={styles.label} >Vehicle Details (Optional)</Text>
      <TextInput
        style={styles.textBoxSingleLine}
        placeholder="Color, type, license plate etc."
        placeholderTextColor="#888"
        value={vehicle}
        onChangeText={setVehicle}
      />

      <View style={{ marginTop: 8 }}>
        <TouchableOpacity style={styles.buttonFilled}
        onPress={() => router.push('/thankyou')}>
          <Text style={styles.buttonTextFilled}>Submit Report</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
      </ThemedView>
  ); 
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingVertical: 30,
    gap: 15,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 16,
    opacity: 0.7,
  },
  label: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: 'white',
  },  
  textBox: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    color: 'white',
  },
  textBoxSingleLine: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: 'white',
  },
  
  buttonFilled: {
    width: '100%',
    backgroundColor: '#10B77F',
    paddingVertical: 12,
    borderRadius: 8,
  },
  
  buttonTextFilled: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
