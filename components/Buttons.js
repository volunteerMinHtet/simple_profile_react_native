import react, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
	moderateScale,
	moderateVerticalScale,
	scale,
	ScaledSheet,
} from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const PrimaryButton = ({ onPress, title }) => {
	const theme = useTheme();

	const themedStyles = useMemo(() => styles(theme), [theme]);

	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.5}>
			<View
				style={[
					themedStyles.btnContainer,
					{ backgroundColor: theme.colors.primary },
				]}
			>
				<Text
					style={[
						themedStyles.btnText,
						{ color: theme.colors.white },
					]}
				>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const SecondaryButton = ({ onPress, title }) => {
	const theme = useTheme();

	const themedStyles = useMemo(() => styles(theme), [theme]);

	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.5}>
			<View
				style={[
					themedStyles.btnContainer,
					{ backgroundColor: theme.colors.secondary },
				]}
			>
				<Text
					style={[
						themedStyles.btnText,
						{ color: theme.colors.white },
					]}
				>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const FullWidthPrimaryButton = ({ onPress, title, disabled = false }) => {
	const theme = useTheme();

	const themedStyles = useMemo(() => styles(theme), [theme]);

	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.5}
			disabled={disabled}
		>
			<View
				style={[
					themedStyles.fullWidthBtnContainer,
					{ backgroundColor: theme.colors.primary },
				]}
			>
				<Text
					style={[
						themedStyles.fullWidthBtnText,
						{ color: theme.colors.white },
					]}
				>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const HeaderBackButton = ({ onPress, color = "black" }) => {
	const theme = useTheme();

	const themedStyles = useMemo(() => styles(theme), [theme]);

	return (
		<TouchableOpacity
			onPress={onPress}
			style={themedStyles.iconBtnContainer}
		>
			<Ionicons
				name="arrow-back"
				size={24}
				style={[themedStyles.iconBtnContent, { color: color }]}
			/>
		</TouchableOpacity>
	);
};

const styles = ({ colors, sizes, typography }) =>
	ScaledSheet.create({
		btnContainer: {
			alignSelf: "flex-start",
			paddingHorizontal: sizes.paddings.hor.normal,
			paddingVertical: sizes.paddings.ver.small,
			borderRadius: sizes.radius.strong,
		},
		btnText: {
			...typography.body5,
		},

		fullWidthBtnContainer: {
			alignSelf: "stretch",
			width: "100%",
			paddingHorizontal: sizes.paddings.hor.normal,
			paddingVertical: sizes.paddings.ver.small,
			borderRadius: sizes.radius.strong,
		},
		fullWidthBtnText: {
			textTransform: "uppercase",
			textAlign: "center",
			...typography.body4,
		},

		iconBtnContainer: {
			marginRight: sizes.margins.hor.small,
		},
		iconBtnContent: {},
	});

export {
	PrimaryButton,
	SecondaryButton,
	FullWidthPrimaryButton,
	HeaderBackButton,
};
