/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
// Required imports
import React, { useState, useEffect } from 'react';
import {
  View, TouchableOpacity, StyleSheet, Dimensions, Animated, Modal, Pressable, Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
// Component imports
import MapTab from '../views/Map';
import ServicesTab from '../views/Services';
import NewsTab from '../views/News';
import CommunityTab from '../views/Community';
import HealthTab from '../views/Health';
import SettingsPage from '../views/Settings';
import AccountPage from '../views/Account';
import PawPics from '../views/PawPics';
import PawPosts from '../views/PawPosts';
import PMs from '../views/PMs';

const TABBAR_WIDTH = Dimensions.get('window').width;
const TAB_WIDTH = TABBAR_WIDTH / 5;

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    position: 'absolute',
    width: Dimensions.get('window').width + 6,
    height: Platform.OS === 'ios' ? 80 : 73,
    borderRadius: 5,
    zIndex: 5,
    // borderWidth: 4,
    borderColor: 'rgba(158, 150, 150, .25)',
    bottom: -5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 100,
    shadowRadius: 20,
    elevation: 24,
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
    borderWidth: 0,
    borderColor: '#69A297', // all pages will be one color so,,, just set it to that color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 100,
    shadowRadius: 20,
    elevation: 24,
  },
  circle2: {
    position: 'absolute',
    width: 95,
    height: 95,
    borderRadius: 47.5,
    backgroundColor: '#FFFFFF',
    bottom: Platform.OS === 'ios' ? 15 : 8,
    borderWidth: 7,
    borderColor: '#69A297',
    elevation: 24,
  },
  pawPupPic: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginLeft: (((Dimensions.get('window').width) / 5) * 3.5) - 81,
    bottom: 85,
    borderWidth: 7,
    borderColor: '#69A297',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pawPupPost: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginLeft: (((Dimensions.get('window').width) / 5) * 3.5) - 25, // 55 normally
    bottom: Platform.OS === 'ios' ? 117 : 110, // 0 normally
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 7,
    borderColor: '#69A297',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pawPupPM: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginLeft: (((Dimensions.get('window').width) / 5) * 3.5) + 32,
    bottom: Platform.OS === 'ios' ? 92 : 85,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 7,
    borderColor: '#69A297',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalView: {
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFF',
    alignSelf: 'center',
  },
  pawPupHealth: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginLeft: (((Dimensions.get('window').width) / 5) * 4.5) - 95,
    bottom: Platform.OS === 'ios' ? 82 : 75,
    borderWidth: 7,
    borderColor: '#69A297',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pawPupAccount: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginLeft: (((Dimensions.get('window').width) / 5) * 4.5) - 55, // 55 normally
    bottom: Platform.OS === 'ios' ? 112 : 105, // 0 normally
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 7,
    borderColor: '#69A297',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pawPupSettings: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginLeft: (((Dimensions.get('window').width) / 5) * 4.5) - 5,
    bottom: Platform.OS === 'ios' ? 113 : 106,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 7,
    borderColor: '#69A297',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

function MyTabBar({ state, descriptors, navigation }) {
  const [translateX] = useState(new Animated.Value(0));
  const [commPopupVisible, makeCommPopupVisible] = useState(false);
  const [healthPopupVisible, makeHealthPopupVisible] = useState(false);

  const translateTab = (index) => {
    if (index > 4 && index < 7) {
      index = 4;
    } else if (index > 6) {
      index = 3;
    }
    Animated.spring(translateX, {
      toValue: index * (Dimensions.get('window').width / 5) + index,
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
        <View style={styles.circle2} />
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
            makeCommPopupVisible(true);
          } else if (route.name === 'H') {
            makeHealthPopupVisible(true);
          }
        };
        let buttonRaise = 0;
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            onFocus={isFocused ? buttonRaise = (Platform.OS === 'ios' ? 22 : 15) : buttonRaise = 0}
            style={{ flex: 1, alignItems: 'center', bottom: buttonRaise }}
            hitSlop={{
              top: 20, bottom: 20, left: 20, right: 20,
            }}
          >
            <Feather
              name={
                 // eslint-disable-next-line no-nested-ternary
                 label === 'N' && isFocused ? 'book-open' : label === 'N' ? 'book' : label === 'M' ? 'map-pin' : label === 'S' ? 'compass' : label === 'C' ? 'users' : label === 'H' ? 'activity' : 'home'
              }
              size={
                isFocused ? 50 : 30
              }
              color="#333333"
              style={{ justifyContent: 'center' }}
            />
          </TouchableOpacity>
        );
      })}
      <View style={styles.modalView}>
        <Modal
          animationType="fade"
          transparent
          visible={commPopupVisible}
          onRequestClose={() => {
            makeCommPopupVisible(!commPopupVisible);
          }}
        >
          <Pressable
            style={styles.pawPupPic}
            onPress={() => {
              makeCommPopupVisible(!commPopupVisible);
              navigation.navigate('PawPics');
            }}
          >
            <Feather
              name="image"
              size={20}
              color="black"
              style={{ justifyContent: 'center' }}
            />
          </Pressable>
          <Pressable
            style={styles.pawPupPost}
            onPress={() => {
              makeCommPopupVisible(!commPopupVisible);
              navigation.navigate('PawPosts');
            }}
          >
            <Feather
              name="file-text"
              size={20}
              color="black"
              style={{ justifyContent: 'center' }}
            />
          </Pressable>
          <Pressable
            style={styles.pawPupPM}
            onPress={() => {
              makeCommPopupVisible(!commPopupVisible);
              navigation.navigate('PMs');
            }}
          >
            <Feather
              name="message-square"
              size={20}
              color="black"
              style={{ justifyContent: 'center' }}
            />
          </Pressable>
        </Modal>
        <Modal
          animationType="fade"
          transparent
          visible={healthPopupVisible}
          onRequestClose={() => {
            makeHealthPopupVisible(!healthPopupVisible);
          }}
        >
          <Pressable
            style={styles.pawPupHealth}
            onPress={() => {
              makeHealthPopupVisible(!healthPopupVisible);
              navigation.navigate('H');
            }}
          >
            <Feather
              name="heart"
              size={20}
              color="black"
              style={{ justifyContent: 'center' }}
            />
          </Pressable>
          <Pressable
            style={styles.pawPupAccount}
            onPress={() => {
              makeHealthPopupVisible(!healthPopupVisible);
              navigation.navigate('AccountPage');
            }}
          >
            <Feather
              name="user"
              size={20}
              color="black"
              style={{ justifyContent: 'center' }}
            />
          </Pressable>
          <Pressable
            style={styles.pawPupSettings}
            onPress={() => {
              makeHealthPopupVisible(!healthPopupVisible);
              navigation.navigate('SettingsPage');
            }}
          >
            <Feather
              name="settings"
              size={20}
              color="black"
              style={{ justifyContent: 'center' }}
            />
          </Pressable>
        </Modal>
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="N"
      screenOptions={{ headerShown: false }}
      // eslint-disable-next-line react/no-unstable-nested-components, react/jsx-props-no-spreading
      tabBar={(props) => <MyTabBar {...props} state={{ ...props.state, routes: props.state.routes.slice(0, 5) }} />}
    >
      <Tab.Screen name="M" component={MapTab} />
      <Tab.Screen name="S" component={ServicesTab} />
      <Tab.Screen name="N" component={NewsTab} />
      <Tab.Screen name="C" component={CommunityTab} />
      <Tab.Screen name="H" component={HealthTab} />
      <Tab.Screen name="SettingsPage" component={SettingsPage} />
      <Tab.Screen name="AccountPage" component={AccountPage} />
      <Tab.Screen name="PawPics" component={PawPics} />
      <Tab.Screen name="PawPosts" component={PawPosts} />
      <Tab.Screen name="PMs" component={PMs} />
    </Tab.Navigator>
  );
}

export default function NavBar() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
