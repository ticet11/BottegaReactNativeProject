import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import axios from "axios";

import textInputStyles from "../../styles/forms/textInputStyles";
const { textField, textFieldWrapper } = textInputStyles;
import authScreenStyles from "../../styles/stacks/auth/authScreenStyles";

const apiEndpoint =
	"https://brikozub.devcamp.space/memipedia/memipedia_user_token";

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

	const handleSubmit = () => {
		const postData = {
			auth: {
				email: email,
				password: password,
			},
		};
		axios
			.post(apiEndpoint, postData)
			.then((response) =>
				console.log("Response from handleSubmit", response.data)
			)
			.catch((error) => console.log("Error retrieving token.", error));
	};

	screenTypeText();

	return (
		<View style={authScreenStyles.container}>
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
					secureTextEntry={true}
				></TextInput>
			</View>

			<TouchableOpacity onPress={handleAuthTypePress}>
				<Text style={{ color: "white" }}>{textObj.bodyText}</Text>
			</TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit}>
				<Text style={{ color: "white" }}>{textObj.headerText}</Text>
			</TouchableOpacity>
		</View>
	);
};
