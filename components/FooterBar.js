import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import {
	moderateScale,
	moderateVerticalScale,
	scale,
	ScaledSheet,
} from "react-native-size-matters";

const TabButton = ({ iconName, text = null, routeName, routeParams = {} }) => {
	const navigation = useNavigation();
	const route = useRoute();
	const { colors } = useTheme();

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate(routeName, routeParams)}
		>
			<View>
				<Ionicons
					name={iconName}
					size={30}
					style={{
						color:
							route.name === routeName
								? colors.primary
								: colors.secondary,
					}}
				/>
				{text && (
					<Text
						style={{
							color:
								route.name === routeName
									? colors.primary
									: colors.secondary,
						}}
					>
						{text}
					</Text>
				)}
			</View>
		</TouchableOpacity>
	);
};

const FooterBar = () => {
	const { colors } = useTheme();

	const themedStyles = useMemo(() => styles({ colors }), [colors]);

	return (
		<View style={themedStyles.container}>
			<TabButton
				iconName="home"
				//  text="Home"
				routeName="Home"
			/>
			<TabButton
				iconName="home"
				//  text="Home"
				routeName="Login"
			/>
			<TabButton
				iconName="person-circle"
				// text="Profile"
				routeName="Profile"
				routeParams={{ userId: 2 }}
			/>
		</View>
	);
};

export default FooterBar;

const styles = ({ colors }) =>
	ScaledSheet.create({
		container: {
			backgroundColor: colors.softBackground,
			width: "100%",
			flexDirection: "row",
			justifyContent: "space-around",
			position: "absolute",
			bottom: 0,
			paddingHorizontal: moderateScale(15),
			paddingVertical: moderateVerticalScale(10),
		},
	});
