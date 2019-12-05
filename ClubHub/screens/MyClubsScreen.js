import React from 'react';
import {
	Text,
	View,
	Button,
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  mainText: {
    fontSize: 40,
    fontSize: 35,
    color: 'hotpink',
  }
});

export default class MyClubsScreen extends React.Component {
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