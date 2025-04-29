import { CircleAlert, Eye, Pill, Shield } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { CustomTransition } from '@/components/CustomTransition';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ReportCategory } from '@/hooks/useReport';
import { useRouter } from 'expo-router';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function ReportScreen() {
  const router = useRouter();

  const handleCategorySelect = (category: ReportCategory) => {
    router.push({
      pathname: '/screens/detail',
      params: { category }
    });
  };

  return (
    <CustomTransition >
      <ThemedView style={styles.mainContainer}>
        <View style={styles.background} />
        <Animated.View 
          entering={FadeIn.delay(200)}
          style={styles.headerContainer}
        >
          <ThemedText type="title" style={styles.appTitle}>
            Select Category
          </ThemedText>
          <ThemedText style={styles.caption}>
            Choose the type of incident to report
          </ThemedText>
        </Animated.View>

        <View style={styles.buttonsGrid}>
          <AnimatedTouchableOpacity 
            style={styles.buttonOutlined}
            onPress={() => handleCategorySelect('Drug Related')}
            entering={FadeIn.delay(300)}
          >
            <View style={styles.iconContainer}>
              <Pill size={32} color="white" />
            </View>
            <Text style={styles.buttonText}>{'Drug\nRelated'}</Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity 
            style={styles.buttonOutlined}
            onPress={() => handleCategorySelect('Abuse Cases')}
            entering={FadeIn.delay(400)}
          >
            <View style={styles.iconContainer}>
              <Shield size={32} color="white" />
            </View>
            <Text style={styles.buttonText}>{'Abuse\nCases'}</Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity 
            style={styles.buttonOutlined}
            onPress={() => handleCategorySelect('Suspicious Activity')}
            entering={FadeIn.delay(500)}
          >
            <View style={styles.iconContainer}>
              <Eye size={32} color="white" />
            </View>
            <Text style={styles.buttonText}>Suspicious Activity</Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity 
            style={styles.buttonOutlined}
            onPress={() => handleCategorySelect('Other Issues')}
            entering={FadeIn.delay(600)}
          >
            <View style={styles.iconContainer}>
              <CircleAlert size={32} color="white" />
            </View>
            <Text style={styles.buttonText}>{'Other\nIssues'}</Text>
          </AnimatedTouchableOpacity>
        </View>
      </ThemedView>
    </CustomTransition>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
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
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 3,
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  buttonOutlined: {
    width: '40%',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});

