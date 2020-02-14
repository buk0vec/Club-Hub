/*
	SignInScreen.js
	Contains all the sign in stuff
*/

import React from 'react';

import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Login,
	Button,
	YellowBox,
	Keyboard
} from 'react-native';

import NavigationService from './NavigationService'
import { signIn } from '../redux/actions'
import { store } from '../redux/store'
import { compose } from 'redux'
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase'
const styles = StyleSheet.create({
  mainText: {
    fontSize: 50,
    backgroundColor: '#9900ff',
    color: "#ededed"
  },
  loginText: {
    fontSize: 30
  },
  errorText: {
	fontSize: 25,
	color: 'red',
	textAlign: 'center'
  },
  /*button: {
    padding: 10,
   	color: '#7700ee'
  },*/
  separator: {
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    backgroundColor: '#f5f5f5'
  },  
});

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
			<View>
				<Text style={styles.mainText}>Sign In</Text>
				<Text style={styles.loginText}>Email</Text>
				<TextInput placeholder='ex. devon@sux.com' autoFocus={false} textContentType='emailAddress' onChangeText={text => this.onEmailChange(text)}/>
				<Text style={styles.loginText}>Password</Text>
				<TextInput placeholder='Password...' textContentType='password' secureTextEntry={true} autoFocus={false} 
					onChangeText={text => this.onPasswordChange(text)}/>
				<Button color="#6600bb" title='Sign in' onPress={() => this.onLoginPress()} disabled={this.state.buttonDisable}/>
				<Text style={styles.mainText}>Or</Text>
				<Button color="#6600bb" title='Create a new account' onPress={() => this.props.navigation.navigate("SignUp", {
					inputEmail: this.state.email,
					inputPassword: this.state.password
				})}/>
				{this.state.authError ? <Text style={styles.errorText}>{this.state.authError}</Text> : null}
			</View>
		)
	}
}

export default compose(withFirebase)(SignInScreen)