import React, { useState } from "react";
import {
	View,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	Text,
} from "react-native";
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
	const [isLoading, setIsLoading] = useState(false);
	const [emptyQuery, setEmptyQuery] = useState(false);

	const handleSearch = async () => {
		const token = await SecureStore.getItemAsync(secureToken);
		setIsLoading(true);
		setEmptyQuery(false);
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
				if (res.data.memipedia_posts.length === 0) {
					setEmptyQuery(true);
				} else {
					setPosts(res.data.memipedia_posts);
				}
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("query error: " + error);
				setIsLoading(false);
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

	const queryRenderer = () => {
		if (isLoading) {
			return <ActivityIndicator />;
		} else if (emptyQuery) {
			return (
				<View
					style={{
						paddingRight: 15,
						paddingLeft: 15,
						paddingTop: 100,
						alignItems: "center",
					}}
				>
					<Text style={{ color: "white" }}>
						There are no posts matching your query
					</Text>
				</View>
			);
		} else if (posts && posts.length > 0) {
			return (
				<PostList posts={posts} navigate={props.navigation.navigate} />
			);
		} else {
			return null;
		}
	};

	return (
		<Container navigate={props.navigation.navigate}>
			{searchBar}

			{queryRenderer()}
		</Container>
	);
};
