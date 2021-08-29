import { StyleSheet } from "react-native";
import { withOrientation } from "react-navigation";
import colors from "../colors";

export default StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: colors.primary,
    },
    containerWithBottomNavBar: {
        marginBottom: 80,
    },
})