import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolate,
  Extrapolation,
  FadeInRight,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
  DrawerWrapperProps,
  DrawerWrapperRefProps,
} from 'types/drawerWrapperTypes';

import getStyleObj from './style';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const THRESHOLD = SCREEN_WIDTH / 3;
const OPENED_SIZE = SCREEN_WIDTH / 1.6;

// stack screens where we want navigate from Drawer
const TABS = [
  {
    key: 'Example',
    name: 'Example',
  },
  {
    key: 'Example1',
    name: 'Example 1',
  },
  {
    key: 'Example2',
    name: 'Example 2',
  },
  {
    key: 'Example3',
    name: 'Example 3',
  },
];

const DrawerSceneWrapper: ForwardRefRenderFunction<
  DrawerWrapperRefProps,
  DrawerWrapperProps
> = ({children}, ref) => {
  const styles = getStyleObj({});
  const translateX = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const {replace} = useNavigation();

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number}
  >({
    onStart: (_, context) => {
      context.x = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = Math.max(event.translationX + context.x, 0);
    },
    onEnd: () => {
      if (translateX.value <= THRESHOLD) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(OPENED_SIZE, {
          duration: 500,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      }
    },
  });

  const childrenAnimStyle = useAnimatedStyle(() => ({
    transform: [
      {perspective: 100},
      {
        translateX: translateX.value,
      },
      {
        translateY: interpolate(
          translateX.value,
          [0, 100],
          [0, insets.top + 12],
          Extrapolation.CLAMP,
        ),
      },
      {
        rotate: `-${interpolate(
          translateX.value,
          [0, SCREEN_WIDTH],
          [0, 16],
          Extrapolate.CLAMP,
        )}deg`,
      },
    ],
    borderTopLeftRadius: interpolate(
      translateX.value,
      [0, 1],
      [0, 32],
      Extrapolation.CLAMP,
    ),
    paddingTop: interpolate(
      translateX.value,
      [0, SCREEN_WIDTH],
      [insets.top, 0],
      Extrapolation.CLAMP,
    ),
    overflow: 'hidden',
  }));

  const menuStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, 1], [0, 1], Extrapolation.CLAMP),
    transform: [
      {
        translateY: interpolate(
          translateX.value,
          [0, 100],
          [0, insets.top],
          Extrapolation.CLAMP,
        ),
      },
    ],
    borderTopLeftRadius: interpolate(
      translateX.value,
      [0, 1],
      [0, 32],
      Extrapolation.CLAMP,
    ),
  }));

  const onPress = useCallback(() => {
    if (translateX.value > 0) {
      translateX.value = withTiming(0);
    } else {
      translateX.value = withTiming(OPENED_SIZE);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    openDrawer: () => {
      onPress();
    },
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.drawerWrapper, menuStyle]}>
        <View style={styles.drawerContent}>
          <Text style={styles.userName}>Name</Text>
          <View style={styles.screensWrapper}>
            {TABS?.map(item => (
              <TouchableOpacity
                onPress={() => {
                  replace(item.key);
                }}
                disabled={item?.key === route?.name}
                style={[
                  styles.screenBTN,
                  item?.key === route?.name && styles.screenBTNActive,
                ]}>
                <Text
                  style={[
                    styles.screensTitle,
                    item?.key === route?.name && styles.screensTitleActive,
                  ]}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.logout}>
            <TouchableOpacity style={styles.logoutBTN}>
              <Text style={styles.logoutT}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          entering={FadeInRight.delay(100).stiffness(50)}
          style={[styles.root, childrenAnimStyle]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default forwardRef(DrawerSceneWrapper);
