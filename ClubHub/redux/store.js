import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import fb from './fb';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore, firestoreReducer } from 'redux-firestore'
import { reactReduxFirebase, getFirebase, firebaseReducer } from 'react-redux-firebase'
import { SET_DESCR_ID, setClubDescr } from './actions'

const initialState = {

}

function clubReducer(state = initialState, payload) {
	console.log("Payload type: ", payload.type)
	switch(payload.type){
		case 'SET_DESCR_ID':
			console.log("ID_SET: ", payload.id);
			return Object.assign({}, state, {descrId: payload.id})
	}
	
	return state;
}

const Reducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	clubs: clubReducer,
}
);

export default createStore(Reducer);
