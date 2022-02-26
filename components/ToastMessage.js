import react, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-root-toast";

export const ApiResponseMessage = ({ message }) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (message) {
			setVisible(true);
		}

		setTimeout(() => setVisible(false), 3000);

		return () => setVisible(false);
	}, [message]);

	// switch (result) {
	// 	case 200:
	// 		return { httpStatus: 200, data: result };

	// 	case 422:
	// 		return { httpStatus: 422, data: result };

	// 	default:
	// 		return { httpStatus: 500, errorMsg: "Something went wrong!" };
	// }

	return message !== "object" ? (
		<Toast visible={visible}>{message}</Toast>
	) : null;
};
