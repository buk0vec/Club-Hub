/*
	actions.js
	Contains all the redux actions
*/

import firebase from 'firebase';
import 'firebase/firestore';
import NavigationService from '../screens/NavigationService'

//Constants for payload types
export const SET_DESCR_ID = 'SET_DESCR_ID';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const CHANGE_SIGNUP_ERROR = 'CHANGE_SIGNUP_ERROR';
export const SET_MC_DESCR_ID = 'SET_MC_DESCR_ID';

//setDescrId, takes ID for what club description should be shown, passes it to the reducer
export function setDescrId(id) {
	return {
		type: SET_DESCR_ID,
		id
	};
}

export function setMCDescrId(id) {
	return {
		type: SET_MC_DESCR_ID,
		id
	};
}
/*
	Deprecated actions!
	Replaced by using RRF's auth
	Note that if needed, firebase normal auth can be found in props.firebase.auth()

//signIn, takes in credentials and signs in with them
export function signIn(credentials) {
	return (dispatch, getState) => {
		firebase.auth().signInWithEmailAndPassword(
			credentials.email,
			credentials.password
		).then(() => {
			NavigationService.navigate('MyClubs'); //Needed to auto navigate to clubs page
			dispatch({type: LOGIN_SUCCESS})
		}).catch((err) => {
			dispatch({type: LOGIN_ERROR, err})
		})
	}
}

//signOut, signs the current user out.
export function signOut() {
	return (dispatch, getState) => {
		firebase.auth().signOut().then(() => {
			dispatch({type: LOGOUT_SUCCESS})
		})
	}
}

//signUp, signs up a user.
export function signUp(newUser) {
	return (dispatch, getState) => {
		firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
		.then((resp) => {
			return firebase.firestore().collection('users').doc(resp.user.uid).set({
				firstName: newUser.firstName,
				lastName: newUser.lastName
			})
		})
		.then(() => {
			NavigationService.navigate('MyClubs');
			dispatch({ type: SIGNUP_SUCCESS})
		}).catch((err) => {
			dispatch( { type: SIGNUP_ERROR, err })
		})
	}
}

//changeSignUpError, changes the signUpError
export function changeSignUpError(err) {
	return {type: CHANGE_SIGNUP_ERROR, err};
}
*/