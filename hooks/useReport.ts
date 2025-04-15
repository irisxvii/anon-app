import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../FirebaseConfig';

export type ReportCategory = 'Drug Related' | 'Abuse Cases' | 'Suspicious Activity' | 'Other Issues';

export interface ReportData {
  category: ReportCategory;
  description: string;
  location: string;
  date: string;
  vehicle?: string;
  status: 'pending';
  createdAt: Date;
}

export const useReport = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitReport = async (data: Omit<ReportData, 'status' | 'createdAt'>) => {
    console.log('starting submission');
    try {
      setIsSubmitting(true);
      setError(null);

      const reportData: ReportData = {
        ...data,
        status: 'pending',
        createdAt: new Date(),
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