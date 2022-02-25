import react, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useTheme } from "@react-navigation/native";
import { scale, ScaledSheet } from "react-native-size-matters";

export const FullWidthTextInput = ({
	placeholder = "Please enter",
	autoComplete = "",
	onChangeText,
	isError = false,
}) => {
	const theme = useTheme();

	const themedStyles = useMemo(() => styles(theme), [theme]);

	// const [value, setValue] = useState("");

	return (
		<>
			<View
				style={
					isError
						? themedStyles.fullWidthErrorContainer
						: themedStyles.fullWidthContainer
				}
			>
				<TextInput
					placeholder={placeholder}
					placeholderTextColor={theme.colors.text}
					autoComplete={autoComplete}
					onChangeText={(value) => onChangeText(value)}
					// value={value}
				/>
			</View>

			{isError && (
				<Text style={themedStyles.errorMsgText}>
					Need to fill Email!
				</Text>
			)}
		</>
	);
};

const styles = ({ colors, sizes, typography }) =>
	ScaledSheet.create({
		fullWidthContainer: {
			alignSelf: "stretch",
			width: "auto",
			backgroundColor: colors.textInput,
			paddingHorizontal: sizes.paddings.hor.normal,
			paddingVertical: sizes.paddings.ver.small,
			borderRadius: sizes.radius.strong,
		},
		fullWidthErrorContainer: {
			alignSelf: "stretch",
			width: "auto",
			backgroundColor: colors.textInput,
			paddingHorizontal: sizes.paddings.hor.normal,
			paddingVertical: sizes.paddings.ver.small,
			borderRadius: sizes.radius.strong,
			borderWidth: sizes.borders.light,
			borderColor: colors.error,
		},

		errorMsgText: {
			textAlign: "right",
			color: colors.error,
			paddingHorizontal: sizes.paddings.hor.normal,
			...typography.errorMsg,
		},
	});
