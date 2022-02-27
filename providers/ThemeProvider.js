import { useState, createContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import {
	moderateScale,
	moderateVerticalScale,
	scale,
	verticalScale,
} from "react-native-size-matters";

const base = 8;
const scalFactor = 0.7;

const fontsSizes = {
	largeTitle: moderateScale(50, scalFactor),
	h1: moderateScale(30, scalFactor),
	h2: moderateScale(22, scalFactor),
	h3: moderateScale(20, scalFactor),
	h4: moderateScale(18, scalFactor),
	body1: moderateScale(30, scalFactor),
	body2: moderateScale(20, scalFactor),
	body3: moderateScale(16, scalFactor),
	body4: moderateScale(14, scalFactor),
	body5: moderateScale(12, scalFactor),
	small: moderateScale(12, scalFactor),
};

const horizontalPaddings = {
	small: moderateScale(base, scalFactor),
	normal: moderateScale(base * 2, scalFactor),
	big: moderateScale(base * 3, scalFactor),
};

const verticalPaddings = {
	small: moderateVerticalScale(base, scalFactor),
	normal: moderateVerticalScale(base * 2, scalFactor),
	big: moderateVerticalScale(base * 3, scalFactor),
};

const paddings = {
	hor: { ...horizontalPaddings },
	ver: { ...verticalPaddings },
};

const horizontalMargins = {
	small: moderateScale(base, scalFactor),
	normal: moderateScale(base * 2, scalFactor),
	big: moderateScale(base * 3, scalFactor),
};

const verticalMargins = {
	small: moderateVerticalScale(base, scalFactor),
	normal: moderateVerticalScale(base * 2, scalFactor),
	big: moderateVerticalScale(base * 3, scalFactor),
};

const margins = {
	hor: { ...horizontalMargins },
	ver: { ...verticalMargins },
};

const borders = {
	light: moderateScale(0.5, scalFactor),
	normal: moderateScale(1, scalFactor),
	bold: moderateScale(3, scalFactor),
};

const radius = {
	soft: moderateScale(5, scalFactor),
	normal: moderateScale(10, scalFactor),
	strong: moderateScale(15, scalFactor),
};

const typography = {
	largeTitle: {
		// fontFamily: "Roboto-Regular",
		fontWeight: "bold",
		fontSize: fontsSizes.largeTitle,
		lineHeight: moderateVerticalScale(60, scalFactor),
	},
	h1: {
		// fontFamily: "Roboto-Black",
		fontWeight: "bold",
		fontSize: fontsSizes.h1,
		lineHeight: moderateVerticalScale(41, scalFactor),
	},
	h2: {
		// fontFamily: "Roboto-Bold",
		fontWeight: "bold",
		fontSize: fontsSizes.h2,
		lineHeight: moderateVerticalScale(35, scalFactor),
	},
	h3: {
		// fontFamily: "Roboto-Bold",
		fontWeight: "bold",
		fontSize: fontsSizes.h3,
		lineHeight: moderateVerticalScale(27, scalFactor),
	},
	h4: {
		// fontFamily: "Roboto-Bold",
		fontWeight: "bold",
		fontSize: fontsSizes.h4,
		lineHeight: moderateVerticalScale(27, scalFactor),
	},
	body1: {
		// fontFamily: "Roboto-Regular",
		fontWeight: "normal",
		fontSize: fontsSizes.body1,
		lineHeight: moderateVerticalScale(41, scalFactor),
	},
	body2: {
		// fontFamily: "Roboto-Regular",
		fontWeight: "normal",
		fontSize: fontsSizes.body2,
		lineHeight: moderateVerticalScale(35, scalFactor),
	},
	body3: {
		// fontFamily: "Roboto-Regular",
		fontWeight: "normal",
		fontSize: fontsSizes.body3,
		lineHeight: moderateVerticalScale(27, scalFactor),
	},
	body4: {
		// fontFamily: "Roboto-Regular",
		fontWeight: "normal",
		fontSize: fontsSizes.body4,
		lineHeight: moderateVerticalScale(27, scalFactor),
	},
	body5: {
		// fontFamily: "Roboto-Regular",
		fontWeight: "normal",
		fontSize: fontsSizes.body5,
		lineHeight: moderateVerticalScale(20, scalFactor),
	},
	smallText: {
		// fontFamily: "Roboto-Regular",
		fontWeight: "100",
		fontSize: fontsSizes.small,
		lineHeight: moderateVerticalScale(20, scalFactor),
	},
	errorMsg: {
		fontWeight: "100",
		fontSize: fontsSizes.small,
		lineHeight: moderateVerticalScale(20, scalFactor),
	},
};

export const lightTheme = {
	dark: false,
	colors: {
		primary: "#546de5",
		secondary: "#596275",
		white: "#FFFFFF",
		warn: "#f5cd79",
		red: "#c44569",
		error: "#FF0000",
		dark: "#303952",
		background: "#FFFFFF",
		softBackground: "#F7F7F7",
		card: "rgb(255, 255, 255)",
		textInput: "#EDEFF3",
		text: "#303952",
		border: "#596275",
		notification: "rgb(255, 69, 58)",
	},
	typography,
	sizes: { base, scalFactor, paddings, margins, borders, radius },
};

export const darkTheme = {
	dark: true,
	colors: {
		primary: "#546de5",
		secondary: "#596275",
		white: "#FFFFFF",
		warn: "#f5cd79",
		red: "#c44569",
		error: "#FF0000",
		dark: "#303952",
		background: "#303952",
		softBackground: "#353F5B",
		card: "rgb(255, 255, 255)",
		textInput: "#596275",
		text: "#FFFFFF",
		border: "#F8F8F9",
		notification: "rgb(255, 69, 58)",
	},
	typography,
	sizes: { base, scalFactor, paddings, margins, borders, radius },
};

export const ThemeContext = createContext();

const ThemeProvider = (props) => {
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
	};

	return (
		<ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
			{props.children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
