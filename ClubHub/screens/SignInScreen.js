/*
	SignInScreen.js
	Contains all the sign in stuff
*/

import React from 'react';

import {
	View,
	YellowBox,
	Keyboard
} from 'react-native';

import NavigationService from './NavigationService'
import { signIn } from '../redux/actions'
import { store } from '../redux/store'
import { compose } from 'redux'
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase'
import { styles } from './Styles.js' //Styling for components
import { Appbar, TextInput, Text, Button } from 'react-native-paper'
import Logo from '../components/Logo';

class SignInScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			authError: null,
			buttonDisable: false
		}
		YellowBox.ignoreWarnings(['Setting a timer']);
		console.ignoredYellowBox = ['Setting a timer'];
	}
	//All these functions are just to update the state when the textinput changes
	onEmailChange(newEmail){
		this.setState(prevState => ({
			...prevState,
			email: newEmail
		}));
	}

	onPasswordChange(newPass){
		this.setState(prevState => ({
			...prevState,
			password: newPass
		}));
	}
	//When login is pressed, dismiss keyboard and log in
	onLoginPress(){
		Keyboard.dismiss();
		this.setState(prevState => ({
			...prevState,
			buttonDisable: true
		}));
		//Using RRF's firebase login
		this.props.firebase.login({
			email: this.state.email,
			password: this.state.password
		}).then(() => {
			//Success, navigate
			console.log("Login Success");
			this.setState(prevState => ({
				...prevState,
				authError: null
			}))
			this.waitUntilNavigate()
		}
		).catch((err) => {
			//Error, display error and don't navigate
			console.log("Login failed:", err.message)
			this.setState(prevState => ({
				...prevState,
				authError: err.message,
				buttonDisable: false
			}))
		});
	}
	waitUntilNavigate() {
		if(typeof store.getState().firebase.auth.uid !== 'undefined') {
			console.log("Navigating...")
			NavigationService.navigate("MyClubs");
		}
		else {
			setTimeout(this.waitUntilNavigate, 250)
		}
	}
	render(){
		return(
			<View style={{flex: 1, justifyContent: 'center'}}>
				<Logo />
				<TextInput mode='outlined' label='Email' placeholder='ex. devon@sux.com' autoFocus={false} textContentType='emailAddress' 
					onChangeText={text => this.onEmailChange(text)}/>
				<TextInput mode='outlined' label='Password' placeholder='Password...' textContentType='password' secureTextEntry={true} autoFocus={false} 
					onChangeText={text => this.onPasswordChange(text)}/>
				<Button color="#6600bb" onPress={() => this.onLoginPress()} disabled={this.state.buttonDisable}>Sign In</Button>
				<Button color="#6600bb" onPress={() => this.props.navigation.navigate("SignUp", {
					inputEmail: this.state.email,
					inputPassword: this.state.password
				})}>Create a New Account</Button>
				<View style={{flex: 1}}></View>
				{this.state.authError ? <Text style={styles.errorText}>{this.state.authError}</Text> : <View style={{flex: 1}}></View>}
			</View>
		)
	}
}

export default compose(withFirebase)(SignInScreen)