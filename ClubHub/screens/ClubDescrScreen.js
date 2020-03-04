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

import { ScrollView } from 'react-navigation';
import { Appbar, Text } from 'react-native-paper';
import  Icon from 'react-native-vector-icons/AntDesign';

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

  		var haveClub = true; //for testing add/plus

    	//If the club info is loading, display loading text. Else, display data
    	if(!this.props.club){
    		return(
        	<View><Text style={styles.clubText}>Loading...</Text></View>
      	);
    	}
    	else {
      		return (
      			<View>
   					<Appbar.Header>
   						<Appbar.Action icon="left" onPress={() => this.props.navigation.navigate("ClubDirectory")} />
  						<Appbar.Content
  							title= {
  								(this.props.club.clubName.length > 20) 
  								? this.props.club.abbrevName
  								: this.props.club.clubName}
  							//title={this.props.club.clubName}
  						/>
  						<Appbar.Action icon={haveClub ? "minus" : "plus"}/>
   					</Appbar.Header>
        			<Text style={styles.clubText}>Rm. {this.props.club.roomNumber}</Text>
        			<Text style={styles.clubText}>We meet at {this.props.club.when} every {this.props.club.day}</Text>
   					<Text style={styles.clubText}>{this.props.club.shortDesc}</Text>
   				</View>
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

