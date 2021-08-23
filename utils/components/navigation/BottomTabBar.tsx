import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import bottomTabStyles from "../../../styles/navigation/bottomTabStyles";

interface IBottomTabBarProps {
	navigate: (args: string) => void;
}

export default (props: IBottomTabBarProps) => {
	return (
		<View style={bottomTabStyles.container}>
			<TouchableOpacity onPress={() => props.navigate("Feed")}>
				<MaterialCommunityIcons
					name="newspaper"
					color="white"
					size={30}
				/>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => props.navigate("Search")}>
				<Ionicons name="md-search" color="white" size={30} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => props.navigate("PostForm")}>
			<MaterialCommunityIcons
					name="plus-circle"
					color="white"
					size={30}
				/>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => props.navigate("Account")}>
			<Ionicons
					name="settings-sharp"
					color="white"
					size={30}
				/>
			</TouchableOpacity>
		</View>
	);
};
