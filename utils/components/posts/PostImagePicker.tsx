import * as React from "react";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import colors from "../../../styles/colors";

interface IPostImagePickerProps {
	setPostImage: (arg: any) => void;
}
export default forwardRef((props: IPostImagePickerProps, ref) => {
	const [image, setImage] = useState(null);

	useImperativeHandle(ref, () => ({
		clearImage() {
			setImage(null);
		},
	}));

	useEffect(() => {
		const ac = new AbortController();
		getPermissionAsync();
		return () => ac.abort();
	}, []);

	const getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(
				Permissions.CAMERA_ROLL
			);
			if (status !== "granted") {
				alert(
					"Sorry, we need camera roll permissions to make this work!"
				);
			}
		}
	};

	const pickImage = async () => {
		try {
			let result: any = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});
			if (!result.cancelled) {
				setImage(result.uri);
				props.setPostImage(result.uri);
			}
		} catch (E) {
			console.error(E);
		}
	};

	const size = {
		height: 100,
		width: 100,
	};

	const contentRenderMachine = () => {
		if (image) {
			return <Image source={{ uri: image }} style={size} />;
		} else {
			return <EvilIcons name="camera" color={colors.primary} size={42} />;
		}
	};

	return (
		<TouchableOpacity
			onPress={pickImage}
			style={[
				size,
				{
					justifyContent: "center",
					alignItems: "center",
					borderBottomColor: colors.lightGrey,
					borderBottomWidth: 1,
				},
			]}
		>
			{contentRenderMachine()}
		</TouchableOpacity>
	);
});
