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
            <Pill size={38} color="white" />
            <Text style={styles.buttonText}>{'Drug\nRelated'}</Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity 
            style={styles.buttonOutlined}
            onPress={() => handleCategorySelect('Abuse Cases')}
            entering={FadeIn.delay(400)}
          >
            <Shield size={39} color="white" />
            <Text style={styles.buttonText}>{'Abuse\nCases'}</Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity 
            style={styles.buttonOutlined}
            onPress={() => handleCategorySelect('Suspicious Activity')}
            entering={FadeIn.delay(500)}
          >
            <Eye size={39} color="white" />
            <Text style={styles.buttonText}>Suspicious Activity</Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity 
            style={styles.buttonOutlined}
            onPress={() => handleCategorySelect('Other Issues')}
            entering={FadeIn.delay(600)}
          >
            <CircleAlert size={39} color="white" />
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
  headerContainer: {
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 16,
    opacity: 0.7,
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  buttonOutlined: {
    width: '40%',
    borderColor: 'white',
    borderWidth: 2,
    paddingVertical: 18,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});

