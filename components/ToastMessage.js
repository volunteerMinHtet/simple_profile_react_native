import react, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-root-toast";

export const ApiResponseMessage = ({ authMsg, processing }) => {
	const [visible, setVisible] = useState(false);
	const [message, setMessage] = useState("");

	// const resetMessage = useMemo(
	// 	setTimeout(() => {
	// 		setVisible(false);
	// 		setMessage("");
	// 	}, 3000),
	// 	[authMsg]
	// );

	const visiableDuration = useCallback(() => {
		setTimeout(() => {
			setVisible(false);
			setMessage("");
		}, 3000);
	});

	useEffect(() => {
		console.log("message is null | authMsg is false");

		if (!processing) {
			if (!message && authMsg && authMsg !== "object") {
				console.log("message is null | authMsg was changed");
				setMessage(authMsg);
				setVisible(true);
				visiableDuration();
			}
		} else {
			clearTimeout(visiableDuration());
			setMessage("");
			setVisible(false);
		}

		// if (processing) {
		// 	clearTimeout(visiableDuration());
		// }

		return () => {
			clearTimeout(visiableDuration());
			setVisible(false);
		};
	}, [processing]);

	// switch (result) {
	// 	case 200:
	// 		return { httpStatus: 200, data: result };

	// 	case 422:
	// 		return { httpStatus: 422, data: result };

	// 	default:
	// 		return { httpStatus: 500, errorMsg: "Something went wrong!" };
	// }

	return <Toast visible={visible}>{message}</Toast>;
};
