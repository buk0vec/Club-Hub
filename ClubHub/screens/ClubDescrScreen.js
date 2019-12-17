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
  ScrollView
} from 'react-native';


import * as firebase from 'firebase';
import 'firebase/firestore';

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

//Config for accessing Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCImYVjbM-_ftS_Cx9agtbhHnEpam0IjrE",
  authDomain: "clubhub2020.firebaseapp.com",
  databaseURL: "https://clubhub2020.firebaseio.com",
  projectId: "clubhub2020",
  storageBucket: "clubhub2020.appspot.com",
  messagingSenderId: "777356333375",
  appId: "1:777356333375:web:90b139608be0db3e94038a",
  measurementId: "G-T0G1E3NW8T"
};

export default class ClubDescrScreen extends React.Component {
  constructor(props) {
    super(props);
    //Set default state and props, take clubId from the navigation properties
    const {navigation} = this.props;
    this.state = {
      clubId: navigation.getParam('clubId'),
      data: [],
      refreshing: true
    };
    console.log(this.state.clubId);
    YellowBox.ignoreWarnings(['Setting a timer']);
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    this.onRefresh = this.onRefresh.bind(this);
  }
  //After init, pull the data
  componentDidMount() {
    this.onRefresh();
  }
  //Separator component, just for styling
  Separator() {
    return <View style={styles.separator} />;
  }
  onRefresh() {
    //Set default state and refreshing state
    this.setState({
      data: [],
      refreshing: true
    });
    //If app doesn't already exist, create app
    if (!firebase.apps.length) {
      let app = firebase.initializeApp(firebaseConfig); //connecting firebase to app
    }
    //Connecting to firestore...
    let app = firebase.app();
    let db = app.firestore();
    console.log("Pulling...");
    //Access doc that was passed by Directory
    let club = db.collection('clubs').doc(this.state.clubId);
    let getData = club.get()
      .then(snapshot => {
        //Get data and assign to state
        var tempData = snapshot.data();
        this.setState({
          data: tempData,
          refreshing: false
        });
        console.log(this.state.data);
        console.log(this.state.data.shortDesc);
      })
      .catch(err => {
        console.log('Error getting document', err);
      })
  }

  render() {
    let descr;
    //If refreshing, display loading text. Else, display data
    if(this.state.refreshing){
      return( 
        <View><Text style={styles.clubText}>Loading...</Text></View>
      );
    }
    else {
      return (
      <View>
        <Text style={styles.clubText}>{this.state.data.clubName}</Text>
        <Text style={styles.clubText}>When: {this.state.data.when}</Text>
        <Text style={styles.clubText}>In Room {this.state.data.roomNumber}</Text>
        <Text style={styles.clubText}>On {this.state.data.day}</Text>
        <Text style={styles.clubText}>{this.state.data.shortDesc}</Text>
      </View>
      )
    }
  }
}