import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
	container: {
		backgroundColor: "blue",
		paddingTop: 15,
		paddingBottom: 15,
	}
})

interface IBottomTabBarProps {
	navigate: (args: string) => void;
}

export default (props: IBottomTabBarProps) => {
	return (
		<View style={styles.container}>
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
