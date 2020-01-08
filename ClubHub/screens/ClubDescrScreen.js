/*
  ClubDescrScreen.js
  Displays the details of clubs by pulling them from FireStore
*/
import React from 'react';
import {
	Text,
	View,
	Button,
	StyleSheet,
  FlatList,
  YellowBox,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ScrollView
} from 'react-native';


import * as firebase from 'firebase';
import 'firebase/firestore';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import store from '../redux/store'

//StyleSheet for components
const styles = StyleSheet.create({
  mainText: {
    fontSize: 50,
    backgroundColor: '#78acff'
  },
  clubText: {
    fontSize: 30
  },
  button: {
    padding: 10,
    backgroundColor: '#f5f5f5'
  },
  separator: {
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    backgroundColor: '#f5f5f5'
  },  
});

//Config for accessing Firebase
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

class ClubDescrScreen extends React.Component {
  constructor(props) {
    super(props);
    //Set default state and props, take clubId from the navigation properties
    //const {navigation} = this.props;
    this.state = {
      data: [],
      refreshing: false,
    };
    console.log(this.state.clubId);
    YellowBox.ignoreWarnings(['Setting a timer']);
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }
  //After init, pull the data
  componentDidMount() {
    //this.onRefresh();
  }
  //Separator component, just for styling
  Separator() {
    return <View style={styles.separator} />;
  }
  render() {
    let descr;
    //If refreshing, display loading text. Else, display data
    if(this.state.refreshing){
      return( 
        <View><Text style={styles.clubText}>Loading...</Text></View>
      );
    }
    else {
      return (
      <View>
        <Text style={styles.clubText}>{this.props.club.clubName}</Text>
        <Text style={styles.clubText}>When: {this.props.club.when}</Text>
        <Text style={styles.clubText}>In Room {this.props.club.roomNumber}</Text>
        <Text style={styles.clubText}>On {this.props.club.day}</Text>
        <Text style={styles.clubText}>{this.props.club.shortDesc}</Text>
      </View>
      )
    }
  }
}

export default compose(
 firestoreConnect((props) => [
   { collection: 'clubs'} // or `todos/${props.todoId}`
 ]),
 connect(({ firestore: { data } }, props) => ({
   club: data.clubs && data.clubs[store.getState().clubs.descrId],
 }))
)(ClubDescrScreen)