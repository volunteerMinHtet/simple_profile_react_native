import { useContext, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
import { RootSiblingParent } from "react-native-root-siblings";

import { Ionicons } from "@expo/vector-icons";

import ThemeProvider, {
	ThemeContext,
	lightTheme,
	darkTheme,
} from "./providers/ThemeProvider";
import AuthProvider, { AuthContext, useAuth } from "./providers/AuthProvider";

import HomeScreen from "./screens/guest-screens/HomeScreen";
import ProfileScreen from "./screens/guest-screens/ProfileScreen";
import ScanQRCode from "./screens/guest-screens/ScanQRCode";
import LoginScreen from "./screens/guest-screens/LoginScreen";
import CreateAccountScreen from "./screens/guest-screens/CreateAccountScreen";
import UserProfileScreen from "./screens/authorized-screens/UserProfileScreen";

import { HeaderBackButton } from "./components/Buttons";
import { ApiResponseMessage } from "./components/ToastMessage";
import { scale } from "react-native-size-matters";

const prefix = Linking.createURL("/");

const Stack = createNativeStackNavigator();

function StackScreens() {
	const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
	const { colors } = useTheme();

	const { isAuth } = useAuth();

	console.log("main", isAuth);

	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShadowVisible: false,
				headerStyle: {
					backgroundColor: colors.softBackground,
				},
				headerTitleAlign: "center",
				headerRight: () => (
					<TouchableOpacity onPress={() => toggleTheme()}>
						{isDarkTheme ? (
							<Ionicons
								name="md-sunny-sharp"
								size={scale(17)}
								style={{ color: colors.text }}
							/>
						) : (
							<Ionicons
								name="moon"
								size={scale(17)}
								style={{ color: colors.text }}
							/>
						)}
					</TouchableOpacity>
				),
				headerTitleStyle: {
					fontSize: scale(14),
				},
			}}
		>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					title: "Simple Profile",
					headerBackVisible: true,
					headerTitleAlign: "left",
				}}
			/>
			<Stack.Screen
				name="Profile"
				component={ProfileScreen}
				options={({ navigation, route }) => ({
					headerLeft: (props) => (
						<HeaderBackButton
							onPress={() => navigation.navigate("Home")}
							color={colors.text}
						/>
					),
				})}
			/>
			<Stack.Screen
				name="ScanQRCode"
				component={ScanQRCode}
				options={({ navigation, route }) => ({
					headerLeft: (props) => (
						<HeaderBackButton
							onPress={() => navigation.navigate("Home")}
							color={colors.text}
						/>
					),
				})}
			/>

			{isAuth ? (
				<Stack.Screen
					name="UserProfile"
					component={UserProfileScreen}
					options={({ navigation, route }) => ({
						title: "Profile",
						headerLeft: (props) => (
							<HeaderBackButton
								onPress={() => navigation.navigate("Home")}
								color={colors.text}
							/>
						),
					})}
					// options={({ navigation, route }) => ({
					// 	headerLeft: (props) => (
					// 		<HeaderBackButton
					// 			onPress={() => navigation.navigate("Home")}
					// 			color={colors.text}
					// 		/>
					// 	),
					// })}
				/>
			) : (
				<>
					<Stack.Screen
						name="Login"
						component={LoginScreen}
						options={{ title: "Login" }}
					/>
					<Stack.Screen
						name="CreateAccount"
						component={CreateAccountScreen}
						options={{ title: "Create New Account" }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
}

// const BottomTab = createBottomTabNavigator();

// function BottomTabBar() {
// 	return (
// 		<BottomTab.Navigator>
// 			<BottomTab.Screen name="Home" component={HomeScreen} />
// 			<BottomTab.Screen name="Profile" component={UserProfileScreen} />
// 		</BottomTab.Navigator>
// 	);
// }

const Main = () => {
	const { isDarkTheme } = useContext(ThemeContext);
	const { loading, isAuth, authMsg } = useAuth();

	const config = {
		screens: {
			Home: "home",
			Profile: "profile/:profileLink",
			UserProfile: "user-profile",
		},
	};

	const linking = {
		prefixes: [prefix],
		config,
	};

	return (
		<>
			<NavigationContainer
				theme={isDarkTheme ? darkTheme : lightTheme}
				linking={linking}
				fallback={<Text>Loading...</Text>}
			>
				<StackScreens />
			</NavigationContainer>

			<ApiResponseMessage authMsg={authMsg} processing={loading} />
		</>
	);
};

export default function App() {
	return (
		<ThemeProvider>
			<AuthProvider>
				<RootSiblingParent>
					<Main />
				</RootSiblingParent>
			</AuthProvider>
		</ThemeProvider>
	);
}
