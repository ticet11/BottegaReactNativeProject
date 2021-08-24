import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

import textInputStyles from "../../styles/forms/textInputStyles";
const {textField, textFieldWrapper} = textInputStyles;
import authScreenStyles from "../../styles/stacks/auth/authScreenStyles";

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
			style={authScreenStyles.container}
		>
			<Text style={{ color: "white" }}>{textObj.headerText}</Text>

			<View style={textFieldWrapper}>
				<TextInput
					style={textField}
					placeholder={"Email"}
					value={email}
					onChangeText={(val) => setEmail(val)}
					autoCapitalize="none"
					spellCheck={false}
				></TextInput>
			</View>
            <View style={textFieldWrapper}>
				<TextInput
					style={textField}
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
