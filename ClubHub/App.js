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
  StyleSheet
} from 'react-native';
import { 
  createAppContainer
} from 'react-navigation';
import { 
  createBottomTabNavigator 
} from 'react-navigation-tabs';

const styles = StyleSheet.create({
  mainText: {
    fontSize: 40,
    fontSize: 35,
    color: 'hotpink',
  }
});

class MyClubsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.mainText}>This is the My Clubs Screen!</Text>
        <Button title='Add Clubs (goes to Club Directory)'
        onPress={() => this.props.navigation.navigate('ClubDirectory')}/>
      </View>
    );
  }
}

class ClubDirectoryScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.mainText}>This is the Club Directory Screen!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.mainText}>This is the Settings Screen!</Text>
      </View>
    );
  }
}
const TabNavigator = createBottomTabNavigator({
  MyClubs: MyClubsScreen,
  ClubDirectory: ClubDirectoryScreen,
  Settings: SettingsScreen,
});

export default createAppContainer(TabNavigator);