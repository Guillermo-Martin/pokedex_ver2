// target search button
let $searchBtn = document.getElementById("searchBtn");
// add event listener to button
$searchBtn.addEventListener("click", async function(){
  // when clicked, make an API call to the PokeAPI - "pokemon" endpoint
  // get the response...
  let response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");

  // ...then extract data from the response...
  let data = await response.json();

  console.log("your data", data);

  // ...do something with the data
  // make an API call to "pokemon-species" endpoint
  let speciesRes = await fetch(data.species.url);

  // ...extract data from the response...
  let speciesData = await speciesRes.json();

  // console.log(speciesData.genera[7].genus)

  // ===== change the id =====
  // target the h4 for id
  let $h2 = document.getElementById("pokemonId");
  // change the text to be the id
  $h2.textContent = data.id;

  // ===== change the name =====
  // target the h3 for name
  let $h3 = document.getElementById("pokemonName");
  // change the text content to be the name
  $h3.textContent = data.name;

  // ===== change the genus =====
  // target the h3 for genus
  let $h3Genus = document.getElementById("pokemonGenus");
  // change the text content to be the genus
  $h3Genus.textContent = speciesData.genera[7].genus;

  //  ===== create a ul to hold select info =====
  let $ul = document.createElement("ul");
  // create an li for type, height, weight, and description
  let $typeLi = document.createElement("li");
  let $heightLi = document.createElement("li");
  let $weightLi = document.createElement("li");
  let $descLi = document.createElement("li");
  // add text to the li's

  $typeLi.textContent = data.types[0].type.name;
  $heightLi.textContent = "Height: " + data.height; // in decimeters
  $weightLi.textContent = "Weight: " + data.weight; // in hectograms
  
  // append all li's to ul
  $ul.appendChild($typeLi);
  $ul.appendChild($heightLi);
  $ul.appendChild($weightLi);
  
  // append ul with everything to displayDiv
  // target displayDiv
  let $displayDiv = document.getElementById("displayDiv");
  // append $ul to $displayDiv
  $displayDiv.appendChild($ul);

  
  // ===== change picture of pokemon =====
  // target the img tag
  let $pokemonImg = document.getElementById("pokemonImg");
  // change the src attribute to be the "front default sprite"
  $pokemonImg.setAttribute("src", data.sprites.front_default);
  // change the alt attribute to be the pokemon name
  $pokemonImg.setAttribute("alt", data.name);

  // ===== change description of pokemon =====
  // target the description tag
  let $pokemonDesc = document.getElementById("pokemonDesc");

  // change its text to be the flavor text
  $pokemonDesc.textContent = speciesData.flavor_text_entries[1].flavor_text;
});


