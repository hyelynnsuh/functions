
document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('meal-form')
	const resultDiv = document.getElementById('result')

	fetch ('meals.json')
		.then(response => response.json())
		.then(data => {
			// FORM ENTERING
			form.addEventListener('submit', (e) => {
				e.preventDefault()

				// GET SELECTED CUISINE
				const selectedCuisine = document.getElementById('cuisine').value

				// GET SPICY
				const selectedSpice = document.getElementById('spicy').value

				// GET TYPE
				const selectedType = document.getElementById('type').value.toLowerCase()

				// FILTER MEALS BASED OFF CUISINE SELECTION 
				const filteredMeals = data.filter(meal => 
					meal.Cuisine.toLowerCase() === selectedCuisine && meal.Spicy === selectedSpice && meal.Type.toLowerCase() === selectedType
				)


				// SHOW RESULT
				if (filteredMeals.length > 0){
					const randomMeal = filteredMeals[Math.floor(Math.random() * filteredMeals.length)]
					resultDiv.innerHTML = `
					<h3>You Should Eat:</h3>
					<p>${randomMeal.name}</p>
					<p>cuisine: ${randomMeal.Cuisine}</p>
					<p>price range: ${randomMeal.Price}</p>
					<p><a href="${randomMeal.Link}" target="_blank">Restaurants Near You</a></p>
					`
				} else {
					resultDiv.innerHTML = `
					<p>No meals found. Please try again.</p>
					`
				}
			})
		})
		.catch(error => {
			console.error('Error loading the JSON data:', error)
			resultDiv.innerHTML = `
			<p>failed to load meal data. please try again later.<p>
			`
		})
	
})