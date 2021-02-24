const url = "https://ltrq36z7g9.execute-api.sa-east-1.amazonaws.com/prod";

function recipe(lang, r, fav) {
	const by = lang == "en" ? "By" : "Por";
	const on = lang == "en" ? "In" : "Em";
	const suffix = lang == "en" ? "" : "-pt";
	return `<li class="list">
		<div>
			<img class="list" src="${r.Picture}"/>
			<a href="recipe${suffix}.html?data=${encodeURI(JSON.stringify(r))}">${
				r.Title
			}</a>
			<div>
			${by}: ${r.Author}
			</div>
			<div>
			${on}: ${r.Category}
			</div>
		</div>
		<button id="${r.Title}" class="fav" onclick="toggleFav('${r.Title}','${encodeURI(JSON.stringify(r))}')">
			${fav === true ? "♥️" : "🤍" }
		</button>
	</li>`;
}

function toggleFav(title, r) {
	if (localStorage.getItem(title)) {
		localStorage.removeItem(title);
		let button = document.getElementById(title);
		button.innerText = "🤍";
	} else {
		localStorage.setItem(title, r);
		button.innerText = "♥️";
	}
}

function getFavorites(lang) {
	let list = document.getElementById("favorites-list");
	for (let i = 0; i < localStorage.length; i++) {
		const r = localStorage.getItem(localStorage.key(i));
		list.innerHTML += recipe(lang, JSON.parse(decodeURI(r)), true);		
	}
}

function getMostSeen(lang) {
	let list = document.getElementById("list");
	
	fetch(url + "?locale=" + lang + "&mostvisited")
	.then((res) => res.json())
	.then((r) => {
		const isFav = localStorage.getItem(r.Title) === null;
		list.innerHTML = r.map((r) => recipe(lang, r, isFav)).join("\n")
	});
}

function searchTerm(lang) {
	// Check search type
	const radioButtons = document.getElementsByName("type");
	const type = radioButtons[0].checked ? "ingredients" : "name";

	let list = document.getElementById("list");
	list.innerHTML = "";

	const term = document.getElementById("search").value;
	console.log(`searching ${type} ${term}`);
	fetch(`${url}?locale=${lang}&${type}=${term}`)
		.then((res) => res.json())
		.then((r) => (list.innerHTML = r.map((r) => recipe(lang, r)).join("\n")));
	return true;
}

// For testing
// const r = [
//   {
//     URL:
//       "https://www.bbc.co.uk/food/recipes/1_creamy_chicken_pasta_24218",
//     Category: "Recipes",
//     Picture:
//       "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/1_creamy_chicken_pasta_24218_16x9.jpg",
//     Title: "Creamy chicken pasta",
//     Language: "en",
//     Author: "Rachel Phipps",
//     Source: "BBC",
//     Ingredients: [
//       "180g/6oz pasta",
//       "150g/5½oz leftover roast chicken, shred into bite-sized pieces",
//       "1 tbsp plain flour",
//       "large knob of butter",
//       "8 large chestnut mushrooms, peeled and sliced",
//       "½ bunch spring onions, roughly chopped",
//       "generous splash dry white wine (optional)",
//       "1½ tbsp single cream",
//       "salt and freshly ground black pepper",
//     ],
//     Instructions: [
//       "Cook the pasta in a pan of boiling salted water over a high heat until just tender.",
//       "Meanwhile, make the sauce. Toss together the chicken, flour and a generous amount of salt and pepper until the chicken is well coated.",
//       "Heat the butter in a very large frying pan over a medium–high heat. When it is frothing, add the mushrooms and spring onions and fry for 5 minutes, or until tender and the onions are slightly golden.",
//       "Reduce the heat to medium and add the chicken. Stir until everything is combined and then add the wine, if using (use stock if not, as the sauce will lack flavour if you just use water). Allow to bubble and turn the heat down to low. When the chicken is cooked through and hot, stir in the single cream and season to taste.",
//       "Drain the pasta, reserving 6–8 tablespoons of the pasta water.",
//       "Stir the pasta into the sauce, adding the pasta water a tablespoon at a time until the sauce has reached your preferred consistency. Serve immediately.",
//     ],
//     Notes: [],
//     Visits: 0,
//   },
//   {
//     URL: "https://www.bbc.co.uk/food/recipes/amarettibistcuits_67183",
//     Category: "Recipes",
//     Picture:
//       "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/amarettibistcuits_67183_16x9.jpg",
//     Title: "Amaretti biscuits",
//     Language: "en",
//     Author: "Gino D'Acampo",
//     Source: "BBC",
//     Ingredients: [
//       "4 eggs, whites only (160g/6oz)",
//       "340g/12oz caster sugar",
//       "340g/12oz ground almonds",
//       "30ml/1fl oz amaretto liqueur",
//       "butter, for greasing",
//     ],
//     Instructions: [
//       "Preheat the oven to 170C/325F/Gas 3.",
//       "In a large bowl beat the egg whites until firm. Mix the sugar and the almonds gently into it. Add the amaretto liquor and fold in gently until you have a smooth paste.",
//       "Place some baking paper on a baking tray and lightly brush with butter. Using a teaspoon place small heaps of the mixture approximately 2cm/¾in apart, as they will expand while cooking. Bake for approximately 15 minutes until golden brown. Leave to cool slightly then serve or store in an air-tight container.",
//     ],
//     Notes: [],
//     Visits: 0,
//   },
//   {
//     URL: "https://www.bbc.co.uk/food/recipes/all-in-one_rib_roast_75464",
//     Category: "Recipes",
//     Picture:
//       "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/all-in-one_rib_roast_75464_16x9.jpg",
//     Title: "Nigel Slater's all-in-one roast beef rib",
//     Language: "en",
//     Author: "Nigel Slater",
//     Source: "BBC",
//     Ingredients: [
//       "2kg/4lb 8oz Maris Piper potatoes, sliced into thirds",
//       "600g/1lb 5oz beef dripping",
//       "3 tbsp grated fresh horseradish",
//       "2 tbsp black peppercorns",
//       "2 tbsp sea salt",
//       "3.5kg/7lb 11oz rib of beef",
//       "8 large carrots, chopped into 3",
//       "8 large parsnips, sliced into thirds lengthways",
//     ],
//     Instructions: [
//       "Preheat the oven to 220C/425F/Gas 7.",
//       "Boil the peeled and sliced potatoes in a large pan of salted water until soft to the point of a knife.",
//       "Drain the potatoes and shake in a colander so that the edges fluff up.",
//       "In a saucepan, melt the dripping with the horseradish, salt and pepper.",
//       "Score the beef all over with a sharp knife.",
//       "Layer all the chopped vegetables in a large oven tray and place the beef on top. Tip the potatoes into another tray.",
//       "Ladle most of the horseradish glaze over the top of the vegetables and meat (reserving some for the potatoes). Roast the meat in the oven for 20 minutes then reduce the temperature to 160C/325F/Gas 3 and baste the meat with the dripping.",
//       "Pour the remaining horseradish glaze over the potatoes and place them in the oven to cook for the duration of the beef cooking time.",
//       "Roast the meat for two hours,basting it with the dripping every half hour.",
//       "Allow the meat to rest under foil for 30 minutes before serving. If necessary, you could turn up the oven to crisp the potatoes while the meat is resting.",
//     ],
//     Notes: [],
//     Visits: 0,
//   },
//   {
//     URL: "https://www.bbc.co.uk/food/recipes/americanbakedcheesec_8358",
//     Category: "Recipes",
//     Picture:
//       "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/americanbakedcheesec_8358_16x9.jpg",
	//     Title: "American baked cheesecake",
//     Language: "en",
//     Author: "James Martin",
	//     Source: "BBC",
	//     Ingredients: [
	//       "25cm/10in sponge (cut from a large bought flan case)",
	//       "200g/7oz caster sugar",
	//       "finely grated zest of 3 lemons",
//       "4 tbsp cornflour",
	//       "3 tbsp sultanas, soaked in a bit of bourbon",
	//       "845g/29¾oz full fat soft cream cheese",
	//       "3 medium eggs",
	//       "7.5ml/1½ tsp vanilla essence",
	//       "1 vanilla pod",
	//       "Jack Daniels to taste or bourbon (optional)",
	//       "375ml/12½fl oz double or single cream",
	//       "10 small bananas",
	//       "25g/1oz butter",
	//       "2 tbsp sugar",
//       "caramel sauce or maple syrup",
	//       "sprig of mint or basil",
	//     ],
	//     Instructions: [
	//       "Preheat the oven to 180C/350F/Gas 4. Butter a 25cm/10in loose-bottomed cake tin.",
	//       "Cut the sponge horizontally into 2 discs. Use one to line a buttered cake tin.",
	//       "In a bowl mix together the sugar, lemon zest, cornflour and sultanas using a wooden spoon, then beat in the cream cheese. Add the eggs one by one, also add the vanilla essence, beating constantly until all the eggs are well incorporated.",
	//       "Slice open the vanilla pod, remove the seeds with a sharp knife and place the seeds into the cream mixture, add a splash of bourbon (about 4 tbsp), if using, and mix everything together well. Add the cream and beat well until the mixture is smooth. Pour gently over the sponge base in the cake tin.",
	//       "Sit the tin in a baking tray filled with 2-3mm of warm water to help create steam during cooking. Place into the preheated oven and bake for 50 minutes until the top is golden. Remove from the oven and leave to cool and set completely before removing from the tin.",
	//       "Just before serving, peel the bananas and pan fry in the butter and sugar until brown and slightly caramelised.",
	//       "Serve, cut into wedges, with the bananas and a drizzle of caramel sauce or maple syrup.",
//     ],
//     Notes: [],
	//     Visits: 0,
	//   },
//   {
//     URL:
	//       "https://www.bbc.co.uk/food/recipes/ajitsuke_tamago_japanese_65686",
	//     Category: "Recipes",
	//     Picture: "https://ichef.bbci.co.uk/images/ic/832xn/p01t7ptb.jpg",
//     Title: "Ajitsuke tamago (Japanese pickled eggs)",
	//     Language: "en",
	//     Author: "The Hairy Bikers",
	//     Source: "BBC",
	//     Ingredients: [
	//       "6 large free-range eggs",
	//       "100ml/3½fl oz light soy sauce",
//       "100ml/3½fl oz mirin",
	//       "100ml/3½fl oz sake",
	//       "6 tbsp caster sugar",
	//     ],
	//     Instructions: [
	//       "Three-quarters fill a medium saucepan with water and bring to the boil. Once boiling, carefully add the eggs to the pan and boil for exactly six minutes. Use a timer as the eggs want to be just perfect with a lovely runny yolk.",
	//       "Once cooked, transfer to a bowl of iced-cold water and carefully peel. Be aware that the eggs are still runny and that you need to handle with care. Add the remaining ingredients, including 100ml/3½fl oz water to another saucepan, gently bring to a simmer and cook until the sugar is dissolved. Remove from the heat and leave to cool.",
	//       "Place the eggs in a small container that will fit neatly as you want the liquid to nearly cover the eggs. Pour in the cold marinade and place a small piece of muslin or a jay cloth over the eggs - this helps to make sure the eggs get an even coating of the marinade as the liquid will soak in to the material as well as weighing the eggs down in the liquid.",
//       "Marinate for at least 12 hours, but ideally 24.",
//     ],
	//     Notes: [],
	//     Visits: 0,
//   },
// ];
// list.innerHTML = r.map((r) => recipe(r)).join("\n");

