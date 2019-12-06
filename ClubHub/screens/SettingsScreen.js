import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';


const styles = StyleSheet.create({
  mainText: {
    fontSize: 40,
    fontSize: 35,
    color: 'hotpink',
  }
});

const firebaseConfig = {
  apiKey: "AIzaSyCImYVjbM-_ftS_Cx9agtbhHnEpam0IjrE",
  authDomain: "clubhub2020.firebaseapp.com",
  databaseURL: "https://clubhub2020.firebaseio.com",
  projectId: "clubhub2020",
  storageBucket: "clubhub2020.appspot.com",
  messagingSenderId: "777356333375",
  appId: "1:777356333375:web:90b139608be0db3e94038a",
  measurementId: "G-T0G1E3NW8T"
};

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.mainText}>This is the Settings Screen!</Text>
      </View>
    );
  }
}