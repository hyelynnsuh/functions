
document.addEventListener('DOMContentLoaded', () => {
	const fullCapsule = document.getElementById('full-capsule')
	const topCapsule = document.getElementById('top-capsule')
	const bottomCapsule = document.getElementById('bottom-capsule')
	const crank = document.getElementById('crank')
	const modal = document.getElementById('modal-result')
	const modalContent = document.getElementById('modal-content')
	const cuisineInput = document.getElementById('cuisine')
	const spicyInput = document.getElementById('spicy')
	const typeInput = document.getElementById('type')

	// PLACEHOLDER STYLE LOGIC - modified from https://markus.oberlehner.net/blog/faking-a-placeholder-in-a-html-select-form-field?utm_source=chatgpt.com 
	// IDENTIFY SELECT
	const selects = document.querySelectorAll('select')
	selects.forEach(select => {
		// ADD CLASS OF PLACEHOLDER IF THE VALUE IS ""
		if (select.value === "") {
			select.classList.add('placeholder')
		}
		select.addEventListener('change', () => {
			if (select.value === "") {
				select.classList.add('placeholder')
			} else { 
				// ADD IN A SELECTED CLASS FOR USER AFFORDABILITY WHEN SOMETHING IS CHOSEN
				select.classList.remove('placeholder')
				select.classList.add('selected')
			}
		})
	})

	// FIND INFO FROM JSON FILE!!
	fetch ('meals.json')
		.then(response => response.json())
		.then (data => {
			crank.addEventListener('click', () => {
				// RESET CAPSULE
				fullCapsule.classList.remove('drop-in')
				fullCapsule.style.opacity = 0
				topCapsule.classList.remove('open')
				bottomCapsule.classList.remove('open')
				topCapsule.classList.add('hidden')
				bottomCapsule.classList.add('hidden')
				modal.classList.remove('show')
				modal.classList.add('hidden')

				// GET THE SELECTED VALUES
				const selectedCuisine = cuisineInput.value
				const selectedSpice = spicyInput.value
				const selectedType = typeInput.value.toLowerCase()

				let filteredMeals

				// IF ALL FILTERS ARE EMPTY -> SHOW FULLY RANDOM MEAL
				if(!selectedCuisine && !selectedSpice && !selectedType) {
					filteredMeals = data
				} else {
					// FILTER MEALS BASED ON SELECTED FILTERS
					filteredMeals = data.filter(meal =>
						meal.Cuisine.toLowerCase().includes(selectedCuisine) && meal.Spicy === selectedSpice && meal.Type.toLowerCase().includes(selectedType)
					)
				}
				

				// DROP FULL CAPSULE - learned from https://medium.com/@syedfahim300701/using-settimeout-in-js-fa50da74d787#:~:text=setTimeout()%20is%20a%20useful,behavior%20to%20your%20JavaScript%20applications. 
				setTimeout(() => {
					fullCapsule.classList.add('drop-in')
					fullCapsule.style.opacity = 1
				}, 200)

				// SPLIT THE CAPSULE
				setTimeout(() => {
					fullCapsule.style.opacity = 0
					fullCapsule.classList.remove('drop-in')
					topCapsule.classList.remove('hidden')
					bottomCapsule.classList.remove('hidden')
					topCapsule.classList.add('open')
					bottomCapsule.classList.add('open')
				}, 1200)

				// SHOW RESULT
				setTimeout(() => {
					if (filteredMeals.length > 0) {
						const randomMeal = filteredMeals[Math.floor(Math.random() * filteredMeals.length)]
						modalContent.innerHTML = `
						<button class="close-btn" id="close-modal">\u2715</button> <h3>You Should Eat:</h3>
						<p class="modal-info">${randomMeal.name}</p>
						<p>cuisine: ${randomMeal.Cuisine}</p>
						<p>price range: ${randomMeal.Price}</p>
						<div class="restaurant"><a href="${randomMeal.Link}" target="_blank">Restaurants Near You</a></p>
						`
					} else {
						modalContent.innerHTML = `
						<button class="close-btn" id="close-modal">\u2715</button>
						<h3> No Meals Found.</h3>
						<p>Try again!</p>
						`
					}
					// MODAL APPEAR ANIMATION
					modal.classList.remove('hidden')
					setTimeout(() => modal.classList.add('show'), 100)
				}, 2000)
			})

			// CLOSE MODAL
			document.addEventListener('click', (e) => {
				if (e.target.id === 'close-modal') {
					modal.classList.remove('show')
					setTimeout(() => modal.classList.add('hidden'), 300)

					// REMOVE THE CAPSULES AFTER CLOSING MODAL
					topCapsule.classList.remove('open')
					bottomCapsule.classList.remove('open')
					topCapsule.classList.add('hidden')
					bottomCapsule.classList.add('hidden')
				}
			})
		})

	
})
