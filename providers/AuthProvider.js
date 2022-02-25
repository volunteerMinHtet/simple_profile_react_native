import react, { createContext, useContext, useState } from "react";

import AuthAPI from "../services/ApiService/AuthAPI";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false);
	const [token, setToken] = useState("");
	const [loading, setLoading] = useState(false);

	const login = (data) => {
		setLoading(true);

		AuthAPI.login(data)
			.then((result) => {
				setIsAuth(true);
				setToken(result);
				console.log(result);
			})
			.catch((e) => {
				setIsAuth(false);
				console.log(e);
			})
			.finally(() => setLoading(false));
	};

	return (
		<AuthContext.Provider value={{ isAuth, token, loading, login }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
