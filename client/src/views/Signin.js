import {
  View, Text, Pressable,
} from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';
import styles from '../constants/Styles';

export default function Home() {
  /* toggle sigin section modal */
  const [isSigninVisible, setSigninVisible] = useState(false);
  const toggleSignin = () => {
    setSigninVisible(!isSigninVisible);
  };

  /* toggle register section modal */
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const toggleRegister = () => {
    setRegisterVisible(!isRegisterVisible);
  };

  return (
    <View style={styles.background}>
      <View style={styles.statusBar} />
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>

        <Pressable
          onPress={toggleSignin}
          style={styles.signinbutton}
        >
          <Text style={styles.signintext}>Sign In</Text>
        </Pressable>
        <Pressable
          onPress={toggleRegister}
          style={styles.signinbutton}
        >
          <Text style={styles.signintext}>Register</Text>
        </Pressable>

      </View>

      <Modal
        isVisible={isSigninVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.signinModal}
      >
        <Pressable
          onPress={toggleSignin}
          style={{ alignSelf: 'flex-start' }}
        >
          <Feather
            name="chevron-left"
            size={30}
            color="#333333"
            style={styles.settingsExitButton}
          />

        </Pressable>
        <Text>Signin</Text>
      </Modal>

      <Modal
        isVisible={isRegisterVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.signinModal}
      >
        <Pressable
          onPress={toggleRegister}
          style={{ alignSelf: 'flex-start' }}
        >
          <Feather
            name="chevron-left"
            size={30}
            color="#333333"
            style={styles.settingsExitButton}
          />

        </Pressable>
        <Text>Register</Text>
      </Modal>

    </View>

  );
}
