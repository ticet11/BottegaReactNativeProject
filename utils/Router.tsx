import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import AccountScreen from "../screens/AccountScreen";
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import FeedScreen from "../screens/FeedScreen";
import PostDetailScreen from '../screens/PostDetailScreen';
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
		PostDetail: {
			screen: PostDetailScreen,
			navigationOptions: {
				headerLeft: () => null,
			}
		}
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
			AuthLoading: AuthLoadingScreen,
		},
		{
			initialRouteName: "AuthLoading",
		}
	)
);
