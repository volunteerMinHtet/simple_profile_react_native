import react, { useMemo } from "react";
import { Text, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ScaledSheet } from "react-native-size-matters";

import { useAuth } from "../../providers/AuthProvider";

import { OutlineButton } from "../Buttons";

export const HomeHeaer = () => {
	const theme = useTheme();
	const { isAuth } = useAuth();
	const navigation = useNavigation();

	const themedStyles = useMemo(() => styles(theme), [theme]);

	return (
		!isAuth && (
			<View style={themedStyles.container}>
				<Text style={themedStyles.infoText}>Please login first!</Text>
				<OutlineButton
					title={"Login"}
					bgColor={theme.colors.dark}
					textColor={theme.colors.dark}
					size="small"
					onPress={() => navigation.navigate("Login")}
				/>
			</View>
		)
	);
};

const styles = ({ colors, sizes, typography }) =>
	ScaledSheet.create({
		container: {
			width: "100%",
			flexDirection: "row",
			justifyContent: "space-between",
			backgroundColor: colors.warn,
			// position: "absolute",
			// top: 0,
			paddingHorizontal: sizes.paddings.hor.small / 1.8,
			paddingVertical: sizes.paddings.ver.small / 2,
			// borderWidth: 1,
		},
		infoText: {
			flex: 1,
			textAlign: "center",
			color: colors.dark,
			...typography.body4,
		},
	});
