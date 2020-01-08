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
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { setDescrId } from '../redux/actions'
import store from '../redux/store'

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

class ClubDirectoryScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clubs: [],
      refreshing: false
    };
    YellowBox.ignoreWarnings(['Setting a timer']);
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    this.onClubPress = this.onClubPress.bind(this);
  }
  onClubPress(item){
    console.log("Running setDescrId");
    this.props.setDescrId(item.id);
    console.log("Did it work?");
    this.props.navigation.navigate("ClubDescrScreen");
  }
  Separator() {
    return <View style={styles.separator} />;
  }

  render() {
    let ClubList;
    if(this.state.refreshing){
      ClubList = <Text style={styles.clubText}>Loading...</Text>;
    }
    else {
      ClubList = <FlatList 
          data={this.props.clubs} 
          renderItem={({item}) => (
            <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onClubPress(item)}
            >
              <Text style={styles.clubText}>{item.clubName}</Text>
            </TouchableOpacity>
            {this.Separator()}
            </View>
          )}
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

function mapStateToProps(state){
  return {
    clubs: state.firestore.ordered.clubs,
    descrId: state.descrId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
    setDescrId: id => {
      dispatch(setDescrId(id))
    }
    
  }
}
export default compose(
  firestoreConnect(() => ['clubs']), // or { collection: 'todos' }
  connect(mapStateToProps, mapDispatchToProps))(ClubDirectoryScreen);
