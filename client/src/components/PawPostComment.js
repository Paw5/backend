import {
  View, Text,
} from 'react-native';
import React from 'react';
import styles from '../constants/Styles';

export default function PawPostComment() {
  return (

    <View
      style={styles.inspostComment}
    >
      <Text style={styles.inspostCommentText}>Comment Example</Text>
    </View>

  );
}
