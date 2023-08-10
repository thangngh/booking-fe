export default async function getProfile(accessToken: string) {

	const response = await fetch("http://localhost:3001/api/user/profile", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		throw new Error("Login failed");
	}
}