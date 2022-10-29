/* eslint-disable max-len */
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
import styles from '../constants/Styles';

const miso = require('../../assets/miso.jpg');

const StatusBarHeight = getStatusBarHeight();

export default function PawPostPost() {
  const [isPostVisible, setPostVisible] = useState(false);
  const togglePost = () => {
    setPostVisible(!isPostVisible);
  };
  return (
    <View>
      {/* <DropShadow style={styles.shadowProp}> */}
      <Pressable style={[styles.postContainer, { height: 200, marginTop: 30 }]} onPress={togglePost}>
        <Text style={[styles.postDescription, {
          paddingLeft: 0, top: 30, paddingBottom: 50, paddingRight: 10,
        }]}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute i
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fiat nulla paatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.

        </Text>
      </Pressable>
      <Pressable style={[styles.ppoProfileNameNode, { zIndex: 48, alignSelf: 'center' }]}>
        <Text style={[styles.postHeader2, { zIndex: 49 }]}>@user-name</Text>
      </Pressable>
      <Image
        style={[styles.ppoProfileImage, { zIndex: 50 }]}
        source={miso}
      />

      {/* </DropShadow> */}
      <Modal
        isVisible={isPostVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.postModal}
      >
        <View>
          <Text style={[styles.postDescription, {
            paddingLeft: 0, top: 70, paddingBottom: 50, paddingRight: 10, position: 'absolute',
          }]}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute i
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fiat nulla paatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.

            Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute i
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fiat nulla paatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Text>
          <View style={styles.inspostContainer} />
          <Pressable>
            <Feather
              name="heart"
              size={24}
              color="#e0777d"
              style={styles.likeLocPost}
            />

          </Pressable>
          <Pressable>
            <Feather
              name="send"
              size={24}
              color="#e0777d"
              style={styles.commLocPost}
            />

          </Pressable>
          <Pressable style={styles.insppoProfileNameNode}>
            <Text style={styles.inspostHeader2}>@user-name</Text>
          </Pressable>
          <Image
            style={styles.insppoProfileImage}
            source={miso}
          />

          <View
            style={{
              borderBottomColor: '#e0777d',
              borderBottomWidth: 1,
              borderRadius: 50,
              top: (Dimensions.get('window').width + 60),
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 20,
            }}
          />
          <Text style={[styles.inspostTag, { left: -8, top: (Dimensions.get('window').width + 60) }]}>Tags</Text>
          <Pressable
            onPress={togglePost}
            style={{ alignSelf: 'flex-start', zIndex: 45, top: -15 }}
          >
            <Feather
              name="chevron-left"
              size={30}
              color="white"
              style={styles.exitPostButton}
            />

          </Pressable>
        </View>
        <View
          style={{
            borderColor: 'white',
            borderWidth: 2,
            borderRadius: 50,
            top: (Dimensions.get('window').width + 100),
            height: (Dimensions.get('window').height - 527),
            width: 1,
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 20,
            marginRight: 20,
            position: 'absolute',
          }}
        />
        <ScrollView contentInset={{ bottom: 150 }} style={{ marginLeft: 20, marginTop: (Dimensions.get('window').width + 22), marginBottom: 30 }}>
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
