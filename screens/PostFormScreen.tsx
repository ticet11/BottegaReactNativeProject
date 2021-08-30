import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import Button from "../utils/components/helpers/Button";

import PostImagePicker from "../utils/components/posts/PostImagePicker";

export default () => {
	const [name, setName] = useState("");
	const [content, setContent] = useState("");
	const [postImage, setPostImage] = useState(null);

	const buildForm = () => {
		let formData = new FormData();

		formData.append("post[name]", name);
		formData.append("post[content]", content);

		const uriParts = postImage.split(".");
		const fileType = uriParts[uriParts.length - 1];

		formData.append("post[post_image]", {
			uri: postImage,
			name: `photo.${fileType}`,
			type: `image/${fileType}`,
		} as any);
	};

	return (
		<View>
			<TextInput
				placeholder="Name"
				value={name}
				onChangeText={(val) => setName(val)}
			></TextInput>
			<TextInput
				multiline
				placeholder="Description"
				value={content}
				onChangeText={(val) => setContent(val)}
				style={{ borderWidth: 2, borderColor: "black" }}
			></TextInput>
			<View style={{ marginTop: 40, height: 100 }}>
				<PostImagePicker setPostImage={setPostImage}></PostImagePicker>
			</View>
			<Button
				text="Submit"
				onPress={() => console.log("Very good submit. I like it.")}
			></Button>

			<Text>{postImage ? postImage : null}</Text>
		</View>
	);
};
