import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../FirebaseConfig';
import { ReportData } from './useReport';
import { getUserId } from '../utils/storage';

export const useFetchReports = () => {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const userId = await getUserId();
        const q = query(
          collection(db, 'reports'),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );    
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
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reports');
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return { reports, loading, error };
}; 