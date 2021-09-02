import React, { useState, useEffect } from "react";
import { View } from "react-native";
import * as SecureStore from "expo-secure-store";

import Container from "../utils/components/layouts/Container";
import api, { secureToken, urlPosts } from "../utils/api";
import PostList from "../utils/components/posts/PostList";

interface IFeedScreenProps {
	navigation: {
		navigate: (screenName: string, data?: any) => void;
	};
}
export default (props: IFeedScreenProps) => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const ac = new AbortController();
		getPosts();
		return () => ac.abort();
	}, []);

	const getPosts = async () => {
		const token = await SecureStore.getItemAsync(secureToken);
		setIsLoading(true);
		api.get(urlPosts, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				setPosts(response.data.memipedia_posts);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(error + ": Uh oh post get problems");
				setIsLoading(false);
			});
	};

	return (
		<Container navigate={props.navigation.navigate}>
			<View>
				<PostList
					isLoading={isLoading}
					getPosts={getPosts}
					posts={posts}
					navigate={props.navigation.navigate}
				/>
			</View>
		</Container>
	);
};
