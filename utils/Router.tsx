import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import AccountScreen from "../screens/AccountScreen";
import AuthScreen from '../screens/auth/AuthScreen';
import FeedScreen from "../screens/FeedScreen";
import PostFormScreen from "../screens/PostFormScreen";
import SearchScreen from "../screens/SearchScreen";
import colors from "../styles/colors";
import HeaderLogo from './components/images/HeaderLogo';

const AppStack = createStackNavigator(
	{
		Feed: FeedScreen,
		Search: SearchScreen,
		Account: AccountScreen,
		PostForm: PostFormScreen,
	},
	{
		initialRouteName: "Feed",
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: colors.dark,
			},
			headerTintColor: "#fff",
			headerTitle: () => <HeaderLogo />,
		}
	}
);

const AuthStack = createStackNavigator(
	{
		Auth: AuthScreen
	},
	{
		initialRouteName: 'Auth',
		defaultNavigationOptions: {
			headerShown: false,
		}
	}
)

export default createAppContainer(
	createSwitchNavigator(
		{
			App: AppStack,
			Auth: AuthStack,
		},
		{
			initialRouteName: "Auth",
		}
	)
);
