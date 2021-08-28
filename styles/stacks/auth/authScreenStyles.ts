import Contsants from "expo-constants";
import { StyleSheet } from "react-native";
import colors from "../../colors";

export default StyleSheet.create({
    container: {
        backgroundColor: colors.dark,
        padding: 15,
        height: "100%",
        marginTop: Contsants.statusBarHeight,
    }
})