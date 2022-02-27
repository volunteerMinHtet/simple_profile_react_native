import AsyncStorageLib from "@react-native-async-storage/async-storage";
import react, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

import AuthAPI from "../services/api/AuthAPI";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

async function storeToken(token) {
	await AsyncStorageLib.setItem("@auth_token", token);
}

async function retrieveToken() {
	console.log("retrieving token");
	return AsyncStorageLib.getItem("@auth_token");
}

async function removeToken() {
	console.log("removing token");
	return AsyncStorageLib.removeItem("@auth_token");
}

const AuthProvider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false);
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState("");
	const [userData, setUserData] = useState();
	const [visitorData, setVisitorData] = useState();
	const [authMsg, setAuthMsg] = useState();

	useEffect(() => {
		setLoading(true);
		retrieveToken()
			.then((authToken) => {
				// console.log("success re token", authToken);
				if (authToken) {
					setToken(authToken);
					setIsAuth(true);
				} else {
					// console.log("failed re token", authToken);
					setToken("");
					setUserData();
					setIsAuth(false);
				}
			})
			.catch((e) => {
				setToken("");
				setUserData();
				setIsAuth(false);
			})
			.finally(() => setLoading(false));
	}, []);

	const login = (data) => {
		setLoading(true);

		AuthAPI.login(data)
			.then(async (result) => {
				if (result.httpStatusCode === 200) {
					await storeToken(result.json.token);
					setToken(result.json.token);
					setIsAuth(true);
					setAuthMsg("Successfully logged in");
				} else {
					setToken("");
					setIsAuth(false);
					setAuthMsg(result.json.message);
				}
			})
			.catch((e) => {
				setToken("");
				setIsAuth(false);
				setAuthMsg("Something went wrong!");
			})
			.finally(() => setLoading(false));
	};

	const createAccount = (data) => {
		console.log("creating account");
		setLoading(true);

		AuthAPI.createAccount(data)
			.then(async (result) => {
				console.log(result);
				if (result.httpStatusCode === 201) {
					await storeToken(result.json.token);
					setToken(result.json.token);
					setIsAuth(true);
					setAuthMsg("Successfully created account");
				} else {
					console.log("failed");
					setToken("");
					setIsAuth(false);
					setAuthMsg(result.json.message);
				}
			})
			.catch((e) => {
				console.log("failed with error", e);
				setToken("");
				setIsAuth(false);
				setAuthMsg("Something went wrong!");
			})
			.finally(() => {
				console.log("finish process");
				setLoading(false);
			});
	};

	const logout = () => {
		setLoading(true);
		removeToken()
			.then(() => {
				setToken("");
				setUserData();
				setIsAuth(false);
				setAuthMsg("You are now guest user");
			})
			.catch((e) => {
				setAuthMsg("Something went wrong!");
			})
			.finally(() => setLoading(false));
	};

	const retrieveUserDataByToken = () => {
		AuthAPI.getUserDataByToken(token)
			.then(async (result) => {
				if (result.httpStatusCode === 200) {
					setUserData(result.json);
				} else {
					setUserData();
					setAuthMsg(result.json.message);
				}
			})
			.catch((e) => {
				setUserData();
				setAuthMsg(e.message);
			});
	};

	const retrieveUserDataByProfileLink = (profileLink) => {
		AuthAPI.getUserDataByProfileLink(profileLink)
			.then(async (result) => {
				if (result.httpStatusCode === 200) {
					setVisitorData(result.json);
				} else {
					setVisitorData();
					// setAuthMsg(result.json.message);
				}
			})
			.catch((e) => {
				setVisitorData();
				// setAuthMsg(e.message);
			});
	};

	return (
		<AuthContext.Provider
			value={{
				isAuth,
				loading,
				token,
				userData,
				visitorData,
				authMsg,
				login,
				createAccount,
				logout,
				retrieveUserDataByToken,
				retrieveUserDataByProfileLink,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
