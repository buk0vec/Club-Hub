/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  FlatList
} from 'react-native';
import {
  createAppContainer
} from 'react-navigation';
import { 
  createBottomTabNavigator,
} from 'react-navigation-tabs';
import { 
  createStackNavigator,
} from 'react-navigation-stack';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'

import MyClubsScreen from './screens/MyClubsScreen';
import ClubDirectoryScreen from './screens/ClubDirectoryScreen';
import ClubDescrScreen from './screens/ClubDescrScreen';
import SettingsScreen from './screens/SettingsScreen';

import store from './redux/store';
import { Provider } from 'react-redux'


const styles = StyleSheet.create({
  mainText: {
    fontSize: 40,
    fontSize: 35,
    color: 'hotpink',
  }
});

const DetailsNavigator = createStackNavigator({
	ClubDirectory: {screen: ClubDirectoryScreen, navigationOptions: {header: null}},
    ClubDescrScreen: {screen: ClubDescrScreen},
});

const TabNavigator = createBottomTabNavigator({
  MyClubs: {screen: MyClubsScreen},
  ClubDirectory: DetailsNavigator,
  Settings: {screen: SettingsScreen},
},{
	tabBarOptions:{
    activeTintColor: '#FFFFFF',
		activeBackgroundColor:'#8800FF',
    inactiveTintColor: '#8800FF',
		labelStyle: {
			fontSize: 20,
		}
	}
});

let Navigation = createAppContainer(TabNavigator);

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}


const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
				  <Navigation />
        </ReactReduxFirebaseProvider>
			</Provider>
		)
	}
}