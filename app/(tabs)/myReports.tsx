import { useRouter } from 'expo-router';
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useFetchReports } from '@/hooks/useFetchReports';
import { ReportData } from '@/hooks/useReport';

// Make id required for the reports list
type ReportWithId = ReportData & { id: string };

const formatDate = (date: Date | Timestamp) => {
    if (date instanceof Timestamp) {
        return date.toDate().toLocaleDateString();
    }
    return date.toLocaleDateString();
};

export default function MyReports() {
    const router = useRouter();
    const { reports, loading, error } = useFetchReports();
    const [expandedReports, setExpandedReports] = useState<{ [key: string]: boolean }>({});

    const toggleExpand = (reportId: string) => {
        setExpandedReports(prev => ({
            ...prev,
            [reportId]: !prev[reportId]
        }));
    };

    if (loading) {
        return (
            <ThemedView style={styles.mainContainer}>
                <ActivityIndicator size="large" color="#10B77F" />
            </ThemedView>
        );
    }

    if (error) {
        return (
            <ThemedView style={styles.mainContainer}>
                <ThemedText style={styles.errorText}>Error loading reports: {error}</ThemedText>
            </ThemedView>
        );
    }

    // Filter out any reports without an id and cast to ReportWithId
    const validReports = reports.filter((report): report is ReportWithId => !!report.id);

    return (
        <ThemedView style={styles.mainContainer}>
            <ThemedText type="title" style={styles.appTitle}>
                My Reports
            </ThemedText>
            <ThemedText style={styles.caption}>
                Track the status of your reports
            </ThemedText>
            <ScrollView style={styles.scrollView}>
            {validReports.length === 0 ? (
                <ThemedText style={styles.noReportsText}>
                    No reports submitted yet
                </ThemedText>
            ) : (
                validReports.map((report) => (
                    <TouchableOpacity 
                        key={report.id} 
                        onPress={() => toggleExpand(report.id)}
                    >
                        <View style={styles.reportBox}>
                            <View style={styles.reportHeader}>
                                <Text style={styles.reportTitle}>{report.category}</Text>
                                <Text style={[
                                    styles.reportStatus,
                                    { color: report.status === 'resolved' ? '#00CC66' : '#FFA500' }
                                ]}>
                                    {report.status}
                                </Text>
                            </View>
                            <Text style={styles.reportDescription}>
                                {expandedReports[report.id] 
                                    ? report.description 
                                    : report.description.length > 50 
                                        ? `${report.description.substring(0, 50)}...`
                                        : report.description}
                            </Text>
                            {expandedReports[report.id] && (
                                <View style={styles.detailsContainer}>
                                    <View style={styles.detailRow}>
                                        <View style={styles.detailLabelContainer}>
                                            <Text style={styles.detailLabel}>Location:</Text>
                                        </View>
                                        <Text style={styles.detailValue}>{report.location}</Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <View style={styles.detailLabelContainer}>
                                            <Text style={styles.detailLabel}>Date & Time of Incident:</Text>
                                        </View>
                                        <Text style={styles.detailValue}>{report.date}</Text>
                                    </View>
                                    {report.vehicle && (
                                        <View style={styles.detailRow}>
                                            <View style={styles.detailLabelContainer}>
                                                <Text style={styles.detailLabel}>Vehicle Details:</Text>
                                            </View>
                                            <Text style={styles.detailValue}>{report.vehicle}</Text>
                                        </View>
                                    )}
                                </View>
                            )}
                            <Text style={styles.reportDate}>
                                Reported on: {formatDate(report.createdAt)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))
            )}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 25,
    paddingTop: 60,
    flex: 1,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 8,
  },  
  reportBox: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    borderWidth: .5, 
    borderColor: '#ddd', 
    marginTop: 14,
    gap: 7,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  reportStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  reportDescription: {
    fontSize: 15,
    color: 'white',
  },
  reportDate: {
    fontSize: 13,
    color: '#777',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
},
noReportsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    opacity: 0.7,
},
scrollView: {
    flex: 1,
    marginBottom: 10,
},
detailsContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#444',
    gap: 8,
},
detailRow: {
    flexDirection: 'row',
    gap: 8,
},
detailLabelContainer: {
    width: 150,
},
detailLabel: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
},
detailValue: {
    fontSize: 14,
    color: 'white',
    flex: 1,
},
});
