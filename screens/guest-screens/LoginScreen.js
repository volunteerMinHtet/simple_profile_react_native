import { useTheme } from "@react-navigation/native";
import react, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { useAuth } from "../../providers/AuthProvider";

import {
	FullWidthPrimaryButton,
	PrimaryButton,
} from "../../components/Buttons";
import { FullWidthTextInput } from "../../components/TextInput";

const LoginScreen = ({ navigation }) => {
	const theme = useTheme();
	const auth = useAuth();

	const themedStyles = useMemo(() => styles(theme), [theme]);

	const [formData, setFormData] = useState({
		user_name: "",
		password: "",
	});

	return (
		<View style={themedStyles.container}>
			<Text style={themedStyles.headerText}>Simple Profile</Text>

			<View
				style={{
					marginTop: theme.sizes.margins.ver.big * 2,
					marginBottom: theme.sizes.margins.ver.big,
				}}
			>
				<View style={{ marginBottom: theme.sizes.margins.ver.normal }}>
					<FullWidthTextInput
						placeholder="Username"
						autoComplete="username"
						onChangeText={(value) =>
							setFormData({ ...formData, user_name: value })
						}
						value={formData.user_name}
						isError={false}
					/>
				</View>

				<View style={{ marginBottom: theme.sizes.margins.ver.normal }}>
					<FullWidthTextInput
						placeholder="Password"
						autoComplete="password"
						onChangeText={(value) =>
							setFormData({ ...formData, password: value })
						}
						value={formData.password}
						isError={false}
					/>
				</View>

				<View style={{ flexWrap: "wrap", alignSelf: "center" }}>
					<TouchableOpacity
						onPress={() => alert("Forget password not avaliable")}
					>
						<Text style={themedStyles.linkText}>
							Forget Password?
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View style={{ marginBottom: theme.sizes.margins.ver.normal }}>
				<FullWidthPrimaryButton
					title={auth.loading ? "loading..." : "Log in"}
					disabled={auth.loading ? true : false}
					onPress={() => auth.login(JSON.stringify(formData))}
				/>

				<TouchableOpacity
					onPress={() => navigation.navigate("CreateAccount")}
				>
					<Text style={themedStyles.bigLinkText}>Create Account</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default LoginScreen;

const styles = ({ colors, sizes, typography }) =>
	ScaledSheet.create({
		container: {
			flex: 1,
			justifyContent: "flex-start",
			paddingHorizontal: sizes.paddings.hor.normal,
			marginTop: sizes.margins.ver.big * 2,
			marginBottom: sizes.margins.ver.big,
		},
		headerText: {
			color: colors.primary,
			textAlign: "center",
			...typography.h1,
		},
		linkText: {
			textAlign: "center",
			color: colors.text,
			...typography.body5,
		},
		bigLinkText: {
			textAlign: "center",
			color: colors.text,
			marginTop: sizes.margins.ver.small,
			...typography.body4,
		},
	});
