import { useState, createContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const base = scale(8);

const fontsSizes = {
	largeTitle: moderateScale(50),
	h1: moderateScale(30),
	h2: moderateScale(22),
	h3: moderateScale(20),
	h4: moderateScale(18),
	body1: moderateScale(30),
	body2: moderateScale(20),
	body3: moderateScale(16),
	body4: moderateScale(14),
	body5: moderateScale(12),
	small: moderateScale(12),
};

const horizontalPaddings = {
	small: scale(base),
	normal: scale(base * 2),
	big: scale(base * 3),
};

const verticalPaddings = {
	small: verticalScale(base),
	normal: verticalScale(base * 2),
	big: verticalScale(base * 3),
};

const paddings = {
	hor: { ...horizontalPaddings },
	ver: { ...verticalPaddings },
};

const horizontalMargins = {
	small: scale(base),
	normal: scale(base * 2),
	big: scale(base * 3),
};

const verticalMargins = {
	small: verticalScale(base),
	normal: verticalScale(base * 2),
	big: verticalScale(base * 3),
};

const margins = {
	hor: { ...horizontalMargins },
	ver: { ...verticalMargins },
};

const borders = {
	light: moderateScale(0.5),
	normal: moderateScale(1),
	bold: moderateScale(3),
};

const radius = {
	soft: scale(5),
	normal: scale(10),
	strong: scale(15),
};

const typography = {
	largeTitle: {
		// fontFamily: "Roboto-Regular",
		fontWeight: "bold",
		fontSize: fontsSizes.largeTitle,
		lineHeight: verticalScale(60),
	},
	h1: {
		// fontFamily: "Roboto-Black",
		fontWeight: "bold",
		fontSize: fontsSizes.h1,
		lineHeight: verticalScale(41),
	},
	h2: {
		// fontFamily: "Roboto-Bold",
		fontWeight: "bold",
		fontSize: fontsSizes.h2,
		lineHeight: verticalScale(35),
	},
	h3: {
		// fontFamily: "Roboto-Bold",
		fontWeight: "bold",
		fontSize: fontsSizes.h3,
		lineHeight: verticalScale(27),
	},
	h4: {
		// fontFamily: "Roboto-Bold",
		fontWeight: "bold",
		fontSize: fontsSizes.h4,
		lineHeight: verticalScale(27),
	},
	body1: {
		// fontFamily: "Roboto-Regular",
		fontWeight: "normal",
		fontSize: fontsSizes.body1,
		lineHeight: verticalScale(41),
	},
	body2: {
		// fontFamily: "Roboto-Regular",
		fontWeight: "normal",
		fontSize: fontsSizes.body2,
		lineHeight: verticalScale(35),
	},
	body3: {
		// fontFamily: "Roboto-Regular",
		fontWeight: "normal",
		fontSize: fontsSizes.body3,
		lineHeight: verticalScale(27),
	},
	body4: {
		// fontFamily: "Roboto-Regular",
		fontWeight: "normal",
		fontSize: fontsSizes.body4,
		lineHeight: verticalScale(27),
	},
	body5: {
		// fontFamily: "Roboto-Regular",
		fontWeight: "normal",
		fontSize: fontsSizes.body5,
		lineHeight: verticalScale(20),
	},
	errorMsg: {
		fontWeight: "100",
		fontSize: fontsSizes.small,
		lineHeight: verticalScale(20),
	},
};

export const lightTheme = {
	dark: false,
	colors: {
		primary: "#546de5",
		secondary: "#596275",
		white: "#FFFFFF",
		error: "#FF0000",
		background: "#FFFFFF",
		softBackground: "#F7F7F7",
		card: "rgb(255, 255, 255)",
		textInput: "#EDEFF3",
		text: "#303952",
		border: "#596275",
		notification: "rgb(255, 69, 58)",
	},
	typography,
	sizes: { base, paddings, margins, borders, radius },
};

export const darkTheme = {
	dark: true,
	colors: {
		primary: "#546de5",
		secondary: "#596275",
		white: "#FFFFFF",
		error: "#FF0000",
		background: "#303952",
		softBackground: "#353F5B",
		card: "rgb(255, 255, 255)",
		textInput: "#596275",
		text: "#FFFFFF",
		border: "#F8F8F9",
		notification: "rgb(255, 69, 58)",
	},
	typography,
	sizes: { base, paddings, margins, borders, radius },
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
