import MainAPI from "./MainAPI";

const login = async (data) => {
	var json = data;
	// var errorMsg = "";

	if (typeof json === "object") {
		json = JSON.stringify(json);
	}

	const response = await MainAPI.post("/login", json);

	console.log(response);

	if (response.ok) {
		const result = await response.json();

		return result.token;
		// return { success: true, token: result.token };
	} else {
		switch (response.status) {
			case 403:
				// errorMsg = "Username or password is incorrect";
				throw new Error("Username or password is incorrect");

			case 422:
				// errorMsg = "Please enter email and password";
				throw new Error("Please enter email and password");

			case 500:
				// errorMsg = "Something went wrong";
				throw new Error("Something went wrong");

			default:
				// errorMsg = "Something went wrong";
				throw new Error("Something went wrong");
		}
	}

	// return { success: false, message: errorMsg };
};

export default AuthAPI = {
	login,
};
