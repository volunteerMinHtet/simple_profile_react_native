const API_HOST = "https://penguin-simple-profile.herokuapp.com/api";

const main = {
	post,
};

export default main;

async function post(path, json, isRequiredAuthToken = false, token = "") {
	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
	};

	isRequiredAuthToken &&
		token &&
		(headers["Authorization"] = `Bearer ${token}`);

	return await fetch(`${API_HOST}${path}`, {
		method: "POST",
		headers,
		body: json,
	});
}
