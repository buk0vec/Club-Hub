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

import MyClubsScreen from './screens/MyClubsScreen';
import ClubDirectoryScreen from './screens/ClubDirectoryScreen';
import ClubDescrScreen from './screens/ClubDescrScreen';
import SettingsScreen from './screens/SettingsScreen';


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
});

export default createAppContainer(TabNavigator);