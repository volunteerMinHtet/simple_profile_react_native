import MainAPI from "./MainAPI";

const login = async (data) => {
	var json = data;

	if (typeof json === "object") {
		json = JSON.stringify(json);
	}

	try {
		const response = await MainAPI.post("/login", json);
		const result = await response.json();

		return { httpStatusCode: response.status, json: result };
	} catch (e) {
		// return { message: "Something went wrong!" };
		return {
			httpStatusCode: 500,
			json: { message: "Something went wrong!" },
		};
	}
};

const createAccount = async (data) => {
	var json = data;

	if (typeof json === "object") {
		json = JSON.stringify(json);
	}

	try {
		const response = await MainAPI.post("/create-account", json);
		const result = await response.json();

		return { httpStatusCode: response.status, json: result };
	} catch (e) {
		// return { message: "Something went wrong!" };
		return {
			httpStatusCode: 500,
			json: { message: "Something went wrong!" },
		};
	}
};

const getUserDataByToken = async (token) => {
	try {
		const response = await MainAPI.get("/user", true, token);
		const result = await response.json();

		return { httpStatusCode: response.status, json: result };
	} catch (e) {
		// return { message: "Something went wrong!" };
		return {
			httpStatusCode: 500,
			json: { message: "Something went wrong!" },
		};
	}
};

const getUserDataByProfileLink = async (profileLink) => {
	try {
		const response = await MainAPI.get(`/users/${profileLink}`);
		const result = await response.json();

		return { httpStatusCode: response.status, json: result };
	} catch (e) {
		// return { message: "Something went wrong!" };
		return {
			httpStatusCode: 500,
			json: { message: "Something went wrong!" },
		};
	}
};

export default AuthAPI = {
	login,
	createAccount,
	getUserDataByToken,
	getUserDataByProfileLink,
};
