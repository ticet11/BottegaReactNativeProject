import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Container from "../utils/components/layouts/Container";
import CurrentUserContext from '../utils/contexts/CurrentUserContext';

interface IFeedScreenProps {
	navigation: {
		navigate: (arg: string) => void;
	};
}
export default (props: IFeedScreenProps) => {
	const {currentUser} = useContext(CurrentUserContext);
	return (
		<Container navigate={props.navigation.navigate}>
			<Text>Feed screen</Text>
			<View style={{marginTop: 20}}><Text>{JSON.stringify(currentUser)}</Text></View>
		</Container>
	);
};
