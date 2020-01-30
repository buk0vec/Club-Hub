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
import { store } from '../redux/store'

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

class ClubDescrScreen extends React.Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(['Setting a timer']);
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }
  //Separator component, just for styling
  Separator() {
    return <View style={styles.separator} />;
  }
  //Render the bitty
  render() {
    //If the club info is loading, display loading text. Else, display data
    if(!this.props.club){
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
        <Text style={styles.clubText}>On: {this.props.club.day}</Text>
        <Text style={styles.clubText}>Description: {this.props.club.shortDesc}</Text>
      </View>
      )
    }
  }
}

/*

*/
//Shorthand I copied from the tutorial, basically puts the club data into this.props.clubs
export default compose(
 firestoreConnect((props) => [
   { collection: 'clubs'} // or `todos/${props.todoId}`
 ]),
 connect(({ firestore: { data } }, props) => ({
   club: data.clubs[store.getState().clubs.descrId], //store.getState().clubs.descrId gets the descrId from the store
 }))
)(ClubDescrScreen)