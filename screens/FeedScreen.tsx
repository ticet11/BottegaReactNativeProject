import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";

import Container from "../utils/components/layouts/Container";
import api, { secureToken } from "../utils/api";
import PostFormScreen from "./PostFormScreen";
import PostItem from "../utils/components/posts/PostItem";

interface IFeedScreenProps {
	navigation: {
		navigate: (arg: string) => void;
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

		api.get("memipedia_posts", {
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
			<View style={{ marginTop: 20 }}>
				{isLoading ? (
					<ActivityIndicator />
				) : (
					<ScrollView>
						{posts.map((post) => (
							<PostItem key={post.id} post={post} />
						))}
					</ScrollView>
				)}
			</View>
		</Container>
	);
};
