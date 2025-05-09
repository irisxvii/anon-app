import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

/**
 * Gets or creates a unique identifier for the current device
 * @returns Promise<string> The unique device identifier
 */
export async function getUserId(): Promise<string> {
  let userId = await SecureStore.getItemAsync('user_id');
  if (!userId) {
    userId = await Crypto.randomUUID();
    await SecureStore.setItemAsync('user_id', userId);
  }
  return userId;
} 