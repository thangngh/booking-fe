import { IRegister } from "@/types/auth.interface";

export default async function register(body: IRegister, callback: Function) {
	const response = await fetch("http://localhost:3001/api/auth/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	if (response.ok) {
		const data = await response.json();
		callback();
		return data;
	} else {
		throw new Error("Register failed");
	}
}