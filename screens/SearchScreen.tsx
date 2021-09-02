import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import Ionicons from "react-native-vector-icons/Ionicons";

import api, { secureToken, urlQueries } from "../utils/api";
import Container from "../utils/components/layouts/Container";
import PostList from "../utils/components/posts/PostList";
import searchStyles from "../styles/stacks/posts/searchStyles";
const { formContainer, searchIcon, searchField } = searchStyles;

interface ISearchScreenProps {
	navigation: {
		navigate: (arg: string) => void;
	};
}
export default (props: ISearchScreenProps) => {
	const [query, setQuery] = useState("");
	const [posts, setPosts] = useState([]);

	const handleSearch = async () => {
		const token = await SecureStore.getItemAsync(secureToken);
		const params = {
			query,
		};
		const headers = {
			Authorization: `Bearer ${token}`,
		};

		api.get(urlQueries, {
			params,
			headers,
		})
			.then((res) => {
				console.log("query response: ", res.data);
				setPosts(res.data.memipedia_posts);
			})
			.catch((error) => {
				console.error("query error: " + error);
			});
	};

	const searchBar = (
		<View style={formContainer}>
			<TextInput
				value={query}
				onChangeText={(val) => setQuery(val)}
				placeholder="Search Query"
				onSubmitEditing={handleSearch}
				style={searchField}
			/>
			<TouchableOpacity onPress={handleSearch} style={searchIcon}>
				<Ionicons name="md-search" color="white" size={30}></Ionicons>
			</TouchableOpacity>
		</View>
	);

	return (
		<Container navigate={props.navigation.navigate}>
			{searchBar}

			<PostList posts={posts} navigate={props.navigation.navigate} />
		</Container>
	);
};
