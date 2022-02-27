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

const NormalButton = ({ onPress, title, bgColor, size = "normal" }) => {
	const theme = useTheme();

	const themedStyles = useMemo(() => styles(theme), [theme]);

	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.5}>
			<View
				style={[
					{ backgroundColor: bgColor },
					size === "small" && themedStyles.smallBtnContainer,
					size === "normal" && themedStyles.normalBtnContainer,
					size === "big" && themedStyles.bigBtnContainer,
				]}
			>
				<Text
					style={[
						{ color: theme.colors.white },
						size === "small" && themedStyles.smallBtnText,
						size === "normal" && themedStyles.normalBtnText,
						size === "big" && themedStyles.bigBtnText,
					]}
				>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const FullWidthButton = ({ onPress, title, bgColor, disabled = false }) => {
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
					{ backgroundColor: bgColor },
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

const FullWidthOutlineButton = ({
	onPress,
	title,
	bgColor,
	textColor,
	disabled = false,
}) => {
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
					themedStyles.fullWidthOutlineBtnContainer,
					{ borderColor: bgColor },
				]}
			>
				<Text
					style={[
						themedStyles.fullWidthOutlineBtnText,
						{
							color: textColor,
						},
					]}
				>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const OutlineButton = ({
	onPress,
	title,
	bgColor,
	textColor,
	size = "normal",
}) => {
	const theme = useTheme();

	const themedStyles = useMemo(() => styles(theme), [theme]);

	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.5}>
			<View
				style={[
					{ borderColor: bgColor },
					size === "small" && themedStyles.smallOutlineBtnContainer,
					size === "normal" && themedStyles.normalOutlineBtnContainer,
					size === "big" && themedStyles.bigOutlineBtnContainer,
				]}
			>
				<Text
					style={[
						{ color: textColor },
						size === "small" && themedStyles.smallOutlineBtnText,
						size === "normal" && themedStyles.normalOutlineBtnText,
						size === "big" && themedStyles.bigOutlineBtnText,
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
				size={scale(20)}
				style={[themedStyles.iconBtnContent, { color: color }]}
			/>
		</TouchableOpacity>
	);
};

export {
	NormalButton,
	FullWidthButton,
	FullWidthOutlineButton,
	HeaderBackButton,
	OutlineButton,
};

const styles = ({ colors, sizes, typography }) =>
	ScaledSheet.create({
		smallBtnContainer: {
			alignSelf: "flex-start",
			paddingHorizontal: sizes.paddings.hor.small,
			paddingVertical: sizes.paddings.ver.small / 2,
			borderRadius: sizes.radius.strong,
		},
		normalBtnContainer: {
			alignSelf: "flex-start",
			paddingHorizontal: sizes.paddings.hor.normal,
			paddingVertical: sizes.paddings.ver.small,
			borderRadius: sizes.radius.strong,
		},
		bigBtnContainer: {
			alignSelf: "flex-start",
			paddingHorizontal: sizes.paddings.hor.normal,
			paddingVertical: sizes.paddings.ver.small,
			borderRadius: sizes.radius.strong,
		},

		smallOutlineBtnContainer: {
			alignSelf: "flex-start",
			paddingHorizontal: sizes.paddings.hor.small,
			paddingVertical: sizes.paddings.ver.small / 2,
			borderRadius: sizes.radius.strong,
			borderWidth: sizes.borders.normal,
		},
		normalOutlineBtnContainer: {
			alignSelf: "flex-start",
			paddingHorizontal: sizes.paddings.hor.normal,
			paddingVertical: sizes.paddings.ver.small,
			borderRadius: sizes.radius.strong,
			borderWidth: sizes.borders.normal,
		},
		bigOutlineBtnContainer: {
			alignSelf: "flex-start",
			paddingHorizontal: sizes.paddings.hor.normal,
			paddingVertical: sizes.paddings.ver.small,
			borderRadius: sizes.radius.strong,
			borderWidth: sizes.borders.normal,
		},

		smallBtnText: {
			...typography.smallText,
			// fontWeight: "100",
		},
		normalBtnText: {
			...typography.body5,
		},
		bigBtnText: {
			...typography.body4,
		},

		smallOutlineBtnText: {
			...typography.smallText,
			// fontWeight: "100",
		},
		normalOutlineBtnText: {
			...typography.body5,
		},
		bigOutlineBtnText: {
			...typography.body4,
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

		fullWidthOutlineBtnContainer: {
			alignSelf: "stretch",
			width: "100%",
			paddingHorizontal: sizes.paddings.hor.normal,
			paddingVertical: sizes.paddings.ver.small,
			borderRadius: sizes.radius.strong,
			borderWidth: sizes.borders.normal,
		},
		fullWidthOutlineBtnText: {
			textTransform: "uppercase",
			textAlign: "center",
			...typography.body4,
		},

		iconBtnContainer: {
			marginRight: sizes.margins.hor.small,
		},
		iconBtnContent: {},
	});
