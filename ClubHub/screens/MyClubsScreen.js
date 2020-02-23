import React from 'react';
import {
	Text,
	View,
	Button,
<<<<<<< Updated upstream
	StyleSheet,
  YellowBox
=======
  YellowBox,
  FlatList,
  TouchableOpacity
>>>>>>> Stashed changes
} from 'react-native';

import { connect } from 'react-redux'
<<<<<<< Updated upstream

const styles = StyleSheet.create({
  mainText: {
    fontSize: 40,
    fontSize: 35,
    color: '#000000',
  }
});
=======
import { setMCDescrId } from '../redux/actions' //Sets the description ID for ClubDescrScreen
import { styles } from './Styles.js' //Styling for components
>>>>>>> Stashed changes

export default class MyClubsScreen extends React.Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(['Setting a timer']);
    console.ignoredYellowBox = ['Setting a timer'];
  }
  render() {
    return (
      <View>
        <Text style={styles.mainText}>This is the My Clubs Screen!</Text>
        <Button color="#7700ee" title='Add Clubs (goes to Club Directory)'
        onPress={() => this.props.navigation.navigate('ClubDirectory')}/>
      </View>
    );
  }
}