import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../FirebaseConfig';

export type ReportCategory = 'Drug Related' | 'Abuse Cases' | 'Suspicious Activity' | 'Other Issues';
export type ReportStatus = 'Pending' | 'Reviewed';

export interface ReportData {
  id?: string;
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

  const submitReport = async (data: Omit<ReportData, 'status' | 'createdAt' | 'id'>) => {
    console.log('starting submission');
    try {
      setIsSubmitting(true);
      setError(null);

      const reportData: Omit<ReportData, 'id'> = {
        ...data,
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