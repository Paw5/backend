/* eslint-disable no-unused-vars */
import {
  View, Text, ScrollView, Pressable, Image,
} from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DropShadow from 'react-native-drop-shadow';
import { Feather } from '@expo/vector-icons';
import SearchBar from './SearchBarServ';
import styles from '../constants/Styles';

const miso = require('../../assets/miso.jpg');

const StatusBarHeight = getStatusBarHeight();
export default function ServNode() {
  return (
    <View>
      <DropShadow style={styles.shadowProp}>
        <Pressable style={[styles.servContainer, { height: 125 }]}>
          <View
            style={styles.servLeft}
          >
            <Image
              style={styles.servImage}
              source={miso}
            />
            <View
              style={styles.servCheck}
            >
              <Feather
                name="check"
                size={24}
                color="black"
                style={{ alignSelf: 'center' }}
              />

            </View>
          </View>
          <Text style={styles.servHeader}>Location Name</Text>
          <Text style={styles.servHeader2}>Service Type</Text>
          <Feather
            name="star"
            size={20}
            color="black"
            style={styles.servStar1}
          />
          <Feather
            name="star"
            size={20}
            color="black"
            style={styles.servStar2}
          />
          <Feather
            name="star"
            size={20}
            color="black"
            style={styles.servStar3}
          />
          <Feather
            name="star"
            size={20}
            color="black"
            style={styles.servStar4}
          />
          <Feather
            name="star"
            size={20}
            color="black"
            style={styles.servStar5}
          />
          <View
            style={{
              borderBottomColor: '#e0777d',
              borderBottomWidth: 3,
              borderRadius: 50,
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 100,
              marginRight: 10,
            }}
          />
          <Text style={styles.servHeader2}>Descriptive Text</Text>
        </Pressable>

      </DropShadow>
    </View>
  );
}
