import { ILogin } from "@/types/auth.interface";

export default async function login(loginData: ILogin) {
	const response = await fetch("http://localhost:3001/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"accept": "application/json",

		},
		body: JSON.stringify(loginData),
	});

	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		throw new Error("Login failed");
	}
}