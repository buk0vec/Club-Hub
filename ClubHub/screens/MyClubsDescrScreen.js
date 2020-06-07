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
} from 'react-native';

import {
  Appbar
} from 'react-native-paper'
import { ScrollView } from 'react-navigation';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { store } from '../redux/store'
import fb from '../redux/fb'

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

class MyClubsDescrScreen extends React.Component {
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
  TogglingButton() {
    //var joinClub = fb.functions().httpsCallable('joinClub');
    var leaveClub = fb.functions().httpsCallable('leaveClub');
    let members = this.props.club.members;
    console.log("Members:", members)
    return <Button color="#7700ee" title='Leave Club'
      onPress={() => leaveClub({ club: this.props.id }).then(() => this.props.navigation.navigate("MyClubs")).catch((error) => console.log(error))} />;
  }
  changeClubStatus() {
    var leaveClub = fb.functions().httpsCallable('leaveClub');
    let members = this.props.club.members;
    console.log("Members:", members)
    leaveClub({ club: this.props.id }).catch((error) => console.log(error));
    this.props.navigation.navigate("MyClubs");
  }
  //Rende
  //Render the bitty
  render() {
    //If the club info is loading, display loading text. Else, display data
    if (!this.props.club) {
      return (
        <View><Text style={styles.clubText}>Loading...</Text></View>
      );
    }
    else {
      let club = this.props.club
      return (
        <ScrollView>
          <Appbar.Header>
            <Appbar.Action icon="left" onPress={() => this.props.navigation.navigate("MyClubs")} />
            <Appbar.Content
              title={
                (club.clubName.length > 20)
                  ? club.abbrevName
                  : club.clubName}
            />
            <Appbar.Action icon={"minus"} onPress={() => this.changeClubStatus()} />
          </Appbar.Header>
          <Text style={styles.clubText}>{this.props.club.clubName}</Text>
          <Text style={styles.clubText}>When: {this.props.club.when}</Text>
          <Text style={styles.clubText}>In Room: {this.props.club.roomNumber}</Text>
          <Text style={styles.clubText}>On: {this.props.club.day}</Text>
          <Text style={styles.clubText}>Description: {this.props.club.shortDesc}</Text>
        </ScrollView>
      )
    }
  }
}

//Redux connections to firestore values and the clubs bucket
function mapStateToProps(state) {
  return {
    club: state.firestore.data.clubs[state.clubs.mcDescrId],
    id: state.clubs.mcDescrId,
    auth: state.firebase.auth
  }
}

export default compose(
  firestoreConnect(() => ['clubs']),
  connect(mapStateToProps)
)(MyClubsDescrScreen);

