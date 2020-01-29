/*
  SettingsScreen.js
  Provides different settings, such as logout. Also displays your name to show that we can access user data.
*/

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button
} from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { signOut } from '../redux/actions'
import { store } from '../redux/store'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'


const styles = StyleSheet.create({
  mainText: {
    fontSize: 40,
    fontSize: 35,
    color: 'hotpink',
  }
});

class SettingsScreen extends React.Component {
  componentDidMount(){
    console.log("User data:", this.props.user)
  }
  onSignOutPress() {
    this.props.signOut()
    this.props.navigation.navigate("Auth");
  }
  render() {
    return (
      <View>
        <Text style={styles.mainText}>This is the Settings Screen!</Text>
        <Text style={styles.mainText}>{this.props.user.firstName + ' ' + this.props.user.lastName}</Text>
        <Button title="Sign Out!" onPress={() => this.onSignOutPress()} />
      </View>
    );
  }
}


/*
FUN FACT: instead of firestoreConnect()-ing to the user collection and then getting the user doc,
you can access the data of the logged in user by mapping state.firebase.profile. This solves permissions stuff as well,
as there's no way to access someone else's data. 
*/
function mapStateToProps(state, props) {
  return {
    user: state.firebase.profile
  }
}
function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(signOut())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
