import react, { useEffect, useMemo, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Button,
	SafeAreaView,
	ScrollView,
	Image,
	FlatList,
} from "react-native";
import {
	moderateScale,
	moderateVerticalScale,
	ScaledSheet,
} from "react-native-size-matters";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useTheme } from "@react-navigation/native";

import { NormalButton } from "../../components/Buttons";
import FooterBar from "../../components/FooterBar";
import { HomeHeaer } from "../../components/home/Header";

const DATA = [
	{
		id: 1,
		title: "First Item",
		image: "https://placeimg.com/640/480/tech",
		body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
	},
	{
		id: 2,
		title: "Second Item",
		image: "https://placeimg.com/640/480/tech",
		body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the ",
	},
	{
		id: 3,
		title: "Third Item",
		image: "https://placeimg.com/640/480/tech",
		body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it",
	},
];

const HomeScreen = ({ navigation, route }) => {
	const theme = useTheme();
	const themedStyles = useMemo(() => styles(theme), [theme]);

	const [isScann, setIsScann] = useState(false);

	const renderItem = ({ item }) => (
		<View style={themedStyles.cartItemContainer}>
			<Image
				source={{
					uri: item.image,
				}}
				style={themedStyles.cartItemImage}
			/>
			<View style={themedStyles.cartItemTextContainer}>
				<Text style={themedStyles.cartItemText}>{item.body}</Text>
			</View>
		</View>
	);

	return (
		<>
			<HomeHeaer />

			<SafeAreaView style={themedStyles.container}>
				<Text style={themedStyles.headerText}>Saved Items</Text>

				<View
				// style={{
				// 	paddingVertical: moderateVerticalScale(
				// 		20,
				// 		theme.scaleFactor
				// 	),
				// }}
				>
					<FlatList
						data={DATA}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						style={themedStyles.itemsList}
					/>

					{/* <NormalButton
						title="Scan Profile"
						bgColor={theme.colors.primary}
						size="small"
						onPress={() => navigation.navigate("UserProfile")}
					/> */}
				</View>
			</SafeAreaView>

			<FooterBar />
		</>
	);
};

export default HomeScreen;

const styles = ({ colors, sizes, typography }) =>
	ScaledSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.backgroundColor,
			alignItems: "center",
			justifyContent: "flex-start",
			paddingHorizontal: moderateScale(10),
			// position: "relative",
		},
		// scrollContainer: {
		// 	flex: 1,
		// 	paddingVertical: sizes.paddings.ver.big,
		// },
		headerText: {
			color: colors.text,
			marginTop: sizes.margins.ver.normal,
			...typography.h4,
		},
		itemsList: {
			paddingHorizontal: sizes.paddings.hor.small,
			// paddingVertical: sizes.paddings.ver.normal,
			marginTop: sizes.margins.ver.normal,
			marginBottom: sizes.margins.ver.big * 1.5,
		},
		cartItemContainer: {
			marginBottom: sizes.margins.ver.big,
		},
		cartItemImage: {
			width: "100%",
			height: moderateVerticalScale(150, sizes.scaleFactor),
			borderTopLeftRadius: sizes.radius.soft,
			borderTopRightRadius: sizes.radius.soft,
		},
		cartItemTextContainer: {
			backgroundColor: colors.softBackground,
			width: "auto",
			paddingHorizontal: sizes.paddings.hor.small,
			paddingVertical: sizes.paddings.ver.small,
			borderBottomLeftRadius: sizes.radius.soft,
			borderBottomRightRadius: sizes.radius.soft,
		},
		cartItemText: {
			color: colors.text,
			...typography.body4,
		},
	});
