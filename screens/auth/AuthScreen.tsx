import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { withOrientation } from "react-navigation";
import colors from "../../styles/colors";

export default () => {
	const [formToShow, setFormToShow] = useState("LOGIN");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	let textObj = {
		bodyText: "",
		headerText: "",
	};

	const screenTypeText = () => {
		if (formToShow === "LOGIN") {
			textObj = {
				bodyText: "Need an account? Register.",
				headerText: "Login",
			};
			return textObj;
		} else if (formToShow === "REGISTER") {
			textObj = {
				bodyText: "Already have an account? Login.",
				headerText: "Register",
			};
			return textObj;
		}
	};

	const handleAuthTypePress = () => {
		if (formToShow === "LOGIN") {
			setFormToShow("REGISTER");
		} else if (formToShow === "REGISTER") {
			setFormToShow("LOGIN");
		}
	};

	screenTypeText();

	return (
		<View
			style={{
				marginTop: 50,
				backgroundColor: colors.dark,
				height: "100%",
			}}
		>
			<Text style={{ color: "white" }}>{textObj.headerText}</Text>

			<View style={{ marginTop: 20, marginBottom: 20 }}>
				<TextInput
					style={{
						backgroundColor: "white",
						borderRadius: 20,
						height: 40,
						paddingLeft: 20,
					}}
					placeholder={"Email"}
					value={email}
					onChangeText={(val) => setEmail(val)}
					autoCapitalize="none"
					spellCheck={false}
				></TextInput>
			</View>
            <View style={{ marginTop: 20, marginBottom: 20 }}>
				<TextInput
					style={{
						backgroundColor: "white",
						borderRadius: 20,
						height: 40,
						paddingLeft: 20,
					}}
					placeholder={"Password"}
					value={password}
					onChangeText={(val) => setPassword(val)}
                    secureTextEntry = {true}
				></TextInput>
			</View>

			<TouchableOpacity onPress={handleAuthTypePress}>
				<Text style={{ color: "white" }}>{textObj.bodyText}</Text>
			</TouchableOpacity>
		</View>
	);
};
