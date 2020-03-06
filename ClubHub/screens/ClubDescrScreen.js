/*
  ClubDescrScreen.js
  Displays the details of clubs by pulling them from FireStore
*/
import React from 'react';
import {
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
import { Appbar, Text } from 'react-native-paper';
import  Icon from 'react-native-vector-icons/AntDesign';

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
    var haveClub = true; //for testing add/plus
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
        let club = this.props.clubQuery[0];
      		return (
      			<View>
   					<Appbar.Header>
   						<Appbar.Action icon="left" onPress={() => this.props.navigation.navigate("ClubDirectory")} />
  						<Appbar.Content
  							title= {
  								(club.clubName.length > 20) 
  								? club.abbrevName
  								: club.clubName}
  							//title={this.props.club.clubName}
  						/>
  						<Appbar.Action icon={haveClub ? "minus" : "plus"}/>
   					</Appbar.Header>
        			<Text style={styles.clubText}>Rm. {club.roomNumber}</Text>
        			<Text style={styles.clubText}>We meet at {club.when} every {club.day}</Text>
   					<Text style={styles.clubText}>{club.shortDesc}</Text>
   				</View>
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

