/*
  ClubDirectoryScreen.js
  The screen that displays the club directory
*/

import React from 'react';
import {
	Text,
	View,
	Button,
  YellowBox,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ScrollView
} from 'react-native';

import { FlatList } from 'react-navigation'; //Allows you to press tab bar to scroll back up

import * as firebase from 'firebase';
import 'firebase/firestore';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { setDescrId } from '../redux/actions' //Sets the description ID for ClubDescrScreen
import { store } from '../redux/store' //Store import for debug
import { styles } from './Styles.js' //Styling for components

class ClubDirectoryScreen extends React.Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(['Setting a timer']);
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    this.onClubPress = this.onClubPress.bind(this);
  }
  //Runs when one of the clubs is pressed, sets descrId in the store to the ID
  //of the pressed club so ClubDescrId can take it in
  onClubPress(item, index){
    console.log("Running setDescrId");
    this.props.setDescrId(item.id);
    console.log('Store ID state!', store.getState().clubs.descrId);
    this.props.navigation.navigate("ClubDescrScreen", {id: item.id}); //Get further!
  }
  //Style class
  Separator() {
    return <View style={styles.separator} />;
  }
  //The render function
  render() {
    let ClubList;
    //If the clubs haven't been grabbed yet, display loading text
    if(!this.props.clubs){
      ClubList = <Text style={styles.clubText}>Loading...</Text>;
    }
    //For each item in this.props.clubs, create a button with the club name. When it's pressed, pass the club into onClubPress()
    else {
      ClubList = <FlatList 
        data={this.props.clubs}
        style={styles.list} 
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onClubPress(item)}
            >
              <Text style={styles.clubText}>{item.clubName}</Text>
            </TouchableOpacity>
            {this.Separator()}
          </View>
        )}
      />;
    }
    return (
      <View>
        <Text style={styles.mainText}>Club Directory</Text>
        {this.Separator()}
        {ClubList}
        {this.Separator()}
      </View>
    );
  }
}

//Makes it so the clubs collection is sent to this.props.clubs
function mapStateToProps(state){
  return {
    clubs1: state.firestore.ordered.clubs,
    firestore: state.firestore,
    clubs2: state.firestore.data['allClubs'],
    clubs: state.firestore.ordered.allClubs
  }
}
//Makes it so you can use setDescrId(id) by calling this.props.setDescrId(id)
function mapDispatchToProps(dispatch) {
  return {
    setDescrId: id => {
      dispatch(setDescrId(id))
    }
  }
}
//Connects the firestore to the clubs collection and registers the two map functions to the store
export default compose(
  firestoreConnect([{collection: 'clubs', storeAs: 'allClubs', orderBy: 'clubName'}]), 
  connect(mapStateToProps, mapDispatchToProps))(ClubDirectoryScreen);
