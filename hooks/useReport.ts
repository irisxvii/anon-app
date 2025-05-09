import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../FirebaseConfig';
import { getUserId } from '../utils/storage';

export type ReportCategory = 'Drug Related' | 'Abuse Cases' | 'Suspicious Activity' | 'Other Issues';
export type ReportStatus = 'Pending' | 'Reviewed';

export interface ReportData {
  id?: string;
  userId: string;
  category: ReportCategory;
  description: string;
  location: string;
  date: string;
  vehicle?: string;
  status: ReportStatus;
  createdAt: Date | Timestamp;
}

export const useReport = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitReport = async (data: Omit<ReportData, 'status' | 'createdAt' | 'id' | 'userId'>) => {
    console.log('starting submission');
    try {
      setIsSubmitting(true);
      setError(null);

      const userId = await getUserId();
      const reportData: Omit<ReportData, 'id'> = {
        ...data,
        userId,
        status: 'Pending',
        createdAt: Timestamp.now(),
      };

      console.log('attempting to add doc to firestore');
      const docRef = await addDoc(collection(db, 'reports'), reportData);
      console.log('doc added successfully');
      
      return docRef.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'failed to submit report');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitReport,
    isSubmitting,
    error,
  };
}; 