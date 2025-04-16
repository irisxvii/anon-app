import { useRouter } from 'expo-router';
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useFetchReports } from '@/hooks/useFetchReports';
import { ReportData } from '@/hooks/useReport';
import { useUpdateReport } from '@/hooks/useUpdateReport';

type ReportWithId = ReportData & { id: string };

const formatDate = (date: Date | Timestamp) => {
    if (date instanceof Timestamp) {
        return date.toDate().toLocaleDateString();
    }
    return date.toLocaleDateString();
};

export default function AdminDashboard() {
    const router = useRouter();
    const { reports, loading, error } = useFetchReports();
    const { updateReportStatus, isUpdating } = useUpdateReport();
    const [expandedReports, setExpandedReports] = useState<{ [key: string]: boolean }>({});
    const scrollY = new Animated.Value(0);

    const toggleExpand = (reportId: string) => {
        setExpandedReports(prev => ({
            ...prev,
            [reportId]: !prev[reportId]
        }));
    };

    const handleStatusUpdate = async (reportId: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === 'pending' ? 'resolved' : 'pending';
            await updateReportStatus(reportId, newStatus);
        } catch (err) {
            console.error('Failed to update status:', err);
        }
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

    const validReports = reports.filter((report): report is ReportWithId => !!report.id);

    return (
        <ThemedView style={styles.mainContainer}>
            <ThemedText type="title" style={styles.appTitle}>
                Recent Reports
            </ThemedText>
            <ThemedText style={styles.caption}>
                Overview of all submitted concerns.
            </ThemedText>

            <Animated.ScrollView
                style={styles.scrollView}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                {validReports.length === 0 ? (
                    <ThemedText style={styles.noReportsText}>
                        No reports submitted yet
                    </ThemedText>
                ) : (
                    validReports.map((report, index) => {
                        const inputRange = [
                            -1,
                            0,
                            index * 100,
                            (index + 2) * 100
                        ];
                        const scale = scrollY.interpolate({
                            inputRange,
                            outputRange: [1, 1, 1, 0.8]
                        });
                        const opacity = scrollY.interpolate({
                            inputRange,
                            outputRange: [1, 1, 1, 0.3]
                        });

                        return (
                            <Animated.View
                                key={report.id}
                                style={[
                                    styles.reportContainer,
                                    {
                                        transform: [{ scale }],
                                        opacity
                                    }
                                ]}
                            >
                                <TouchableOpacity onPress={() => toggleExpand(report.id)}>
                                    <View style={styles.reportBox}>
                                        <View style={styles.reportHeader}>
                                            <Text style={styles.reportTitle}>{report.category}</Text>
                                            <TouchableOpacity
                                                onPress={(e) => {
                                                    e.stopPropagation();
                                                    handleStatusUpdate(report.id, report.status);
                                                }}
                                                disabled={isUpdating}
                                            >
                                                <Text
                                                    style={[
                                                        styles.reportStatus,
                                                        { color: report.status === 'resolved' ? '#00CC66' : '#FFA500' }
                                                    ]}
                                                >
                                                    {report.status}
                                                </Text>
                                            </TouchableOpacity>
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
                            </Animated.View>
                        );
                    })
                )}
            </Animated.ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 25,
    paddingVertical: 75,
    flex: 1,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 16,
    opacity: 0.7,
  },  
  reportBox: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    borderWidth: .5, 
    borderColor: '#ddd', 
    marginTop: 20,
    gap: 6,
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
    color: '#FFA500', 
  },
  resolved: {
    color: '#00CC66', 
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
  scrollView: {
    flex: 1,
  },
  reportContainer: {
    marginBottom: 15,
  },
});
