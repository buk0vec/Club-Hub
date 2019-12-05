/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  FlatList
} from 'react-native';
import {
  createAppContainer
} from 'react-navigation';
import { 
  createBottomTabNavigator 
} from 'react-navigation-tabs';

import * as firebase from 'firebase';
import 'firebase/firestore';

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

let app = firebase.initializeApp(firebaseConfig);
let db = app.firestore();

class MyClubsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.mainText}>This is the My Clubs Screen!</Text>
        <Button title='Add Clubs (goes to Club Directory)'
        onPress={() => this.props.navigation.navigate('ClubDirectory')}/>
      </View>
    );
  }
}

class ClubDirectoryScreen extends React.Component {
  
  render() {
    return (
      <View>
        <Text style={styles.mainText}>This is the Club Directory Screen!</Text>
        <Text>^^^^^</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log("Pulling...");
    
    let cityRef = db.collection('clubs').doc('6cnht66zmzVnAZqK6NYj');
    let getDoc = cityRef.get()
      .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });

  }
  render() {
    return (
      <View>
        <Text style={styles.mainText}>This is the Settings Screen!</Text>
        
      </View>
    );
  }
}
const TabNavigator = createBottomTabNavigator({
  MyClubs: MyClubsScreen,
  ClubDirectory: ClubDirectoryScreen,
  Settings: SettingsScreen,
});

export default createAppContainer(TabNavigator);