const API_HOST = "https://penguin-simple-profile.herokuapp.com/api";

const main = {
	get,
	post,
};

const headers = {
	Accept: "application/json",
	"Content-Type": "application/json",
};

async function post(path, json, isRequiredAuthToken = false, token = "") {
	let postHeaders = headers;

	isRequiredAuthToken &&
		token &&
		(postHeaders["Authorization"] = `Bearer ${token}`);

	return await fetch(`${API_HOST}${path}`, {
		method: "POST",
		headers: postHeaders,
		body: json,
	});
}

async function get(path, isRequiredAuthToken = false, token = "") {
	let getHeaders = headers;

	isRequiredAuthToken &&
		token &&
		(getHeaders["Authorization"] = `Bearer ${token}`);

	return await fetch(`${API_HOST}${path}`, {
		method: "GET",
		headers: getHeaders,
	});
}

export default main;
