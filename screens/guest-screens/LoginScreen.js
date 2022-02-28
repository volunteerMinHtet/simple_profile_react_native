import { useTheme } from "@react-navigation/native";
import react, { useMemo, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	SafeAreaView,
	ScrollView,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { useAuth } from "../../providers/AuthProvider";

import { FullWidthButton, NormalButton } from "../../components/Buttons";
import { FullWidthTextInput } from "../../components/TextInput";

const LoginScreen = ({ navigation }) => {
	const theme = useTheme();
	const { loading, login } = useAuth();

	const themedStyles = useMemo(() => styles(theme), [theme]);

	const [formData, setFormData] = useState({
		user_name: "",
		password: "",
	});

	return (
		<SafeAreaView style={themedStyles.container}>
			<ScrollView style={themedStyles.scrollContainer}>
				<Text style={themedStyles.headerText}>Simple Profile</Text>

				<View
					style={{
						marginTop: theme.sizes.margins.ver.big,
						marginBottom: theme.sizes.margins.ver.big,
					}}
				>
					<View
						style={{ marginBottom: theme.sizes.margins.ver.normal }}
					>
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
					<View
						style={{ marginBottom: theme.sizes.margins.ver.normal }}
					>
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
							onPress={() =>
								alert("Forget password not avaliable")
							}
							disabled={loading}
						>
							<Text style={themedStyles.linkText}>
								Forget Password?
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={{ marginBottom: theme.sizes.margins.ver.normal }}>
					<FullWidthButton
						title={loading ? "loading..." : "Log in"}
						bgColor={theme.colors.primary}
						disabled={loading}
						onPress={() => login(JSON.stringify(formData))}
					/>
					<TouchableOpacity
						onPress={() => navigation.navigate("CreateAccount")}
						disabled={loading}
					>
						<Text style={themedStyles.bigLinkText}>
							Create Account
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default LoginScreen;

const styles = ({ colors, sizes, typography }) =>
	ScaledSheet.create({
		container: {
			flex: 1,
			// justifyContent: "flex-start",

			// marginBottom: sizes.margins.ver.big,
		},
		scrollContainer: {
			flex: 1,
			// paddingTop: sizes.paddings.ver.big,
			paddingHorizontal: sizes.paddings.hor.normal,
		},
		headerText: {
			paddingTop: sizes.paddings.ver.big,
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
