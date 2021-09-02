import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";

import api, { secureToken, urlQueries } from "../utils/api";
import Container from "../utils/components/layouts/Container";
import PostList from "../utils/components/posts/PostList";

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
				setPosts(res.data.memipedia_posts)
			})
			.catch((error) => {
				console.error("query error: " + error);
			});
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
			<TouchableOpacity onPress={handleSearch} style={{ marginTop: 20 }}>
				<Text style={{ color: "white" }}>Search</Text>
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
