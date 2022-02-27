import React, { useState, useEffect, useMemo } from "react";
import { Text, View, StyleSheet, Button, Vibration } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
	moderateScale,
	moderateVerticalScale,
	scale,
	ScaledSheet,
} from "react-native-size-matters";
import { useTheme } from "@react-navigation/native";
import * as Linking from "expo-linking";

import FooterBar from "../../components/FooterBar";
import { NormalButton } from "../../components/Buttons";

const ScanQRCode = () => {
	const theme = useTheme();

	const themedStyles = useMemo(() => styles(theme), [theme]);

	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);

		console.log(data);

		Vibration.vibrate();
		Linking.openURL(data);

		// alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={themedStyles.container}>
			{hasPermission === null && (
				<Text>Requesting for camera permission</Text>
			)}

			{hasPermission === false ? (
				<Text>No access to camera</Text>
			) : (
				<BarCodeScanner
					onBarCodeScanned={
						scanned ? undefined : handleBarCodeScanned
					}
					style={themedStyles.scanner}
				/>
			)}

			{scanned && (
				<NormalButton
					title={"Tap to Scan Again"}
					size="normal"
					bgColor={theme.colors.primary}
					onPress={() => setScanned(false)}
				/>
			)}

			<FooterBar />
		</View>
	);
};

export default ScanQRCode;

const styles = ({ colors, sizes, typography }) =>
	ScaledSheet.create({
		container: {
			flex: 1,
			justifyContent: "space-between",
			alignItems: "center",
			paddingTop: sizes.paddings.ver.big,
		},
		scanner: {
			width: "50%",
			height: "50%",
		},
	});
