import React, {useContext} from "react";
import { View } from "react-native";
import * as SecureStore from "expo-secure-store";

import Button from "../utils/components/helpers/Button";
import CurrentUserContext from "../utils/contexts/CurrentUserContext";
import { secureToken } from "../utils/api";

interface IAccountScreenProps{
	navigation: {
		navigate: (arg: string) => void;
	}
}
export default (props:IAccountScreenProps) => {
	const {setCurrentUser} = useContext(CurrentUserContext);

	const handleSignOut = async () => {
		await SecureStore.deleteItemAsync(secureToken);
		setCurrentUser(null);
		props.navigation.navigate("Auth")
	}

	return (
		<View style={{padding: 15}}>
				<Button onPress={handleSignOut} text="Sign Out"></Button>
			
		</View>
	);
};