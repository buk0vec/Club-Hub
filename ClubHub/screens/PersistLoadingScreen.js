/*
	PersistLoadingScreen.js
	A simple loading screen for when PersistGate is loading the persistent data
*/

import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainText: {
    fontSize: 50,
	color: 'white'
  },
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8800ff'
  },
});

export default class PersistLoadingScreen extends React.Component {
	render(){
		console.log("Persist loading")
		return (
			<View style={styles.container}>
				<Text style={styles.mainText}>ClubHub</Text>
			</View>
		)
	}
}