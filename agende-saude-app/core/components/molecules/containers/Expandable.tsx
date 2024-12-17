import { ExpandableProps } from '@/core/vo/types/components.props';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, LayoutChangeEvent } from 'react-native';

const Expandable: React.FC<ExpandableProps> = ({ expanded, children, duration = 300 }) => {
  const animationHeight = useRef(new Animated.Value(0)).current;
  const contentHeight = useRef(0);

  useEffect(() => {
    Animated.timing(animationHeight, {
      toValue: expanded ? contentHeight.current : 0,
      duration,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    contentHeight.current = height;
  };

  return (
    <Animated.View style={[styles.container, { height: animationHeight }]}>
      <View onLayout={handleLayout} style={styles.hiddenContent}>
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden'
  },
  hiddenContent: {
    width: '100%',
    flex: 1,
    position: 'absolute'
  },
});

export default Expandable;
