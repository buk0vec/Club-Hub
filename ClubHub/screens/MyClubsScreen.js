import React from 'react';
import {
	Text,
	View,
	Button,
	StyleSheet,
  YellowBox,
  FlatList,
  TouchableOpacity
} from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { withFirebase, firestoreConnect, populate } from 'react-redux-firebase'
import { compose } from 'redux'
import { store } from '../redux/store'
import { connect } from 'react-redux'
import { setMCDescrId } from '../redux/actions' //Sets the description ID for ClubDescrScreen

const styles = StyleSheet.create({
  mainText: {
    fontSize: 50,
    backgroundColor: '#8800ff',
    color: "#f5f5f5"
  },
  clubText: {
    fontSize: 30,
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

const populates = [{child: 'club', root: 'clubs', keyProp: 'id'}]

export class MyClubsScreen extends React.Component {
	constructor(props) {
    	super(props);
    	YellowBox.ignoreWarnings(['Setting a timer']);
    	console.ignoredYellowBox = [
    	  'Setting a timer'
    	];

  	}
  	componentDidMount(){
  		console.log("User clubs,", this.props.userClubs)
  	}
	onClubPress(item){
    	console.log("Running setMCDescrId");
    	console.log(item)
    	this.props.setMCDescrId(item.club.id);
    	console.log('Store ID state!', store.getState().clubs.mcDescrId);
    	this.props.navigation.navigate("MyClubsDescr"); //Get further!
  	}
  //Style class
  Separator() {
    return <View style={styles.separator} />;
  }
  render() {
    let ClubList;
    //If the clubs haven't been grabbed yet, display loading text
    if(this.props.userClubs == null){
      ClubList = <Text style={styles.clubText}>Loading...</Text>;
    }
    //For each item in this.props.clubs, create a button with the club name. When it's pressed, pass the club into onClubPress()
    else {
    	//console.log("Ok, so userclubs is no longer undefined")
    	//console.log('type', typeof(this.props.userClubs))
    	//console.log("its now", this.props.userClubs)
        ClubList = <FlatList 
          data={Object.values(this.props.userClubs)} 
          renderItem={({item, index}) => (
            <View>
            <TouchableOpacity
            onPress={() => this.onClubPress(item)}
              style={styles.button}>
              <Text style={styles.clubText}>{item.club.clubName}</Text>
            </TouchableOpacity>
            {this.Separator()}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          />;
    }
    console.log("Rerender")
    return (
      <View>
        <Text style={styles.mainText}>My Clubs</Text>
        {ClubList}
        <Button color="#7700ee" title='Add More Clubs'
        onPress={() => this.props.navigation.navigate('ClubDirectory')}/>
      </View>
    );
  }
}

//Makes it so the clubs collection is sent to this.props.clubs
function mapStateToProps(state){
  return {
    userClubs: populate(state.firestore, 'userClubs', populates),
  }
}
//Makes it so you can use setDescrId(id) by calling this.props.setDescrId(id)
function mapDispatchToProps(dispatch) {
  return {
    setMCDescrId: id => {
      dispatch(setMCDescrId(id))
    }
    
  }
}

export default compose(
  firestoreConnect(() => [{
  	collection: 'users',
  	doc: store.getState().firebase.auth.uid,
  	subcollections: [
		{collection: 'clubs'}
  	],
  	storeAs: 'userClubs',
  	populates
  }]),
  withFirebase, 
  connect(mapStateToProps, mapDispatchToProps))(MyClubsScreen);