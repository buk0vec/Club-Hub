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

import { signIn } from '../redux/actions'
import { connect } from 'react-redux'
const styles = StyleSheet.create({
  mainText: {
    fontSize: 50,
    backgroundColor: '#78acff'
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

class SignInScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: ''
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
		//console.log('Email =', this.state.email);
		//console.log('Password =', this.state.password);
		this.props.signIn(this.state);
		//console.log(this.props.auth);
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
				<Button title='Sign in' onPress={() => this.onLoginPress()}/>
				<Text style={styles.mainText}>Or</Text>
				<Button title='Create a new account' onPress={() => this.props.navigation.navigate("SignUp", {
					inputEmail: this.state.email,
					inputPassword: this.state.password
				})}/>
				{this.props.authError ? <Text style={styles.errorText}>{this.props.authError}</Text> : null}
			</View>
		)
	}
}

//Maps redux stuff
function mapStateToProps(state) {
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth
	}
}

function mapDispatchToProps(dispatch) {
	return {
		signIn: (creds) => dispatch(signIn(creds))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)