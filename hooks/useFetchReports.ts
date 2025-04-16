import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../FirebaseConfig';
import { ReportData } from './useReport';

export const useFetchReports = () => {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const reportsData: ReportData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<ReportData, 'id'>;
          reportsData.push({
            id: doc.id,
            ...data
          });
        });
        setReports(reportsData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { reports, loading, error };
}; 