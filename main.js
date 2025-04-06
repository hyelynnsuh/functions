
document.addEventListener('DOMContentLoaded', () => {
	const gumballButton = document.getElementById('gumball-button')
	const capsule = document.getElementById('capsule')
	const capsuleTop = document.getElementById('capsule-top')
	const capsuleBottom = document.getElementById('capsule-bottom')
	const cuisineInput = document.getElementById('cuisine')
	const spicyInput = document.getElementById('spicy')
	const typeInput = document.getElementById('type')
	const crank = document.getElementById('crank')
	const modal = document.getElementById('modal-result')
	const modalContent = document.getElementById('modal-content')
	const capsuleColors = ['red', 'blue', 'green', 'pink']

	fetch ('meals.json')
		.then(response => response.json())
		.then(data => {
			gumballButton.addEventListener('click', () => {
				// GET SELECTED CUISINE
				const selectedCuisine = cuisineInput.value

				// GET SPICY
				const selectedSpice = spicyInput.value

				// GET TYPE
				const selectedType = typeInput.value.toLowerCase()

				// CRANK ANIMATION
				crank.classList.add('spin')
				setTimeout(() => crank.classList.remove('spin'), 400)

				// FILTER MEALS BASED OFF CUISINE SELECTION 
				const filteredMeals = data.filter(meal => 
					meal.Cuisine.toLowerCase().includes(selectedCuisine) && meal.Spicy === selectedSpice && meal.Type.toLowerCase().includes(selectedType)
				)

				// RESET CAPSULE 
				capsule.style.display = 'none'
				capsule.classList.remove('open')
				capsuleTop.className = 'capsule-top'
				capsuleBottom.className = 'capsule-bottom'
				modal.classList.remove('show')
				modal.classList.add('hidden')


				// SHOW RESULT
				setTimeout(() => {
					if (filteredMeals.length > 0){
						const randomMeal = filteredMeals[Math.floor(Math.random() * filteredMeals.length)]
						const randomColor = capsuleColors[Math.floor(Math.random() * capsuleColors.length)]
	
						capsuleTop.classList.add(randomColor)
						capsuleBottom.classList.add(randomColor)
						capsule.classList.add('open')
						capsule.style.display = 'block'
	
						modalContent.innerHTML = `
						<button class="close-btn" id="close-modal">\u2715</button>
						<h3>You Should Eat:</h3>
						<p>${randomMeal.name}</p>
						<p>cuisine: ${randomMeal.Cuisine}</p>
						<p>price range: ${randomMeal.Price}</p>
						<p><a href="${randomMeal.Link}" target="_blank">Restaurants Near You</a></p>
						`
	
						// paperSlip.classList.remove('hidden')
						setTimeout(() => {
							modal.classList.remove('hidden')
							setTimeout(() => modal.classList.add('show'), 100)
						}, 800)
	
					} else {
						capsule.style.display = 'block'
						capsule.classList.add('open')
						modalContent.innerHTML = `
						<p>No meals found. Please try again.</p>
						`
						// modal.classList.remove('hidden')
						setTimeout(() => {
							modal.classList.remove('hidden')
							setTimeout(() => modal.classList.add('show'), 100)
						}, 800)	
					}
				}, 500)
				
			})

			// MODAL CLOSE BUTTON
			document.addEventListener('click', (e) => {
				if (e.target.id === 'close-modal') {
					modal.classList.remove('show')
					setTimeout(() => modal.classList.add('hidden'), 300)
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