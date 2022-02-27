import react, { useCallback, useEffect, useMemo, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ActivityIndicator,
	Share,
	ScrollView,
	SafeAreaView,
} from "react-native";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import {
	moderateVerticalScale,
	scale,
	ScaledSheet,
} from "react-native-size-matters";
import * as Linking from "expo-linking";
import * as Sharing from "expo-sharing";

import { useAuth } from "../../providers/AuthProvider";

import {
	FullWidthOutlineButton,
	FullWidthButton,
	FullWidthPrimaryOutlineButton,
	NormalButton,
	PrimaryOutlineButton,
} from "../../components/Buttons";
import FooterBar from "../../components/FooterBar";

const UserProfileScreen = ({ navigation }) => {
	// const { userId } = route.params;

	const theme = useTheme();
	const { loading, userData, logout, retrieveUserDataByToken } = useAuth();

	const themedStyles = useMemo(() => styles(theme), [theme]);

	useFocusEffect(
		useCallback(() => {
			retrieveUserDataByToken();
		}, [])
	);

	console.log(userData);

	const shareProfileLink = async (userName, link) => {
		try {
			await Share.share({
				url: userData.qrcode,
				title: `Click to view ${userName}'s profile on Simple Profile App`,
				message: link,
			});
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<SafeAreaView style={themedStyles.mainContainer}>
			<ScrollView style={themedStyles.scrollContainer}>
				<View style={themedStyles.contentContainer}>
					<View
						style={{
							marginTop: moderateVerticalScale(15),
						}}
					>
						{userData && userData.qrcode ? (
							<View style={{ alignItems: "center" }}>
								<Text style={themedStyles.userName}>
									{userData.name}
								</Text>
								<Text style={themedStyles.email}>
									{userData.email}
								</Text>

								<View
									style={{
										alignItems: "center",
										marginBottom: moderateVerticalScale(15),
									}}
								>
									<View style={themedStyles.logoContainer}>
										<Image
											source={{ uri: userData.qrcode }}
											style={themedStyles.logo}
										/>
									</View>

									<Text style={themedStyles.profileLink}>
										{Linking.createURL(
											`profile/${userData.profile_link}`
										)}
									</Text>
								</View>

								<NormalButton
									title={"Share Profile"}
									bgColor={theme.colors.primary}
									size="small"
									onPress={() =>
										shareProfileLink(
											userData.name,
											Linking.createURL(
												`/profile/${userData.profile_link}`
											)
										)
									}
								/>
							</View>
						) : (
							<View
								style={{
									flex: 1,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<ActivityIndicator
									size="large"
									color={theme.colors.primary}
								/>
							</View>
						)}
					</View>
					{/* <Text>{userId}</Text> */}
					<View
						style={{
							paddingVertical: moderateVerticalScale(50),
						}}
					>
						<View
							style={{
								marginVertical: moderateVerticalScale(7),
							}}
						>
							<FullWidthOutlineButton
								title="edit profile"
								bgColor={theme.colors.primary}
								textColor={theme.colors.primary}
								// onPress={() => logout()}
								disabled={loading}
							/>
						</View>

						<View
							style={{
								marginVertical: moderateVerticalScale(7),
							}}
						>
							<FullWidthOutlineButton
								title="change password"
								bgColor={theme.colors.primary}
								textColor={theme.colors.primary}
								// onPress={() => logout()}
								disabled={loading}
							/>
						</View>

						<View
							style={{
								marginTop: moderateVerticalScale(20),
							}}
						>
							<FullWidthButton
								title="Logout"
								bgColor={theme.colors.red}
								onPress={() => logout()}
								disabled={loading}
							/>
						</View>
					</View>
				</View>
			</ScrollView>

			<FooterBar />
		</SafeAreaView>
	);
};

export default UserProfileScreen;

const styles = ({ colors, sizes, typography }) =>
	ScaledSheet.create({
		mainContainer: {
			flex: 1,
			justifyContent: "space-between",
			alignItems: "stretch",
			backgroundColor: colors.backgroundColor,
		},
		scrollContainer: {
			flexGrow: 1,
			paddingHorizontal: sizes.paddings.hor.normal,
		},
		contentContainer: {
			flex: 1,
			justifyContent: "center",
			position: "relative",
			paddingTop: sizes.paddings.ver.big,
		},

		userName: {
			color: colors.primary,
			...typography.h3,
		},
		email: {
			color: colors.text,
			...typography.body5,
		},

		logoContainer: {
			backgroundColor: colors.white,
			width: scale(120),
			height: scale(120),
			paddingHorizontal: sizes.paddings.hor.small / 1.5,
			paddingVertical: sizes.paddings.ver.small / 1.5,
			marginTop: sizes.margins.ver.normal,
			marginBottom: sizes.margins.ver.small,
		},
		logo: {
			flex: 1,
			width: "100%",
			height: "100%",
			resizeMode: "stretch",
		},

		profileLink: {
			paddingHorizontal: sizes.paddings.hor.big * 2,
			color: colors.primary,
			...typography.body5,
		},
	});
