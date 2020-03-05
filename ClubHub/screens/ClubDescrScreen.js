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

import {ActivityIndicator} from 'react-native-paper'
import { ScrollView } from 'react-navigation';

import * as firebase from 'firebase';
import fb from '../redux/fb';
import 'firebase/firestore';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
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
  componentDidMount(){
    //console.log("Club,", this.props.clubQuery[0])
  }
  //Separator component, just for styling
  Separator() {
    return <View style={styles.separator} />;
  }
  
  TogglingButton(){
    var joinClub = fb.functions().httpsCallable('joinClub');
    var leaveClub = fb.functions().httpsCallable('leaveClub');
    let members = this.props.clubQuery[0].members;
    console.log("Members:", members)
    if(members.includes(this.props.auth.uid)){
      return <Button color="#7700ee" title='Leave Club'
        onPress={() => leaveClub({club: this.props.id}).catch((error)=>console.log(error))}/>;
    }else{
      return <Button color="#7700ee" title='Join Club'
        onPress={() => joinClub({club: this.props.id}).catch((error)=>console.log(error))}/>;
    }
  }
  //Render the bitty
  render() {

    //If the club info is loading, display loading text. Else, display data
    if(!isLoaded(this.props.clubQuery)){
      return( 
        <View><ActivityIndicator animating={true} /></View>
      );
    }
    else if (this.props.clubQuery[0].id != this.props.navigation.getParam('id')) {
      return( 
        <View><ActivityIndicator animating={true} /></View>
      );
    }
    else {
      console.log("Descrrednder")
      let club = this.props.clubQuery[0];
      return (
       <ScrollView>
        <Text style={styles.clubText}>{club.clubName}</Text>
        <Text style={styles.clubText}>When: {club.when}</Text>
        <Text style={styles.clubText}>In Room: {club.roomNumber}</Text>
        <Text style={styles.clubText}>On: {club.day}</Text>
        <Text style={styles.clubText}>Description: {club.shortDesc}</Text>
        {this.TogglingButton()}
      </ScrollView>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    clubQuery: state.firestore.ordered.descrClub,
    id: state.clubs.descrId,
    auth: state.firebase.auth
  }
}

export default compose(
  firestoreConnect((props) => [{collection: 'clubs', doc: props.navigation.getParam('id'), storeAs: 'descrClub'}]),
  connect(mapStateToProps)
)(ClubDescrScreen);

