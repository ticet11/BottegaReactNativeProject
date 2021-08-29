import React from "react";
import { View, Text, Dimensions } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";

import postItemStyles from "../../../styles/stacks/posts/postItemStyles";
interface IPostItemProps {
	post: {
		id: number;
		name: string;
		post_image_url: string;
	};
}

export default (props: IPostItemProps) => {
	const {itemWrapper, contentWrapper, nameText, imageWrapper} = postItemStyles;
	const { name, post_image_url } = props.post;

	const img = () => {
		return (
			<AutoHeightImage style={imageWrapper}
				width={Dimensions.get("window").width}
				source={{ uri: post_image_url }}
			></AutoHeightImage>
		);
	};

	return (
		<View style={itemWrapper}>
			{img()}
			<View style={contentWrapper}>
				<Text style={nameText}>{name}</Text>
			</View>
		</View>
	);
};
