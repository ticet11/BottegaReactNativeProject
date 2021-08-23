import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import bottomTabStyles from "../../../styles/navigation/bottomTabStyles";

interface IBottomTabBarProps {
	navigate: (args: string) => void;
}

export default (props: IBottomTabBarProps) => {
	return (
		<View style={bottomTabStyles.container}>
			<TouchableOpacity onPress={() => props.navigate("Feed")}>
				<Text>Feed</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => props.navigate("Search")}>
				<Text>Search</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => props.navigate("PostForm")}>
				<Text>Form</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => props.navigate("Account")}>
				<Text>Account</Text>
			</TouchableOpacity>
		</View>
	);
};
