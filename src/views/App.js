/* eslint-disable max-len */
/* eslint-disable react/prop-types */
// Required imports
import React, { useState, useEffect } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, Dimensions, Animated,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { registerRootComponent } from 'expo';

// Component imports
import MapTab from './Map';
import ServicesTab from './Services';
import NewsTab from './News';
import CommunityTab from './Community';
import HealthTab from './Health';

const { width } = Dimensions.get('window');
const TABBAR_WIDTH = width;
const TAB_WIDTH = TABBAR_WIDTH / 5;

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    position: 'absolute',
    width: TABBAR_WIDTH,
    height: 68,
    borderRadius: 5,
    bottom: -5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  circleAnimated: {
    width: TAB_WIDTH,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    bottom: 30,
    borderWidth: 7,
    borderColor: '#69A297', // all pages will be one color so,,, just set it to that color
  },
  popupButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#000000',
  },
});

function MyTabBar({ state, descriptors, navigation }) {
  const [translateX] = useState(new Animated.Value(0));

  const translateTab = (index) => {
    Animated.spring(translateX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    translateTab(state.index);
  }, [state.index]);
  return (
    <View style={styles.tabBarContainer}>
      <Animated.View
        style={[styles.circleAnimated, { transform: [{ translateX }] }]}
      >
        <View style={styles.circle} />
      </Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const optionsLabel = options.tabBarLabel || options.title;
        const label = optionsLabel || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          if (route.name === 'M') {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          } else if (route.name === 'S') {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          } else if (route.name === 'N') {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          } else if (route.name === 'C') {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="N"
      screenOptions={
        { headerShown: false, backBehavior: 'history' }
      }
      // eslint-disable-next-line react/no-unstable-nested-components, react/jsx-props-no-spreading
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="M" component={MapTab} />
      <Tab.Screen name="S" component={ServicesTab} />
      <Tab.Screen name="N" component={NewsTab} />
      <Tab.Screen name="C" component={CommunityTab} />
      <Tab.Screen name="H" component={HealthTab} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

registerRootComponent(App);
