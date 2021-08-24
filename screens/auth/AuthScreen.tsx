import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default () => {
	const [formToShow, setFormToShow] = useState("LOGIN");
    let textObj = {
        bodyText: "",
        headerText: "",
    };

    const screenTypeText = () => {
        if (formToShow === "LOGIN") {
            textObj = {
                bodyText: "Need an account? Register.",
                headerText: "Login",
            }
            return textObj;
        } else if (formToShow === "REGISTER") {
            textObj = {
                bodyText: "Already have an account? Login.",
                headerText: "Register",
            }
            return textObj;
        }
    }

    const handleAuthTypePress = () => {
        if (formToShow === 'LOGIN') {
            setFormToShow("REGISTER");
        } else if (formToShow === 'REGISTER') {
            setFormToShow('LOGIN')
        }
    }

    screenTypeText();

	return (
		<View>
			<Text style={{ marginTop: 50 }}>{textObj.headerText}</Text>

			<TouchableOpacity onPress={handleAuthTypePress}>
				<Text>{textObj.bodyText}</Text>
			</TouchableOpacity>
		</View>
	);
};
