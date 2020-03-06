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
  FlatList,
  YellowBox
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
import MyClubsDescrScreen from './screens/MyClubsDescrScreen'

import { store, persistor } from './redux/store';
import { Provider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';

import {zoomIn} from 'react-navigation-transitions';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Transition} from 'react-native-reanimated'

import { Provider as PaperProvider } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign'



const MyClubsNavigator = createStackNavigator({
  MyClubs: {screen: MyClubsScreen, navigationOptions: {header: null}},
    MyClubsDescr: {screen: MyClubsDescrScreen, navigationOptions: {header: null}},
})


const DetailsNavigator = createStackNavigator({
	ClubDirectory: {screen: ClubDirectoryScreen, navigationOptions: {header: null}},
    ClubDescrScreen: {screen: ClubDescrScreen, navigationOptions: {header: null}},
});

const TabNavigator = createMaterialBottomTabNavigator({
  MyClubs: {screen: MyClubsNavigator, navigationOptions:{
    tabBarIcon: ({focused}) =><Icon name="user" size={20} color={focused ? '#FFF' : '#DACE91'}/>,
  }},
  ClubDirectory: {screen: DetailsNavigator, navigationOptions:{
    tabBarIcon: ({focused}) =><Icon name="find" size={20} color={focused ? '#FFF' : '#DACE91'}/>,
  }},
  Settings: {screen: SettingsScreen, navigationOptions:{
    tabBarIcon: ({focused}) =><Icon name="tool" size={20} color={focused ? '#FFF' : '#DACE91'}/>,
  }},
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
  SignUp: {screen: SignUpScreen, path: 'signup', navigationOptions: {header: null}}
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
export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(['Setting a timer', 'Require cycle']);
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }
	render() {
		return (
			<Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <PersistGate loading={<PersistLoadingScreen />} persistor={persistor} >
            <PaperProvider settings={{
              icon: props => <Icon {...props} />
            }}>
				      <Navigation ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
              />
            </PaperProvider>
        </PersistGate>
        </ReactReduxFirebaseProvider>
			</Provider>
		)
	}
}

