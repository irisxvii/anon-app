import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import {doc, setDoc, getDoc} from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.HIGH,
            sound: 'default',
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
}

export async function saveTokenToFirestore(userId: string, token: string) {
    try{
        if (userId=='admin') {
            await AsyncStorage.setItem('adminToken', token);
            console.log('Admin token saved to AsyncStorage');

            try{
                const adminRef = doc(db,'adminTokens','main');
                await setDoc(adminRef, { fcmToken: token }, { merge: true });
                console.log('Admin token saved to Firestore');
            } catch (firestoreError) {
                console.log('Error saving admin token to Firestore:');
            }
        } else {
            const userRef = doc(db, 'users', userId);
            await setDoc(userRef, { fcmToken: token }, { merge: true });
        }
    } catch (error) {
        console.log('Error saving token to Firestore:', error);
    }
}

export async function getAdminTokens() {
    try {

        const storedToken = await AsyncStorage.getItem('adminFCMToken');
        if (storedToken) {
            return storedToken;
        }

        const adminRef = doc(db, 'adminTokens', 'main');
        const adminDoc = await getDoc(adminRef);
        if (adminDoc.exists()) {
            const token = adminDoc.data().fcmToken;
            await AsyncStorage.setItem('adminFCMToken', token);
            return token;
        }
        return null;
    }
    catch (error) {
        console.log('Error getting admin token:', error);
        return null;
    }
}