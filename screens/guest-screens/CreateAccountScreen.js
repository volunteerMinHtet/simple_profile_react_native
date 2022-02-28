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

const CreateAccountScreen = ({ navigation }) => {
	const theme = useTheme();

	const themedStyles = useMemo(() => styles(theme), [theme]);

	const { createAccount, loading } = useAuth();

	const [formData, setFormData] = useState({
		user_name: "",
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
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
							autoComplete="username-new"
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
							placeholder="Name"
							autoComplete="name"
							onChangeText={(value) =>
								setFormData({ ...formData, name: value })
							}
							value={formData.name}
							isError={false}
						/>
					</View>

					<View
						style={{ marginBottom: theme.sizes.margins.ver.normal }}
					>
						<FullWidthTextInput
							placeholder="Email"
							autoComplete="email"
							onChangeText={(value) =>
								setFormData({ ...formData, email: value })
							}
							value={formData.email}
							isError={false}
						/>
					</View>

					<View
						style={{ marginBottom: theme.sizes.margins.ver.normal }}
					>
						<FullWidthTextInput
							placeholder="Password"
							autoComplete="password-new"
							onChangeText={(value) =>
								setFormData({ ...formData, password: value })
							}
							value={formData.password}
							isError={false}
						/>
					</View>

					<View
						style={{ marginBottom: theme.sizes.margins.ver.normal }}
					>
						<FullWidthTextInput
							placeholder="Confirm Password"
							autoComplete="password-new"
							onChangeText={(value) =>
								setFormData({
									...formData,
									password_confirmation: value,
								})
							}
							value={formData.password_confirmation}
							isError={false}
						/>
					</View>
				</View>

				<View style={{ marginBottom: theme.sizes.margins.ver.big }}>
					<FullWidthButton
						title={loading ? "loading..." : "create account"}
						bgColor={theme.colors.primary}
						disabled={loading}
						onPress={() => createAccount(JSON.stringify(formData))}
					/>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							marginTop: theme.sizes.margins.ver.small,
						}}
					>
						<Text style={themedStyles.bigLinkText}>
							{`Already have an account? `}
						</Text>

						<TouchableOpacity
							onPress={() => navigation.navigate("Login")}
							disabled={loading}
						>
							<Text style={themedStyles.primaryBigLinkText}>
								Log in
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default CreateAccountScreen;

const styles = ({ colors, sizes, typography }) =>
	ScaledSheet.create({
		container: {
			flex: 1,
			// justifyContent: "flex-start",
			// paddingHorizontal: sizes.paddings.hor.small,
			// marginTop: sizes.margins.ver.big * 2,
			// marginBottom: sizes.margins.ver.big,
		},
		headerText: {
			paddingTop: sizes.paddings.ver.big,
			color: colors.primary,
			textAlign: "center",
			marginBottom: sizes.margins.ver.normal,
			...typography.h1,
		},
		scrollContainer: {
			paddingHorizontal: sizes.paddings.hor.normal,
			// marginBottom: sizes.paddings.ver.small,
		},

		// linkText: {
		// 	textAlign: "center",
		// 	color: colors.text,
		// 	...typography.body5,
		// },
		bigLinkText: {
			textAlign: "center",
			color: colors.text,
			...typography.body4,
		},
		primaryBigLinkText: {
			textAlign: "center",
			color: colors.primary,
			...typography.body4,
		},
	});
