import React from "react";
import { createAppContainer } from "react-navigation";
import { StatusBar } from "react-native";

import CurrentUserProvider from "./utils/providers/CurrentUserProvider";

import Router from "./utils/Router";

const AppContainer = createAppContainer(Router);

export default function App() {
	return (
		<CurrentUserProvider>
			<StatusBar barStyle="light-content"></StatusBar>
			<AppContainer />
		</CurrentUserProvider>
	);
}
