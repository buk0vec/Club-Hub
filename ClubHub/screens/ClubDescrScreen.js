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
import fb from '../redux/fb';
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
  TogglingButton(){
    var joinClub = fb.functions().httpsCallable('joinClub');
    var leaveClub = fb.functions().httpsCallable('leaveClub');
    let members = this.props.club.members;
    console.log("Members:", members)
    if(members.includes(this.props.auth.uid)){
      return <Button color="#7700ee" title='Leave Club'
        onPress={() => leaveClub({club:store.getState().clubs.descrId}).catch((error)=>console.log(error))}/>;
    }else{
      return <Button color="#7700ee" title='Join Club'
        onPress={() => joinClub({club:store.getState().clubs.descrId}).catch((error)=>console.log(error))}/>;
    }
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
        <Text style={styles.clubText}>{this.props.club.clubName}</Text>
        <Text style={styles.clubText}>When: {this.props.club.when}</Text>
        <Text style={styles.clubText}>In Room: {this.props.club.roomNumber}</Text>
        <Text style={styles.clubText}>On: {this.props.club.day}</Text>
        <Text style={styles.clubText}>Description: {this.props.club.shortDesc}</Text>
        {this.TogglingButton()}
      </ScrollView>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    club: state.firestore.data.clubs[store.getState().clubs.descrId],
    auth: state.firebase.auth
  }
}

export default compose(
  firestoreConnect(() => ['clubs']),
  connect(mapStateToProps)
)(ClubDescrScreen);

