import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import * as SecureStore from 'expo-secure-store';

import Container from "../utils/components/layouts/Container";
import api, { secureToken } from "../utils/api";

interface IFeedScreenProps {
	navigation: {
		navigate: (arg: string) => void;
	};
}
export default (props: IFeedScreenProps) => {
	const [posts, setPosts] = useState([]);

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
		}).then(response => {
			console.log('res from posts', response.data)
			setPosts(response.data.memipedia_posts);
		}).catch(error => {
			console.log(error + ": Uh oh post get problems")
		});
	};

	return (
		<Container navigate={props.navigation.navigate}>
			<Text>Feed screen</Text>
			<View style={{ marginTop: 20 }}><Text>{JSON.stringify(posts)}</Text></View>
		</Container>
	);
};
