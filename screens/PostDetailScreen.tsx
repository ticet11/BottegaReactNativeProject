import React from "react";
import { ScrollView, Text, View } from "react-native";
import postItemStyles from "../styles/stacks/posts/postItemStyles";
import Container from "../utils/components/layouts/Container";
import PostItem from "../utils/components/posts/PostItem";

interface IPostDetailScreenProps {
	navigation: {
		navigate: any;
		state: {
			params: {
				post: {
					id: number;
					name: string;
					content: string;
					post_image_url: string;
				};
			};
		};
	};
}

export default (props: IPostDetailScreenProps) => {
	const { contentWrapper, contentText } = postItemStyles;
	const { post } = props.navigation.state.params;

	return (
		<Container navigate={props.navigation.navigate}>
			<ScrollView>
				<PostItem post={post}></PostItem>
				<View style={contentWrapper}>
					<Text style={contentText}>{post.content}</Text>
				</View>
			</ScrollView>
		</Container>
	);
};
