
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

				// FILTER MEALS BASED OFF CUISINE SELECTION ^^
				const filteredMeals = data.filter(meal => 
					meal.Cuisine.toLowerCase() === selectedCuisine.toLowerCase()
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


// async function loadMeals() {
// 	try{
// 		const response = await fetch('meals.json')
// 		return await response.json()
// 	} catch (error) {
// 		console.error("Error loading the meals", error)
// 		return[]
// 	}
// }

// const updateForm = (params) => {
// 	params = new URLSearchParams(params)
// 	params.forEach((value, key) => {
// 		let inputOrSelect = document.getElementById(key)
// 		if (inputOrSelect) { 
// 			inputOrSelect.value = value
// 		}
// 	})
// }

// const storeParams = () => {
// 	let formParams = new FormData (formElement)
// 	formParams.forEach((value, key) => {
// 		localStorage.setItem(key, value)
// 	})
// }

// const updateUrlParams = () => {
// 	let formParams = new URLSearchParams(new FormData(formElement)).toString()
// 	window.history.replaceState(null, null, '?' + formParams)
// 	storeParams()
// }

// formElement.onsubmit = async (event) => {
// 	event.preventDefault()
// 	const meals = await loadMeals()
// 	const cuisine = document.getElementById('cuisine').value
// 	const filteredMeals = meals.filter(m => m.cuisine.toLowerCase() === cuisine)

// 	if (filteredMeals.length > 0) {
// 		const randomMeal = filteredMeals[Math.floor(Math.random() * filteredMeals.length)]
// 		document.getElementById('result').innerHTML = `How about <a href='${randomMeal.link}' target= '_blank'>${randomMeal.name} at ${randomMeal.restaurant}</a>?`
// 	} else { 
// 		document.getElementById('result').innerHTML = "Sorry, no meal found!"
// 	}
// }

// formElement.oninput = () => updateUrlParams()

// if (window.location.search) {
// 	updateForm(window.location.search)
// } else if (localStorage.length > 0) {
// 	let storedParams = new URLSearchParams()
// 	Object.keys(localStorage).forEach(key => {
// 		storedParams.set(key, localStorage.getItem(key))
// 	})
// 	updateForm(storedParams.toString())
// }