/*
  App.js
  ./screens: contains all the screens
  ./redux: contains all the redux stuff
 */

import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  FlatList
} from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { 
  createBottomTabNavigator,
} from 'react-navigation-tabs';
import { 
  createStackNavigator,
} from 'react-navigation-stack';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'

import MyClubsScreen from './screens/MyClubsScreen';
import ClubDirectoryScreen from './screens/ClubDirectoryScreen';
import ClubDescrScreen from './screens/ClubDescrScreen';
import SettingsScreen from './screens/SettingsScreen';
import SignInScreen from './screens/SignInScreen';
import NavigationService from './screens/NavigationService';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import PersistLoadingScreen from './screens/PersistLoadingScreen'
import SignUpScreen from './screens/SignUpScreen'

import { store, persistor } from './redux/store';
import { Provider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';

import {zoomIn} from 'react-navigation-transitions';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Transition} from 'react-native-reanimated'

const styles = StyleSheet.create({
  mainText: {
    fontSize: 40,
    fontSize: 35,
    color: 'hotpink',
  }
});

const DetailsNavigator = createStackNavigator({
	ClubDirectory: {screen: ClubDirectoryScreen, navigationOptions: {header: null}},
    ClubDescrScreen: {screen: ClubDescrScreen},
});

const TabNavigator = createBottomTabNavigator({
  MyClubs: {screen: MyClubsScreen},
  ClubDirectory: DetailsNavigator,
  Settings: {screen: SettingsScreen},
},{
	tabBarOptions:{
    activeTintColor: '#FFFFFF',
		activeBackgroundColor:'#8800FF',
    inactiveTintColor: '#8800FF',
		labelStyle: {
			fontSize: 20,
		}
	}
});

const AuthNavigator = createStackNavigator({
  SignIn: {screen: SignInScreen, navigationOptions: {header: null}},
  SignUp: {screen: SignUpScreen}
}, {
  initialRouteName: 'SignIn'
});

const AuthLoadingNavigator = createStackNavigator({
  AuthLoading: {screen: AuthLoadingScreen, navigationOptions: {header: null}}
})

//The idea with the navigation is to go to the splash screen, 
const RootNavigator = createAnimatedSwitchNavigator({
  AuthLoading: AuthLoadingNavigator,
  Auth: AuthNavigator,
  Tab: TabNavigator
},
{
  initialRouteName: 'AuthLoading',
   transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
}
);

let Navigation = createAppContainer(RootNavigator);

//For react-redux-firebase
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

//For react-redux-firebase
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}


//This in theory shouldn't change, <Provider> allows access to store and <ReactReduxFirebaseProvider> allows fb access, <PersistGate> allows for 
//persistent data.
export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <PersistGate loading={<PersistLoadingScreen />} persistor={persistor} >
				  <Navigation ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
        </PersistGate>
        </ReactReduxFirebaseProvider>
			</Provider>
		)
	}
}
