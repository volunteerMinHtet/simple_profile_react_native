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

const UserProfileScreen = ({ navigation, route }) => {
	const { profileLink } = route.params;

	console.log(profileLink);

	const theme = useTheme();
	const { loading, visitorData, retrieveUserDataByProfileLink } = useAuth();

	const themedStyles = useMemo(() => styles(theme), [theme]);

	useFocusEffect(
		useCallback(() => {
			console.log("1");
			retrieveUserDataByProfileLink();
			console.log("2");
		}, [])
	);

	return (
		<SafeAreaView style={themedStyles.mainContainer}>
			<ScrollView style={themedStyles.scrollContainer}>
				<View style={themedStyles.contentContainer}>
					<View
						style={{
							marginTop: moderateVerticalScale(15),
						}}
					>
						{visitorData && visitorData.qrcode ? (
							<View style={{ alignItems: "center" }}>
								<Text style={themedStyles.userName}>
									{visitorData.name}
								</Text>
								<Text style={themedStyles.email}>
									{visitorData.email}
								</Text>

								<View
									style={{
										alignItems: "center",
										marginBottom: moderateVerticalScale(15),
									}}
								>
									<View style={themedStyles.logoContainer}>
										<Image
											source={{ uri: visitorData.qrcode }}
											style={themedStyles.logo}
										/>
									</View>

									<Text style={themedStyles.profileLink}>
										{Linking.createURL(
											`/profile/${visitorData.profile_link}`
										)}
									</Text>
								</View>

								<NormalButton
									title={"Save"}
									bgColor={theme.colors.primary}
									size="small"
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
