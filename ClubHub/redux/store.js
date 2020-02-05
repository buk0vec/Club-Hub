/*
	store.js
	Creates the reducers and the redux store
	TODO: Add filter to prevent authError from re-appearing
*/
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import fb from './fb';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore, firestoreReducer } from 'redux-firestore'
import { reactReduxFirebase, getFirebase, firebaseReducer } from 'react-redux-firebase'
import { SET_DESCR_ID, setClubDescr, /*LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, SIGNUP_SUCCESS, SIGNUP_ERROR, , signIn, signOut, signUp,
CHANGE_SIGNUP_ERROR, changeSignUpError */ } from './actions'
import NavigationService from '../screens/NavigationService';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

//Sets the initial state of the store
const initialState = {
	authError: null,
	signUpError: null,
	descrId: ''
}

const middlewares = [
	thunk.withExtraArgument(getFirebase)
]

//Persistence config
const persistConfig = {
 key: 'root',
 storage: AsyncStorage,
 stateReconciler: autoMergeLevel2,
 blacklist: ['auth']
}

//Club reducer, covers setDescrId
function clubReducer(state = initialState, payload) {
	//console.log("Payload type: ", payload.type)
	switch(payload.type){
		case SET_DESCR_ID:
			console.log("ID_SET: ", payload.id);
			return Object.assign({}, state, {descrId: payload.id}) //Changes state.clubs.descrId
	} 
	return state;
}

//Auth reducer, covers signing in and out, and changes authError to the appropriate value depending on login status
function authReducer(state = initialState, payload) {
	switch(payload.type){
		/*
			DEPRECATED
			Replaced by withFirebase auth

		case LOGIN_SUCCESS:
			console.log("Dubs");
			//NavigationService.navigate('MyClubs'); //Needed to auto navigate to clubs page
			return {...state,
				authError: null
			}
		case LOGIN_ERROR:
			console.log(payload.err);
			return {
				...state,
				authError: payload.err.message
			}
		case LOGOUT_SUCCESS:
			console.log("Ur outta here!");
			return {...state,
				authError: null
			}
		case SIGNUP_SUCCESS:
			console.log("Signed Up!");
			//NavigationService.navigate('MyClubs');
			return {
				...state,
				signUpError: null
			}
		case SIGNUP_ERROR:
			console.log("Signup Error");
			console.log(payload.err.message);
			return {
				...state,
				signUpError: payload.err.message
			}
		case CHANGE_SIGNUP_ERROR:
			return {
				...state,
				signUpError: payload.err
			}
		*/
		default:
			return state;

	}
}

//Combines all the reducers
const Reducer = combineReducers({
	auth: authReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	clubs: clubReducer,
}
);

//Create the persist reducer
const pReducer = persistReducer(persistConfig, Reducer)

export const store = createStore(pReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);