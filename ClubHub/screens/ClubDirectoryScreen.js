import React from 'react';
import {
	Text,
	View,
	Button,
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  mainText: {
    fontSize: 40,
    fontSize: 35,
    color: 'hotpink',
  }
});

export default class ClubDirectoryScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.mainText}>This is the Club Directory Screen!</Text>
        <Text>^^^^^</Text>
      </View>
    );
  }
}