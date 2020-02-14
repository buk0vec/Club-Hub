/*
	SignUpScreen.js
	Contains sign up stuff
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
	Keyboard,
	ScrollView
} from 'react-native';

import { signUp, changeSignUpError } from '../redux/actions'
import { compose } from 'redux';
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import { store } from '../redux/store'
import NavigationService from './NavigationService'
const styles = StyleSheet.create({
  mainText: {
    fontSize: 50,
    backgroundColor: '#8800ff',
    color: '#eeeeee'
  },
  loginText: {
    fontSize: 30
  },
  errorText: {
	fontSize: 25,
	color: 'red',
	textAlign: 'center'
  },
  button: {
    padding: 10,
    backgroundColor: '#f5f5f5'
  },
  separator: {
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    backgroundColor: '#f5f5f5'
  },  
});

class SignUpScreen extends React.Component {
	//Sets default state, and if there was a username and password in the signin form beforehand it carries it over to the signup form
	constructor(props){
		super(props);
		const inputEmail = this.props.navigation.getParam('inputEmail', '');
		const inputPassword = this.props.navigation.getParam('inputPassword', '')
		this.state = {
			email: inputEmail,
			password: inputPassword,
			firstName: '',
			lastName: '',
			grade: '',
			signUpError: null,
			buttonDisable: false
		}
		YellowBox.ignoreWarnings(['Setting a timer']);
		console.ignoredYellowBox = ['Setting a timer'];

	}
	//State updaters
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
	onFirstNameChange(newFirst){
		this.setState(prevState => ({
			...prevState,
			firstName: newFirst
		}));
	}
	onLastNameChange(newLast){
		this.setState(prevState => ({
			...prevState,
			lastName: newLast
		}));
	}
	//Checks to see if name has been entered, then signs them up if it all works out
	onLoginPress(){
		Keyboard.dismiss();
		if(this.state.firstName == '' || this.state.lastName == '') {
			this.setState(prevState => ({
				...prevState,
				signUpError: "You must input your name!"
			}))
			return;
		}
		this.setState(prevState => ({
			...prevState,
			buttonDisable: true
		}))
		//Use RRF's firebase instance to create a user
		this.props.firebase.createUser(
			{email: this.state.email, password: this.state.password},
			{firstName: this.state.firstName, lastName: this.state.lastName}
		).then(() => {
			//Success, navigate and remove error state
			console.log("Signed up!")
			this.setState(prevState => ({
				...prevState,
				signUpError: null
			}))
			this.waitUntilNavigate()
		}).catch((err) => {
			//Something went wrong, set error
			console.log("Sign up failed:", err.message)
			this.setState(prevState => ({
				...prevState,
				signUpError: err.message,
				buttonDisable: false
			}))
		})
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
			<ScrollView>
				<Text style={styles.mainText}>Sign Up!</Text>
				<Text style={styles.loginText}>First Name</Text>
				<TextInput placeholder='ex. Joe' textContentType='givenName' autoFocus={false} 
					onChangeText={text => this.onFirstNameChange(text)}/>
					<Text style={styles.loginText}>Last Name</Text>
				<TextInput placeholder='ex. Schmoe' textContentType='familyName' autoFocus={false} 
					onChangeText={text => this.onLastNameChange(text)}/>
				<Text style={styles.loginText}>Email</Text>
				<TextInput placeholder='ex. devon@sux.com' value={this.state.email} textContentType='emailAddress' autoFocus={false} 
					onChangeText={text => this.onEmailChange(text)}/>
				<Text style={styles.loginText}>Password</Text>
				<TextInput placeholder='Password...' textContentType='password' value={this.state.password} secureTextEntry={true} autoFocus={false} 
					onChangeText={text => this.onPasswordChange(text)}/>
				<Button color = "#6600bb"title='Sign up!' onPress={() => this.onLoginPress()} disabled={this.state.buttonDisable}/>
				{this.state.signUpError ? <Text style={styles.errorText}>{this.state.signUpError}</Text> : null}
			</ScrollView>
		)
	}
}

export default compose(withFirebase)(SignUpScreen)