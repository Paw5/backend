import {
  View, Text, ScrollView, Pressable, Image, Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import styles, {
  pink2yellow, pink2green, white2yellow, white2green,
} from '../constants/Styles';
import PawPostComment from './PawPostComment';

const miso = require('../../assets/miso.jpg');

export default function PawPostPost() {
  const [isPostVisible, setPostVisible] = useState(false);
  const togglePost = () => {
    setPostVisible(!isPostVisible);
  };
  return (
    <View>
      <Pressable
        style={[styles.postContainer, { height: 200, marginTop: 30 }]}
        onPress={togglePost}
      >
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

      <Modal
        isVisible={isPostVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.postModal}
      >
        <View>

          <View style={styles.inspostContainer}>
            <Pressable
              onPress={togglePost}
              style={{
                alignSelf: 'flex-start',
                position: 'absolute',
                left: 19,
                top: 21,
              }}
            >
              <Feather
                name="chevron-left"
                size={30}
                color={white2yellow}
                style={styles.exitPostButton}
              />

            </Pressable>
            <Pressable>
              <Feather
                name="heart"
                size={24}
                color={pink2yellow}
                style={styles.likeLocPost}
              />

            </Pressable>
            <Pressable>
              <Feather
                name="send"
                size={24}
                color={pink2yellow}
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

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 90, marginBottom: 10 }}
            >
              <Text style={styles.inspostDescription}>
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

                Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute i
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fiat nulla paatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </Text>
            </ScrollView>

            <View
              style={{
                borderBottomColor: pink2green,
                borderBottomWidth: 1,
                borderRadius: 50,
                marginBottom: 5,
                marginLeft: 10,
                marginRight: 20,
              }}
            />

            <Text style={styles.inspostTag}>Tags</Text>
          </View>
        </View>
        <View
          style={{
            borderColor: white2green,
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
        <ScrollView
          style={{
            marginLeft: 20,
            marginBottom: 30,
          }}
        >
          <PawPostComment />
          <PawPostComment />
          <PawPostComment />
          <PawPostComment />
          <PawPostComment />
          <PawPostComment />
          <PawPostComment />
          <PawPostComment />
          <PawPostComment />
          <PawPostComment />
        </ScrollView>
      </Modal>
    </View>
  );
}
