import { useRouter } from 'expo-router';
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, Layout } from 'react-native-reanimated';

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

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

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
                <View style={styles.background} />
                <ActivityIndicator size="large" color="white" />
            </ThemedView>
        );
    }

    if (error) {
        return (
            <ThemedView style={styles.mainContainer}>
                <View style={styles.background} />
                <ThemedText style={styles.errorText}>Error loading reports: {error}</ThemedText>
            </ThemedView>
        );
    }

    // Filter out any reports without an id and cast to ReportWithId
    const validReports = reports.filter((report): report is ReportWithId => !!report.id);

    return (
        <ThemedView style={styles.mainContainer}>
            <View style={styles.background} />
            <Animated.View 
                entering={FadeIn.delay(200)}
                style={styles.headerContainer}
            >
                <ThemedText type="title" style={styles.appTitle}>
                    My Reports
                </ThemedText>
                <ThemedText style={styles.caption}>
                    Track the status of your reports
                </ThemedText>
            </Animated.View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {validReports.length === 0 ? (
                    <Animated.View 
                        entering={FadeInDown.delay(300)}
                        style={styles.noReportsContainer}
                    >
                        <ThemedText style={styles.noReportsText}>
                            No reports submitted yet
                        </ThemedText>
                    </Animated.View>
                ) : (
                    validReports.map((report, index) => (
                        <AnimatedTouchableOpacity 
                            key={report.id}
                            entering={FadeInDown.delay(300 + index * 100)}
                            layout={Layout.springify()}
                            style={styles.reportBox}
                            onPress={() => toggleExpand(report.id)}
                        >
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
                                <Animated.View 
                                    entering={FadeIn.delay(100)}
                                    style={styles.detailsContainer}
                                >
                                    <View style={styles.detailRow}>
                                        <View style={styles.detailLabelContainer}>
                                            <Text style={styles.detailLabel}>Location:</Text>
                                        </View>
                                        <Text style={styles.detailValue}>{report.location}</Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <View style={styles.detailLabelContainer}>
                                            <Text style={styles.detailLabel}>Date & Time:</Text>
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
                                </Animated.View>
                            )}
                            <Text style={styles.reportDate}>
                                Reported on: {formatDate(report.createdAt)}
                            </Text>
                        </AnimatedTouchableOpacity>
                    ))
                )}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#10B77F',
    opacity: 0.1,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
},
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  caption: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 8,
    color: 'white',
  },  
  scrollView: {
    flex: 1,
},
noReportsContainer: {
    alignItems: 'center',
    marginTop: 40,
},
noReportsText: {
    fontSize: 16,
    opacity: 0.7,
    color: 'white',
  },
  reportBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.1)', 
    marginBottom: 15,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
    opacity: 0.9,
    marginBottom: 10,
  },
  reportDate: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
},
detailsContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
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
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
},
detailValue: {
    fontSize: 14,
    color: 'white',
    flex: 1,
},
});
