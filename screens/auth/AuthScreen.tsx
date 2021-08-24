import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default () => {
	return (
		<View>
			<Text style={{marginTop: 50}}>Login</Text>

			<TouchableOpacity>
				<Text>Already have an account? Register.</Text>
			</TouchableOpacity>
		</View>
	);
};
