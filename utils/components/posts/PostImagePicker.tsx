import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Image, Platform } from "react-native";
import Button from "../helpers/Button";

interface IPostImagePickerProps {
	setPostImage: (arg: any) => void;
}

export default function ImagePickerExample(props: IPostImagePickerProps) {
	const [image, setImage] = useState(null);

	useEffect(() => {
		(async () => {
			if (Platform.OS !== "web") {
				const { status } =
					await ImagePicker.getCameraRollPermissionsAsync();
				if (status !== "granted") {
					alert(
						"Sorry, we need camera roll permissions to make this work!"
					);
				}
			}
		})();
	}, []);

	const pickImage = async () => {
		let result: any = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Button text="Pick an image from camera roll" onPress={pickImage} />
			{image && (
				<Image
					source={{ uri: image }}
					style={{ width: 200, height: 200 }}
				/>
			)}
		</View>
	);
}
