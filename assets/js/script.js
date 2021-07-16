// target search button
let $searchBtn = document.getElementById("searchBtn");
// add event listener to button
$searchBtn.addEventListener("click", async function(){
  // when clicked, make an API call to the PokeAPI - "pokemon" endpoint
  // get the response...
  let response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");

  // ...then extract data from the response...
  let data = await response.json();

  // ...do something with the data
  // make an API call to "pokemon-species" endpoint
  let speciesRes = await fetch(data.species.url);

  // ...extract data from the response...
  let speciesData = await speciesRes.json();

  // 1.  ===== change the name =====
  // target the h3 for name
  let $h3 = document.getElementById("pokemonName");
  // change the text content to be the name
  $h3.textContent = data.name;

  // 2.  ===== change picture of pokemon =====
  // target the img tag
  let $pokemonImg = document.getElementById("pokemonImg");
  // change the src attribute to be the "front default sprite"
  $pokemonImg.setAttribute("src", data.sprites.front_default);
  // change the alt attribute to be the pokemon name
  $pokemonImg.setAttribute("alt", data.name);

  // 3.  ===== change description of pokemon =====
  // target the description tag
  let $pokemonDesc = document.getElementById("pokemonDesc");

  // change its text to be the flavor text
  $pokemonDesc.textContent = speciesData.flavor_text_entries[1].flavor_text;
});


