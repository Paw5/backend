import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Button, View, Alert, Text,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'flex-end',
    // justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container__button: {
    // border: '1px solid black',
    backgroundColor: '#000',
  },
});

function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={
          ({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Icon name={
              route.name === 'Home' ? 'list-outline' : 'settings-outline'
            }
              />
            ),
          })
}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar />
    </View>
  );
}
