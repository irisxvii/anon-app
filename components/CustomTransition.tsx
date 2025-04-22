import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from 'react-native-reanimated';

interface CustomTransitionProps {
  children: React.ReactNode;
  delay?: number;
}

export function CustomTransition({ children, delay = 0 }: CustomTransitionProps) {
  const scale = useSharedValue(0.8);
  const rotate = useSharedValue(5);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Spring animation for scale and rotation
    scale.value = withDelay(
      delay,
      withSpring(1, {
        damping: 12,
        stiffness: 100,
        mass: 0.5,
      })
    );

    // Sequence animation for rotation
    rotate.value = withDelay(
      delay,
      withSequence(
        withTiming(-5, { duration: 200 }),
        withSpring(0, {
          damping: 12,
          stiffness: 100,
        })
      )
    );

    // Fade in animation
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 300 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotate.value}deg` }
      ],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 