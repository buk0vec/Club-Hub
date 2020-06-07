/*
	PersistLoadingScreen.js
	A simple loading screen for when PersistGate is loading the persistent data
*/

import React from 'react';

import { View, Text } from 'react-native';
import { styles } from './Styles.js' //Styling for components

export default class PersistLoadingScreen extends React.Component {
	render() {
		console.log("Persist loading")
		return (
			<View style={styles.container}>
				<Text style={styles.PLmainText}>ClubHub</Text>
			</View>
		)
	}
}