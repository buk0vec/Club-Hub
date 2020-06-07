/*
	Styles.js
	Style sheet to be used for the screens, consolidating styling
*/

import React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
		borderBottomWidth: 1.5,
		backgroundColor: '#f5f5f5'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#8800ff'
	},
	//PersistLoading has different specs?
	PLmainText: {
		fontSize: 50,
		color: 'white'
	},
	nameText: {
		fontSize: 40,
	},
	loginText: {
		fontSize: 30
	},
	errorText: {
		fontSize: 25,
		color: 'red',
		textAlign: 'center',
		flex: 1
	},
	list: {
		//bottom: 65,
	}
});