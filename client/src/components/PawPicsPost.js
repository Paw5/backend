/* eslint-disable no-unused-vars */
import {
  View, Text, ScrollView, Pressable, Image, Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DropShadow from 'react-native-drop-shadow';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import SearchBar from './SearchBarServ';
import styles, { pawPink, pawGrey } from '../constants/Styles';

const miso = require('../../assets/miso.jpg');

const StatusBarHeight = getStatusBarHeight();

export default function PawPostPost() {
  const [isPicVisible, setPicVisible] = useState(false);
  const togglePic = () => {
    setPicVisible(!isPicVisible);
  };

  return (
    <View>
      {/* <DropShadow style={styles.shadowProp}> */}
      <Pressable style={[styles.picContainer, { height: 400 }]} onPress={togglePic}>
        <Image
          style={styles.picImage}
          source={miso}
        />
        <View
          style={styles.picBottomBand}
        />
        <Pressable>
          <Feather
            name="heart"
            size={24}
            color={pawPink}
            style={styles.likeLoc1}
          />

        </Pressable>
        <Pressable style={styles.ppProfileNameNode}>
          <Text style={styles.picHeader2}>@user-name</Text>
        </Pressable>
        <Image
          style={styles.ppProfileImage}
          source={miso}
        />
        <Text style={[styles.picDescription, { left: 2, top: 290 }]}>Descriptive Text</Text>
        <View
          style={{
            borderBottomColor: pawPink,
            borderBottomWidth: 1,
            borderRadius: 50,
            top: 330,
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 20,
            marginRight: 20,
          }}
        />
        <Text style={[styles.picTag, { left: 2, top: 325 }]}>Tags</Text>
      </Pressable>

      {/* </DropShadow> */}
      <Modal
        isVisible={isPicVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.picsModal}
      >
        <View>
          <View style={{ backgroundColor: pawPink, height: StatusBarHeight, marginLeft: -10 }} />
          <Image
            style={styles.inspicImage}
            source={miso}
          />
          <View
            style={styles.inspicBottomBand}
          />
          <View style={styles.inspicContainer} />
          <Pressable>
            <Feather
              name="heart"
              size={24}
              color={pawPink}
              style={styles.likeLoc2}
            />

          </Pressable>
          <Pressable style={styles.insppProfileNameNode}>
            <Text style={styles.inspicHeader2}>@user-name</Text>
          </Pressable>
          <Image
            style={styles.insppProfileImage}
            source={miso}
          />
          <Text style={[styles.inspicDescription, { left: -8, top: (Dimensions.get('window').width - 20) }]}>Descriptive Text</Text>
          <View
            style={{
              borderBottomColor: pawPink,
              borderBottomWidth: 1,
              borderRadius: 50,
              top: (Dimensions.get('window').width + 20),
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 20,
            }}
          />
          <Text style={[styles.inspicTag, { left: -8, top: (Dimensions.get('window').width + 15) }]}>Tags</Text>
          <Pressable
            onPress={togglePic}
            style={{ alignSelf: 'flex-start', zIndex: 45, top: -60 }}
          >
            <Feather
              name="chevron-left"
              size={30}
              color={pawGrey}
              style={styles.exitPicButton}
            />

          </Pressable>
        </View>
        <View
          style={{
            borderColor: pawGrey,
            borderWidth: 2,
            borderRadius: 50,
            top: (Dimensions.get('window').width + 100),
            height: (Dimensions.get('window').height / 3),
            width: 1,
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 20,
            marginRight: 20,
            position: 'absolute',
          }}
        />
        <ScrollView contentInset={{ bottom: 150 }} style={{ marginLeft: 20, marginTop: (Dimensions.get('window').width - 20), marginBottom: 30 }}>
          {/* REMOVE FROM HERE */}
          <View
            style={{
              backgroundColor: 'white',
              width: (Dimensions.get('window').height - 550),
              height: 25,
              borderRadius: 100,
              marginTop: 10,
              marginBottom: 5,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 10,
            }}
          >
            <Text>Comment Example</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: (Dimensions.get('window').height - 550),
              height: 25,
              borderRadius: 100,
              marginTop: 10,
              marginBottom: 5,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 10,
            }}
          >
            <Text>Comment Example</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: (Dimensions.get('window').height - 550),
              height: 25,
              borderRadius: 100,
              marginTop: 10,
              marginBottom: 5,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 10,
            }}
          >
            <Text>Comment Example</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: (Dimensions.get('window').height - 550),
              height: 25,
              borderRadius: 100,
              marginTop: 10,
              marginBottom: 5,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 10,
            }}
          >
            <Text>Comment Example</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: (Dimensions.get('window').height - 550),
              height: 25,
              borderRadius: 100,
              marginTop: 10,
              marginBottom: 5,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 10,
            }}
          >
            <Text>Comment Example</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: (Dimensions.get('window').height - 550),
              height: 25,
              borderRadius: 100,
              marginTop: 10,
              marginBottom: 5,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 10,
            }}
          >
            <Text>Comment Example</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: (Dimensions.get('window').height - 550),
              height: 25,
              borderRadius: 100,
              marginTop: 10,
              marginBottom: 5,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 10,
            }}
          >
            <Text>Comment Example</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: (Dimensions.get('window').height - 550),
              height: 25,
              borderRadius: 100,
              marginTop: 10,
              marginBottom: 5,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 10,
            }}
          >
            <Text>Comment Example</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: (Dimensions.get('window').height - 550),
              height: 25,
              borderRadius: 100,
              marginTop: 10,
              marginBottom: 5,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 10,
            }}
          >
            <Text>Comment Example</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: (Dimensions.get('window').height - 550),
              height: 25,
              borderRadius: 100,
              marginTop: 10,
              marginBottom: 5,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 10,
            }}
          >
            <Text>Comment Example</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: (Dimensions.get('window').height - 550),
              height: 25,
              borderRadius: 100,
              marginTop: 10,
              marginBottom: 5,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 10,
            }}
          >
            <Text>Comment Example</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: (Dimensions.get('window').height - 550),
              height: 25,
              borderRadius: 100,
              marginTop: 10,
              marginBottom: 5,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 10,
            }}
          >
            <Text>Comment Example</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: (Dimensions.get('window').height - 550),
              height: 25,
              borderRadius: 100,
              marginTop: 10,
              marginBottom: 5,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 10,
            }}
          >
            <Text>Comment Example</Text>
          </View>

          {/* REMOVE TO HERE */}
        </ScrollView>
      </Modal>
    </View>
  );
}
