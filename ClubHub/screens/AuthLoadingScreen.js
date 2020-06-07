/*
	AuthLoadingScreen.js
	A loading screen that also doubles as a smart component that switches the navigation path
	depending on the auth status
*/

import React from 'react';

import { View, Text, YellowBox } from 'react-native';

import { connect } from 'react-redux'
import { store } from '../redux/store'
import { styles } from './Styles' //Styling for components

class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props);
		YellowBox.ignoreWarnings(['Setting a timer']);
		console.ignoredYellowBox = [
			'Setting a timer'
		];

	}
	//When the component loads, if the user is logged in go straight to the tab view, otherwise go to the sign in format.
	componentDidMount() {

		const { auth } = this.props;
		console.log("Auth loading")
		console.log("Auth state: ", auth)
		//If a uid is loaded, there is a logged in user.
		if (auth.uid && auth.isLoaded) {
			console.log(auth.uid);
			this.props.navigation.navigate('Tab');
		}
		else if (auth.isLoaded) {
			console.log(auth);
			this.props.navigation.navigate('Auth');
		}
		else {
			console.log('At least the check worked')
		}
	}
	//If things change in the component (aka, the auth loads), run the mount script again
	componentDidUpdate() {
		this.componentDidMount();
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.mainText}>ClubHub</Text>
			</View>
		)
	}
}

//Redux connections
function mapStateToProps(state) {
	return {
		auth: state.firebase.auth
	}
}


export default connect(mapStateToProps, null)(AuthLoadingScreen)