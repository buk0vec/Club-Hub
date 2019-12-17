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
  componentDidMount() {
    this.onRefresh();
  }
  Separator() {
    return <View style={styles.separator} />;
  }
  onRefresh() {
    this.setState({
      data: [],
      refreshing: true
    });
    if (!firebase.apps.length) {
      let app = firebase.initializeApp(firebaseConfig); //connecting firebase to app
    }
    let app = firebase.app();
    let db = app.firestore();
    console.log("Pulling...");
    
    let club = db.collection('clubs').doc(this.state.clubId);
    let getData = club.get()
      .then(snapshot => {
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