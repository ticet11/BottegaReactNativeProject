import React, {useContext} from "react";
import { View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";

import Button from "../utils/components/helpers/Button";
import CurrentUserContext from "../utils/contexts/CurrentUserContext";
import { memeToken } from "../utils/api";

interface IAccountScreenProps{
	navigation: {
		navigate: (arg: string) => void;
	}
}
export default (props:IAccountScreenProps) => {
	const {setCurrentUser} = useContext(CurrentUserContext);

	const handleSignOut = async () => {
		await SecureStore.deleteItemAsync(memeToken);
		setCurrentUser(null);
		props.navigation.navigate("Auth")
	}

	return (
		<View>
			<Text>Account Screen</Text>

			<View style={{marginTop: 20}}>
				<Button onPress={handleSignOut} text="Sign Out"></Button>
			</View>
		</View>
	);
};