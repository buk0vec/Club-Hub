/*
  SettingsScreen.js
  Provides different settings, such as logout. Also displays your name to show that we can access user data.
*/

import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { signOut } from '../redux/actions'
import { store } from '../redux/store'
import { withFirebase } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
<<<<<<< Updated upstream


const styles = StyleSheet.create({
  mainText: {
    fontSize: 50,
    backgroundColor: '#8800ff',
    color: "#f5f5f5"
  },
  nameText: {
  	fontSize: 40
  }
});
=======
import { styles } from './Styles.js' //Styling for components
>>>>>>> Stashed changes

class SettingsScreen extends React.Component {
  componentDidMount(){
    console.log("User data:", this.props.user)
  }
  onSignOutPress() {
  	//Use RRF's signout
    this.props.firebase.logout();
    this.props.navigation.navigate("Auth");
  }
  render() {
    return (
      <View>
        <Text style={styles.mainText}>This is the Settings Screen!</Text>
        <Text style={styles.nameText}>{this.props.user.firstName + ' ' + this.props.user.lastName}</Text>
        <Button color="#6600bb" title="Sign Out!" onPress={() => this.onSignOutPress()} />
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

export default compose(withFirebase, connect(mapStateToProps))(SettingsScreen)
