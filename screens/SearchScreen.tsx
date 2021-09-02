import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import Container from "../utils/components/layouts/Container";

interface ISearchScreenProps {
	navigation: {
		navigate: (arg: string) => void;
	};
}

export default (props: ISearchScreenProps) => {
	const [query, setQuery] = useState("");

	const handleSearch = () => {
		console.log("searching for " + query);
	};

	const searchBar = (
		<View>
			<TextInput
				value={query}
				onChangeText={(val) => setQuery(val)}
				placeholderTextColor="white"
				placeholder="Search Query"
				onSubmitEditing={handleSearch}
			/>
			<TouchableOpacity onPress={handleSearch} style={{marginTop: 20}}>
				<Text style={{ color: "white" }}>Search</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<Container navigate={props.navigation.navigate}>
			<Text>SearchScreen</Text>
			{searchBar}
		</Container>
	);
};
