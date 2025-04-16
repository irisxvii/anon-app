import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../FirebaseConfig';
import { ReportStatus } from './useReport';

export const useUpdateReport = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateReportStatus = async (reportId: string, newStatus: ReportStatus) => {
        try {
            setIsUpdating(true);
            setError(null);

            const reportRef = doc(db, 'reports', reportId);
            await updateDoc(reportRef, {
                status: newStatus
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update report status');
            throw err;
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        updateReportStatus,
        isUpdating,
        error
    };
}; 