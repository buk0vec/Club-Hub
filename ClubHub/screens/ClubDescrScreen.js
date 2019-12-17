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
    this.state = {
      // clubName,
      // day,
      // roomNumber,
      // shortDescr,
      // when,
      data: [],
      refreshing: true
    };
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
      // clubName,
      // day,
      // roomNumber,
      // shortDescr,
      // when,
      data: [],
      refreshing: true
    });
    if (!firebase.apps.length) {
      let app = firebase.initializeApp(firebaseConfig); //connecting firebase to app
    }
    let app = firebase.app();
    let db = app.firestore();
    console.log("Pulling...");
    
    let club = db.collection('clubs').doc('6cnht66zmzVnAZqK6NYj');

    // let getName = club.get('clubName')
    //   .then((snapshot) => {
    //     var tempName = snapshot.val();
    //     this.setState({
    //       clubName: tempName,
    //       refreshing: false
    //     });
    //     //could put test case in console.log here
    //   })
    //   .catch(err => {
    //     console.log('Error getting document', err);
    //   })
    // let getDay = club.get('day')
    //       .then((snapshot) => {
    //     var tempDay = snapshot.val();
    //     this.setState({
    //       day: tempDay,
    //       refreshing: false
    //     });
    //     //could put test case in console.log here
    //   })
    //   .catch(err => {
    //     console.log('Error getting document', err);
    //   })
    // let getRoomNumber = club.get('roomNumber')
    //       .then((snapshot) => {
    //     var tempNum = snapshot.val();
    //     this.setState({
    //       roomNumber: tempNum,
    //       refreshing: false
    //     });
    //     //could put test case in console.log here
    //   })
    //   .catch(err => {
    //     console.log('Error getting document', err);
    //   })
    // let getDescr = club.get('shortDesc')
    //       .then((snapshot) => {
    //     var tempDescr = snapshot.val();
    //     this.setState({
    //       shortDescr: tempDescr,
    //       refreshing: false
    //     });
    //     //could put test case in console.log here
    //   })
    //   .catch(err => {
    //     console.log('Error getting document', err);
    //   })
    // let getWhen = club.get('when')
    //       .then((snapshot) => {
    //     var tempWhen = snapshot.val();
    //     this.setState({
    //       when: tempWhen,
    //       refreshing: false
    //     });
    //     //could put test case in console.log here
    //   })
    //   .catch(err => {
    //     console.log('Error getting document', err);
    //   })
    let getData = club.get()
      .then(snapshot => {
        var tempData = snapshot.data();
        this.setState({
          data: tempData,
          //data.clubName = clubName(firebase)
          //data.day = day(firebase)... for roomNumber,shortDesc, and when
          refreshing: false
        });
        console.log(this.state.data);
      })
      .catch(err => {
        console.log('Error getting document', err);
      })
  }

//still need work on this
  render() {
    let descr;
    if(this.state.refreshing){
      return( <View><Text style={styles.clubText}>Loading...</Text></View>);
    }
    else {
      return (
      <View>
      <Text style ={styles.clubText}>{this.state.data.clubName.toString()}</Text>
      <Text style ={styles.clubText}>{this.state.data.when.toString()}</Text>
      <Text style ={styles.clubText}>{this.state.data.roomNumber.toString()}</Text>;
      <Text style ={styles.clubText}>{this.state.data.day.toString()}</Text>;
      <Text style ={styles.clubText}>{this.state.data.shortDesc.toString()}</Text>;
      </View>
      )
    }
  }
}