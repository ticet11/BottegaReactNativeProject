import React from "react";
import { Text, TouchableOpacity } from "react-native";
import colors from "../../../styles/colors";

interface IButtonProps {
	text: string;
	onPress: any;
	disabled?: boolean;
}

export default (props: IButtonProps) => {
	return (
		<TouchableOpacity
			style={{
				backgroundColor: !props.disabled
					? colors.highlight
					: colors.lightGrey,
				height: 40,
				justifyContent: "center",
				alignItems: "center",
				borderRadius: 30,
			}}
			{...props}
		>
			<Text
				style={{
					color: !props.disabled ? "white" : colors.dark,
					fontSize: 20,
					fontWeight: "700",
				}}
			>
				{props.text}
			</Text>
		</TouchableOpacity>
	);
};
