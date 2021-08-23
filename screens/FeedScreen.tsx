import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Container from "../utils/components/layouts/Container";

interface IFeedScreenProps {
	navigation: {
		navigate: (arg: string) => void;
	};
}
export default (props: IFeedScreenProps) => {
	return (
		<Container>
			<Text>Feed screen</Text>

			<TouchableOpacity
				onPress={() => props.navigation.navigate("Search")}
			>
				<Text>Search</Text>
			</TouchableOpacity>

      <TouchableOpacity
				onPress={() => props.navigation.navigate("Account")}
			>
				<Text>Account</Text>
			</TouchableOpacity>
		</Container>
	);
};
