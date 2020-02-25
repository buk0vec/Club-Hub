/*
  ClubDescrScreen.js
  Displays the details of clubs by pulling them from FireStore
*/
import React from 'react';
import {
	Text,
	View,
	Button,
  FlatList,
  YellowBox,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';

import { ScrollView } from 'react-navigation';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { store } from '../redux/store'
import { styles } from './Styles.js' //Styling for components

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
       <ScrollView>
        <Text style={styles.nameText}>{this.props.club.clubName}</Text>
        <Text style={styles.clubText}>Rm. {this.props.club.roomNumber}</Text>
        <Text style={styles.clubText}>We meet at {this.props.club.when} every {this.props.club.day}</Text>
        <Text style={styles.clubText}>{this.props.club.shortDesc}</Text>
      </ScrollView>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    club: state.firestore.data.clubs[store.getState().clubs.descrId],
  }
}

export default compose(
  firestoreConnect(() => ['clubs']),
  connect(mapStateToProps)
)(ClubDescrScreen);

