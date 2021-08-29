import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import api, { secureToken } from "../api";
import CurrentUserContext from "../contexts/CurrentUserContext";

interface ICurrentUserProviderProps {
	children: any;
}

export default (props: ICurrentUserProviderProps) => {
	const [currentUser, setCurrentUser] = useState({
		id: 123,
		email: "bradley@test.com",
	});

	const getUser = async () => {
		const token = await SecureStore.getItemAsync(secureToken);

		api.get("logged_in", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				console.log("response from getUser", response.data);
				if (response.data.memipedia_user) {
					setCurrentUser(response.data.memipedia_user);
				} else {
					setCurrentUser(null);
				}
			})
			.catch((error) => {
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
