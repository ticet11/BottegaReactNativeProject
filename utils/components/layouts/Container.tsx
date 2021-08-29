import React from "react";
import { View } from "react-native";

import baseStyles from "../../../styles/common/baseStyles";
import BottomTabBar from "../navigation/BottomTabBar";

interface IContainerProps {
	children: any;
	navigate: (args: string) => void;
}

export default (props: IContainerProps) => {
	return (
		<View style={baseStyles.container}>
			{props.children}
			<BottomTabBar navigate={props.navigate} />
		</View>
	);
};
