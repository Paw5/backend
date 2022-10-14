// Required imports
import React from 'react';
import { registerRootComponent } from 'expo';

// Component imports
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Settings from './Settings';
import Home from './Home';

const { Navigator, Screen } = require('@react-navigation/bottom-tabs').createBottomTabNavigator();

const getTabBarIcon = ({ focused, color }) => (
  <Ionicons name="cog" size={32} color={focused ? color : 'red'} />
);

export default function App() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, tabBarIcon: getTabBarIcon }}>
        <Screen name="Home" component={Home} />
        <Screen name="Settings" component={Settings} />
        <Screen name="Community" component={Home} />
        <Screen name="Map" component={Settings} />
        <Screen name="Account" component={Home} />
      </Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
