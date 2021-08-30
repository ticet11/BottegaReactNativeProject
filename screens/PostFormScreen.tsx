import React from "react";
import { Text, View } from "react-native";

import PostImagePicker from "../utils/components/posts/PostImagePicker";

export default () => {
	return (
		<View>
			<Text>Post Form Screen</Text>
			<View style={{ marginTop: 40, height: 100 }}>
				<PostImagePicker></PostImagePicker>
			</View>
		</View>
	);
};
