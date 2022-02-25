import { useTheme } from "@react-navigation/native";
import react, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { moderateVerticalScale, ScaledSheet } from "react-native-size-matters";

import { SecondaryButton } from "../../components/Buttons";
import FooterBar from "../../components/FooterBar";

const ProfileScreen = ({ navigation, route }) => {
	const { userId } = route.params;
	const { colors } = useTheme();
	const themedStyles = useMemo(() => styles({ colors }), [colors]);

	return (
		<>
			<View style={themedStyles.container}>
				<Text>{userId}</Text>

				<View style={{ paddingVertical: moderateVerticalScale(20) }}>
					<SecondaryButton
						title="Go to Home"
						onPress={() => navigation.navigate("Home")}
					/>
				</View>
			</View>

			<FooterBar />
		</>
	);
};

export default ProfileScreen;

const styles = ({ colors }) =>
	ScaledSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.backgroundColor,
			alignItems: "center",
			justifyContent: "center",
		},
	});
