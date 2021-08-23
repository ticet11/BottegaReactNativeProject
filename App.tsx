import React from "react";
import { createAppContainer } from "react-navigation";

import Router from "./utils/Router";

const AppContainer = createAppContainer(Router);

export default function App() {
	return <AppContainer />;
}
