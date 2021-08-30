import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import Button from "../utils/components/helpers/Button";
import * as SecureStore from "expo-secure-store";

import PostImagePicker from "../utils/components/posts/PostImagePicker";
import api, { secureToken, urlPosts } from "../utils/api";

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

		return formData;
	};

	const handleSubmit = async () => {
		const token = await SecureStore.getItemAsync(secureToken);

		api.post(urlPosts, buildForm(), {
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
				"Content-Type": "multipart/form-data",
			},
		})
			.then((response) => {
				console.log("res from new post", response.data);
			})
			.catch((error) => {
				console.log(error + ": Uh oh post post problems");
			});
	};

	return (
		<View>
			<TextInput
				placeholder="Name"
				value={name}
				onChangeText={(val) => setName(val)}
			></TextInput>
			
			<TextInput
				placeholder="Description"
				value={content}
				onChangeText={(val) => setContent(val)}
				style={{ borderWidth: 2, borderColor: "black" }}
				multiline
			></TextInput>
			
			<View style={{ marginTop: 40, height: 100 }}>
				<PostImagePicker setPostImage={setPostImage}></PostImagePicker>
			</View>
			
			<Button
				text="Submit"
				onPress={handleSubmit}
			></Button>

			<Text>{postImage ? postImage : null}</Text>
		</View>
	);
};
