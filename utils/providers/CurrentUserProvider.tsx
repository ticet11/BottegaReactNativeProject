import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import api, { secureToken, urlLoggedIn } from "../api";
import CurrentUserContext from "../contexts/CurrentUserContext";

interface ICurrentUserProviderProps {
	children: any;
}

export default (props: ICurrentUserProviderProps) => {
	const [currentUser, setCurrentUser] = useState({});

	const getUser = async () => {
		const token = await SecureStore.getItemAsync(secureToken);

		api.get(urlLoggedIn, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				if (response.data.memipedia_user) {
					setCurrentUser(response.data.memipedia_user);
				} else {
					setCurrentUser(null);
				}
			})
			.catch((error) => {
				console.error("Error fetching that user: ", error)
				setCurrentUser(null);
			});
	};

	const stateValues = {
		currentUser,
		setCurrentUser,
		getUser,
	};
	return (
		<CurrentUserContext.Provider value={stateValues}>
			{props.children}
		</CurrentUserContext.Provider>
	);
};
