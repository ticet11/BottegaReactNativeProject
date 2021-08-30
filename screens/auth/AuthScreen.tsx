import React, { useState, useContext } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import textInputStyles from "../../styles/forms/textInputStyles";
const { textFieldWrapper, textField } = textInputStyles;
import authScreenStyles from "../../styles/stacks/auth/authScreenStyles";
import api, { userToken, secureToken, urlUsers } from "../../utils/api";
import Button from "../../utils/components/helpers/Button";
import { formatErrors } from "../../utils/textFormatters";

import CurrentUserContext from "../../utils/contexts/CurrentUserContext";

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

	const { getUser } = useContext(CurrentUserContext);

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

	const handleLogin = async () => {
		const params = {
			auth: {
				email: email,
				password: password,
			},
		};
		await api.post(userToken, params)
			.then(async (response) => {
				if (response.data.jwt) {
					await SecureStore.setItemAsync(
						secureToken,
						response.data.jwt
					);
					getUser();
					setIsSubmitting(false);
					props.navigation.navigate("Feed");
				} else {
					setIsSubmitting(false);
					alert("Try another e-mail or password?");
				}
			})
			.catch((error) => {
				setIsSubmitting(false);
				alert("Try another e-mail or password?");
			});
	};

	const handleRegistration = () => {
		const params = {
			user: {
				email: email,
				password: password,
			},
		};
		api.post(urlUsers, params)
			.then((response) => {
				console.log("Res for creating users", response.data);
				if (response.data.memipedia_user) {
					handleLogin();
				} else {
					setIsSubmitting(false);
					alert(
						"Error creating user:\n\n" +
						formatErrors(response.data.errors)
					);
				}
			})
			.catch((error) => {
				setIsSubmitting(false);
				alert("Error creating user: " + error);
			});
	};

	const handleSubmit = () => {
		setIsSubmitting(true);
		if (formToShow === "LOGIN") handleLogin();
		else handleRegistration();
	};

	let textObj = {
		bodyText: "",
		buttonText: "",
	};
	screenTypeText();

	return (
		<ScrollView style={authScreenStyles.container}>
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
					onSubmitEditing={handleSubmit}
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
			<TouchableOpacity
				style={{ marginTop: 10, marginBottom: 20 }}
				onPress={handleAuthTypePress}
			>
				<Text style={{ color: "white" }}>{textObj.bodyText}</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};
