import React from "react";
import { Text } from "react-native";

import Container from "../utils/components/layouts/Container";

interface IPostFormScreenProps {
	navigation: {
		navigate: (arg: string) => void;
	}
}

export default (props: IPostFormScreenProps) => {
	return (
		<Container navigate={props.navigation.navigate}>
			<Text>Post Form Screen</Text>
		</Container>
	);
};