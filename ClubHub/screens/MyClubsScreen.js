import React from 'react';
import {
	Text,
	View,
	Button,
	StyleSheet,
  YellowBox
} from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { withFirebase } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  mainText: {
    fontSize: 40,
    fontSize: 35,
    color: '#000000',
  }
});

export class MyClubsScreen extends React.Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(['Setting a timer']);
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    this.onClubPress = this.onClubPress.bind(this);
  }
  //Runs when one of the clubs is pressed, sets descrId in the store to the ID
  //of the pressed club so ClubDescrId can take it in
  onClubPress(item){
    console.log("Running setDescrId");
    this.props.setDescrId(item.id);
    console.log('Store ID state!', store.getState().userClubs.descrId);
    this.props.navigation.navigate("ClubDescrScreen"); //Get further!
  }
  //Style class
  Separator() {
    return <View style={styles.separator} />;
  }
  render() {
    let ClubList;
    //If the clubs haven't been grabbed yet, display loading text
    if(!this.props.userClubs){
      ClubList = <Text style={styles.clubText}>Loading...</Text>;
    }
    //For each item in this.props.clubs, create a button with the club name. When it's pressed, pass the club into onClubPress()
    else {
      ClubList = <FlatList 
          data={this.props.userClubs} 
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
        <Text style={styles.mainText}>This is the My Clubs Screen!</Text>
        <Button color="#7700ee" title='Add Clubs (goes to Club Directory)'
        onPress={() => this.props.navigation.navigate('ClubDirectory')}/>
        {ClubList}
      </View>
    );
  }
}

//Makes it so the clubs collection is sent to this.props.clubs
function mapStateToProps(state){
  return {
    userClubs: state.firebase.profile.clubs
  }
}
//Makes it so you can use setDescrId(id) by calling this.props.setDescrId(id)
function mapDispatchToProps(dispatch) {
  return {
    setDescrId: id => {
      dispatch(setDescrId(id))
    }
    
  }
}

export default compose(
  withFirebase, 
  connect(mapStateToProps, mapDispatchToProps))(MyClubsScreen);