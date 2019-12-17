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
      refreshing: true
    };
    YellowBox.ignoreWarnings(['Setting a timer']);
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    this.onClubPress = this.onClubPress.bind(this);
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
      data,
      refreshing: true
    });
    if (!firebase.apps.length) {
      let app = firebase.initializeApp(firebaseConfig); //connecting firebase to app
    }
    let app = firebase.app();
    let db = app.firestore();
    console.log("Pulling...");
    
    let club = db.doc('6cnht66zmzVnAZqK6NYj');

    // let getName = club.get('clubName')
    // let getDay = club.get('day')
    // let getRoomNumber = club.get('roomNumber')
    // let getDescr = club.get('shortDesc')
    // let getWhen = club.get('when')
    let getData = club.get()
      .then(function(snapshot)
        this.setState({
          data = snapshot.val();
          //data.clubName = clubName(firebase)
          //data.day = day(firebas)...
          refreshing: false
        });
        //could put test case in console.log here
      })
      .catch(err => {
        console.log('Error getting document', err);
      }
  }

//still need work on this
  render() {
    let descr;
    if(this.state.refreshing){
      descr = <Text style={styles.clubText}>Loading...</Text>;
    }
    else {
      ClubList = <FlatList 
          data={this.state.clubs} 
          renderItem={({item}) => (
            <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onClubPress(item)}
            >
              <Text style={styles.clubText}>{item.name}</Text>
            </TouchableOpacity>
            {this.Separator()}
            </View>
          )}
          refreshControl={
            <RefreshControl 
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
              />
          } 
        />;
    }
    return (
      <View>
        <Text style={styles.mainText}>Club Directory</Text>
        {this.Separator()}
        {ClubList}
      </View>
    );
  }
}