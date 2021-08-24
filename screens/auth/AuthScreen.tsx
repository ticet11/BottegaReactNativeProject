import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

import api from "../../utils/api";

import textInputStyles from "../../styles/forms/textInputStyles";
const { textField, textFieldWrapper } = textInputStyles;
import authScreenStyles from "../../styles/stacks/auth/authScreenStyles";

interface IAuthScreenProps {
	navigation: {
		navigate: (arg: string) => void;
	};
}

export default (props: IAuthScreenProps) => {
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
		api.post("memipedia_user_token", postData)
			.then((response) => {
				console.log("Response from handleSubmit", response.data);
				if (response.data.jwt) {
					props.navigation.navigate("Feed");
				} else {
					alert("Try another e-mail or password?");
				}
			})
			.catch((error) => alert("Try another e-mail or password?"));
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
