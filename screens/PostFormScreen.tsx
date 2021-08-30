import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import Button from "../utils/components/helpers/Button";

import PostImagePicker from "../utils/components/posts/PostImagePicker";

export default () => {
	const [name, setName] = useState("");
	const [content, setContent] = useState("");
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
				<PostImagePicker></PostImagePicker>
			</View>
			<Button
				text="Submit"
				onPress={() => console.log("Very good submit. I like it.")}
			></Button>
		</View>
	);
};
