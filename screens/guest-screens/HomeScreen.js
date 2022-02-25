import react, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
	moderateScale,
	moderateVerticalScale,
	ScaledSheet,
} from "react-native-size-matters";

import { useTheme } from "@react-navigation/native";

import { PrimaryButton } from "../../components/Buttons";
import FooterBar from "../../components/FooterBar";

const HomeScreen = ({ navigation, route }) => {
	const { colors } = useTheme();
	const themedStyles = useMemo(() => styles({ colors }), [colors]);

	return (
		<>
			<View style={themedStyles.container}>
				<Text style={{ fontSize: moderateScale(13) }}>
					This is Home
				</Text>

				<View style={{ paddingVertical: moderateVerticalScale(20) }}>
					<PrimaryButton
						title="Go to Profile"
						onPress={() =>
							navigation.navigate("Profile", { userId: 1 })
						}
					/>
				</View>
			</View>

			<FooterBar />
		</>
	);
};

export default HomeScreen;

const styles = ({ colors }) =>
	ScaledSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.backgroundColor,
			alignItems: "center",
			justifyContent: "center",
			paddingHorizontal: moderateScale(15),
		},
	});
