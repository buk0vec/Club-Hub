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

export default class ClubDirectoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: [],
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
  onClubPress(item){
    this.props.navigation.navigate("ClubDescrScreen", {clubId: item.id});
  }
  Separator() {
    return <View style={styles.separator} />;
  }
  onRefresh() {
    this.setState({
      clubs: [],
      refreshing: true
    });
    if (!firebase.apps.length) {
      let app = firebase.initializeApp(firebaseConfig);
    }
    let tempClubs = [];
    let app = firebase.app();
    let db = app.firestore();
    console.log("Pulling...");
    
    let clubsRef = db.collection('clubs');

    let getNames = clubsRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
            tempClubs.push({id: doc.id, name: doc.data().clubName});
        })
        this.setState({
          clubs: [...tempClubs],
          refreshing: false
        });
        console.log("Clubs set, ", this.state.clubs);
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }
  render() {
    let ClubList;
    if(this.state.refreshing){
      ClubList = <Text style={styles.clubText}>Loading...</Text>;
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