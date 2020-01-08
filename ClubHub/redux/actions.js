/*
	actions.js
	Contains all the redux actions
*/

//Constants for payload types
export const SET_DESCR_ID = 'SET_DESCR_ID';

//setDescrId, takes ID for what club description should be shown, passes it to the reducer
export function setDescrId(id) {
	return {
		type: SET_DESCR_ID,
		id
	};
}