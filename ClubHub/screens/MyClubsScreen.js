/*
  MyClubsScreen.js
  Defines the My Clubs screen
*/

import React from 'react';
import {
  Text,
  View,
  Button,
  YellowBox,
  FlatList,
  TouchableOpacity
} from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { withFirebase, firestoreConnect, populate, isLoaded, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux'
import { store } from '../redux/store'
import { connect } from 'react-redux'
import { setMCDescrId } from '../redux/actions' //Sets the description ID for ClubDescrScreen
import { styles } from './Styles.js' //Styling for components

//Automatically populates the club ids in the user's bucket with the club's details
const populates = [{ child: 'club', root: 'clubs', keyProp: 'id' }]

export class MyClubsScreen extends React.Component {
  //Normal constructor
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(['Setting a timer']);
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }
  //Debug mounting script
  componentDidMount() {
    console.log("User clubs,", this.props.userClubs)
  }
  //When a club is pressed, store the club id in redux and navigate to MyClubsDescr
  onClubPress(item) {
    console.log("Running setMCDescrId");
    console.log(item)
    this.props.setMCDescrId(item.club.id);
    console.log('Store ID state!', store.getState().clubs.mcDescrId);
    this.props.navigation.navigate("MyClubsDescr"); //Get further!
  }
  //Style class
  Separator() {
    return <View style={styles.separator} />;
  }
  render() {
    let ClubList;
    //If the clubs haven't been grabbed yet, display loading text
    if (!isLoaded(this.props.userClubs)) {
      ClubList = <Text style={styles.clubText}>Loading...</Text>;
    }
    //If there are no user clubs, display so
    else if (isEmpty(this.props.userClubs)) {
      ClubList = <Text style={styles.clubText}> You don't have any clubs yet!</Text>;
    }
    //For each item in this.props.clubs, create a button with the club name. When it's pressed, pass the club into onClubPress()
    else {
      //console.log("Ok, so userclubs is no longer undefined")
      //console.log('type', typeof(this.props.userClubs))
      //console.log("its now", this.props.userClubs)
      console.log("MyClubs is rerendering")
      ClubList = <FlatList
        data={Object.values(this.props.userClubs).filter((obj) => obj)}
        renderItem={({ item, index }) => (
          <View>
            <TouchableOpacity
              onPress={() => this.onClubPress(item)}
              style={styles.button}>
              <Text style={styles.clubText}>{item.club.clubName}</Text>
            </TouchableOpacity>
            {this.Separator()}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />;
    }
    return (
      <View>
        <Text style={styles.mainText}>My Clubs</Text>
        {ClubList}
        <Button color="#7700ee" title='Add More Clubs'
          onPress={() => this.props.navigation.navigate('ClubDirectory')} />
      </View>
    );
  }
}

//Makes it so the clubs collection is sent to this.props.clubs
function mapStateToProps(state) {
  return {
    userClubs: populate(state.firestore, 'userClubs', populates),
  }
}
//Makes it so you can use setDescrId(id) by calling this.props.setDescrId(id)
function mapDispatchToProps(dispatch) {
  return {
    setMCDescrId: id => {
      dispatch(setMCDescrId(id))
    }

  }
}

//Big HOC export, gets the user's clubs and populates the stored ids with club data
export default compose(
  firestoreConnect(() => [{
    collection: 'users',
    doc: store.getState().firebase.auth.uid,
    subcollections: [
      { collection: 'clubs' }
    ],
    storeAs: 'userClubs',
    populates
  }]),
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps))(MyClubsScreen);