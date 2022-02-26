import react, { createContext, useContext, useState } from "react";

import AuthAPI from "../services/api/AuthAPI";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false);
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState("");
	const [msg, setMsg] = useState();

	const login = (data) => {
		setLoading(true);

		AuthAPI.login(data)
			.then((result) => {
				if (result.httpStatusCode === 201) {
					setIsAuth(true);
					setToken(result.json.token);
					setMsg("Successfully logged in");
				} else {
					setIsAuth(false);
					setToken("");
					setMsg(result.json.message);
				}
			})
			.catch((e) => {
				setIsAuth(false);
				setToken("");
				setMsg(e.message);
			})
			.finally(() => setLoading(false));

		// AuthAPI.login(data)
		// 	.then((result) => {
		// 		setIsAuth(true);
		// 		setToken(result);
		// 		console.log(result);
		// 	})
		// 	.catch((e) => {
		// 		setIsAuth(false);
		// 		console.log(e);
		// 	})
		// 	.finally(() => setLoading(false));
	};

	const createAccount = (data) => {
		setLoading(true);

		AuthAPI.createAccount(data)
			.then((result) => {
				if (result.httpStatusCode === 201) {
					setIsAuth(true);
					setToken(result.json.token);
					setMsg("Successfully logged in");
				} else {
					setIsAuth(false);
					setToken("");
					setMsg(result.json.message);
				}
			})
			.catch((e) => {
				setIsAuth(false);
				setToken("");
				setMsg(e.message);
			})
			.finally(() => setLoading(false));
	};

	return (
		<AuthContext.Provider
			value={{ isAuth, token, loading, msg, login, createAccount }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
