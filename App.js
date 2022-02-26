import { useContext, useState } from "react";
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
import ProfileScreen from "./screens/authorized-screens/ProfileScreen";
import LoginScreen from "./screens/guest-screens/LoginScreen";
import CreateAccountScreen from "./screens/guest-screens/CreateAccountScreen";

import { HeaderBackButton } from "./components/Buttons";
import { ApiResponseMessage } from "./components/ToastMessage";

const prefix = Linking.createURL("/");

const Stack = createNativeStackNavigator();

function StackScreens() {
	const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
	const { colors } = useTheme();

	const { isAuth, token } = useAuth();

	console.log(isAuth);

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
								size={24}
								style={{ color: colors.text }}
							/>
						) : (
							<Ionicons
								name="moon"
								size={24}
								style={{ color: colors.text }}
							/>
						)}
					</TouchableOpacity>
				),
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
			{isAuth ? (
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
// 			<BottomTab.Screen name="Profile" component={ProfileScreen} />
// 		</BottomTab.Navigator>
// 	);
// }

const Main = () => {
	const { isDarkTheme } = useContext(ThemeContext);
	const { msg } = useAuth();

	const config = {
		screens: {
			Home: "home",
			Profile: "profile/:userId",
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

			<ApiResponseMessage message={msg} />
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
