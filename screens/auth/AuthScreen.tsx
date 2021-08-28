import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

import api from "../../utils/api";

import textInputStyles from "../../styles/forms/textInputStyles";
const { textField, textFieldWrapper } = textInputStyles;
import authScreenStyles from "../../styles/stacks/auth/authScreenStyles";
import Button from "../../utils/components/helpers/Button";

interface IAuthScreenProps {
	navigation: {
		navigate: (arg: string) => void;
	};
}

export default (props: IAuthScreenProps) => {
	const [formToShow, setFormToShow] = useState("LOGIN");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	let textObj = {
		bodyText: "",
		buttonText: "",
	};

	const screenTypeText = () => {
		if (formToShow === "LOGIN") {
			textObj = {
				bodyText: "Need an account? Register.",
				buttonText: "Login",
			};
			return textObj;
		} else if (formToShow === "REGISTER") {
			textObj = {
				bodyText: "Already have an account? Login.",
				buttonText: "Register",
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

	const handleLogin = () => {
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
				setIsSubmitting(false);
			})
			.catch((error) => {
				alert("Try another e-mail or password?");
				setIsSubmitting(false);
			});
	}

	const handleRegistration = () => {
		const params = {
			user: {
				email: email,
				password: password,
			},
		};
		api.post("memipedia_users", params)
			.then((response) => {
				console.log("Res for creating users", response.data);
				if (response.data.memipedia_user) {
					props.navigation.navigate("Feed");
				} else {
					alert("Error creating user");
				}
				setIsSubmitting(false);
			})
			.catch((error) => {
				setIsSubmitting(false);
				alert("Error creating user: " + error);
			});
	}

	const handleSubmit = () => {
		setIsSubmitting(true);
		if (formToShow === "LOGIN")
			handleLogin();
		else
			handleRegistration();
	};

	screenTypeText();

	return (
		<View style={authScreenStyles.container}>

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

			{isSubmitting ? (
				<Button
					text={"Submitting..."}
					onPress={handleSubmit}
					disabled={true}
				/>
			) : (
				<Button text={textObj.buttonText} onPress={handleSubmit} />
			)}
			<TouchableOpacity style={{marginTop: 10, marginBottom: 20,}} onPress={handleAuthTypePress}>
				<Text style={{ color: "white" }}>{textObj.bodyText}</Text>
			</TouchableOpacity>
		</View>
	);
};
