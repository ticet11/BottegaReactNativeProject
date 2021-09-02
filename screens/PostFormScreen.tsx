import React, { useState, useRef } from "react";
import { TextInput, View } from "react-native";
import * as SecureStore from "expo-secure-store";

import PostImagePicker from "../utils/components/posts/PostImagePicker";
import Button from "../utils/components/helpers/Button";
import api, { secureToken, urlPosts } from "../utils/api";
import postFormStyles from "../styles/stacks/posts/postFormStyles";
import { ScrollView } from "react-native-gesture-handler";
const {
	container,
	formGrid,
	textInputWrapper,
	inputElement,
	textAreaElement,
	buttonWrapper,
} = postFormStyles;

interface IPostFormScreenProps {
	navigation: {
		navigate: (screenName: string, data: any) => void;
	};
}
export default (props: IPostFormScreenProps) => {
	const imagePickerRef: any = useRef();
	const [name, setName] = useState("");
	const [content, setContent] = useState("");
	const [postImage, setPostImage] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const setBaseState = () => {
		imagePickerRef.current.clearImage();
		setName("");
		setContent("");
		setPostImage(null);
		setIsSubmitting(false);
	}

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
		setIsSubmitting(true);

		api.post(urlPosts, buildForm(), {
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
				"Content-Type": "multipart/form-data",
			},
		})
			.then((response) => {
				console.log("res from new post", response.data);
				if (response.data.memipedia_post) {
					setBaseState();
					props.navigation.navigate("PostDetail", {
						post: response.data.memipedia_post,
					});
				} else {
					alert("Post Creation Error");
					setIsSubmitting(false);
				}
			})
			.catch((error) => {
				console.log(error + ": Uh oh post post problems");
				setIsSubmitting(false);
			});
	};

	return (
		<ScrollView style={container}>
			<View style={formGrid}>
				<PostImagePicker ref={imagePickerRef} setPostImage={setPostImage}></PostImagePicker>
				<View style={textInputWrapper}>
					<TextInput
						placeholder="Name"
						value={name}
						onChangeText={(val) => setName(val)}
						style={inputElement}
					></TextInput>

					<TextInput
						placeholder="Description"
						value={content}
						onChangeText={(val) => setContent(val)}
						multiline
						style={[inputElement, textAreaElement]}
					></TextInput>
				</View>
			</View>
			<View style={buttonWrapper}>
				{isSubmitting ? (
					<Button text="Submitting..." disabled></Button>
				) : (
					<Button text="Submit" onPress={handleSubmit}></Button>
				)}
			</View>
		</ScrollView>
	);
};
