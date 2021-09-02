import React, { useState, useEffect } from "react";
import {
	View,
	ActivityIndicator,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import Container from "../utils/components/layouts/Container";
import api, { secureToken, urlPosts } from "../utils/api";
import PostItem from "../utils/components/posts/PostItem";
import baseStyles from "../styles/common/baseStyles";
import PostList from "../utils/components/posts/PostList";

interface IFeedScreenProps {
	navigation: {
		navigate: (screenName: string, data?: any) => void;
	};
}
export default (props: IFeedScreenProps) => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { containerWithBottomNavBar } = baseStyles;

	useEffect(() => {
		const ac = new AbortController();
		getPosts();
		return () => ac.abort();
	}, []);

	const getPosts = async () => {
		const token = await SecureStore.getItemAsync(secureToken);

		api.get(urlPosts, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				console.log("res from posts", response.data);
				setPosts(response.data.memipedia_posts);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error + ": Uh oh post get problems");
				setIsLoading(false);
			});
	};

	return (
		<Container navigate={props.navigation.navigate}>
			<View>
				{isLoading ? (
					<ActivityIndicator />
				) : (
					<PostList
						posts={posts}
						navigate={props.navigation.navigate}
					/>
				)}
			</View>
		</Container>
	);
};
