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

import { useAuth } from "../providers/AuthProvider";

const TabButton = ({
	iconName,
	text = null,
	routeName,
	routeParams = {},
	needAuth = false,
	isAuth = false,
}) => {
	const navigation = useNavigation();
	const route = useRoute();
	const { colors } = useTheme();

	return (
		<TouchableOpacity
			onPress={() => {
				needAuth && !isAuth
					? navigation.navigate("Login")
					: navigation.navigate(routeName, routeParams);
			}}
		>
			<View>
				<Ionicons
					name={iconName}
					size={scale(20)}
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
	const theme = useTheme();
	const { isAuth } = useAuth();

	const themedStyles = useMemo(() => styles(theme), [theme]);

	return (
		<View style={themedStyles.container}>
			<TabButton
				iconName="home"
				//  text="Home"
				routeName="Home"
			/>
			<TabButton
				iconName="scan-circle"
				//  text="Home"
				routeName="ScanQRCode"
			/>
			<TabButton
				iconName="person-circle"
				// text="Profile"
				needAuth={true}
				isAuth={isAuth}
				routeName="UserProfile"
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
			// position: "absolute",
			// bottom: 0,
			paddingHorizontal: moderateScale(15),
			paddingVertical: moderateVerticalScale(10),
		},
	});
