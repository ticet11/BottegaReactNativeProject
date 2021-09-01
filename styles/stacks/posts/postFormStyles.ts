import { StyleSheet } from "react-native";
import colors from "../../colors";

export default StyleSheet.create({
    container: {
        height: "100%",
    },
    formGrid: {
        flexDirection: "row",
        marginBottom: 20,
    },
    textInputWrapper: {
        width: "100%"
    },
    inputElement: {
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
        borderLeftColor: colors.lightGrey,
        borderLeftWidth: 1,
        padding: 3
    },
    textAreaElement: {
        height: 65
    },
    buttonWrapper: {
        paddingRight: 15,
        paddingLeft: 15,
    },
})