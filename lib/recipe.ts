import { ICreateStepRecipe } from "@/types/recipe.interface";

export async function getRecipe(accessToken: string) {
	const response = await fetch("http://localhost:3001/api/user/owner-recipe", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
	});

	const recipe = await response.json();

	return recipe;
}

export async function getOneRecipe(id: number) {
	const response = await fetch(`http://localhost:3001/api/recipe/find-one/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const recipe = await response.json();

	return recipe;
}

export async function createStepRecipe(body: ICreateStepRecipe, file: File) {
	const { recipeId, stepId, description } = body;
	if (!file) return null;
	const formData = new FormData()
	formData.append('image', file)
	formData.append('stepId', stepId)
	formData.append('description', description)
	const response = await fetch(`http://localhost:3001/api/step-recipe/create-step-recipe/${recipeId}`, {
		method: "POST",
		body: formData
	});

	const recipe = await response.json();

	return recipe;
}