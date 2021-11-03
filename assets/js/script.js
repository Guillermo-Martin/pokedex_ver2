import { gsap } from './../../node_modules/gsap/index.js';

// greensock animations
let pokemonImgAnimation = gsap.from("#pokemonImg", { scale: 10, duration: 0.3, paused: true });
let basicInfoAnimation = gsap.timeline();

// target search button and add an event listener
let $searchBtn = document.getElementById("searchBtn");
$searchBtn.addEventListener("click", async function(event){
  event.preventDefault();

  // 1.  get the value of the input (target the searchInput)
  let $searchInput = document.getElementById("searchInput");

  // 2.  convert the input to all lowercase and save to variable
  let searchPokemon = $searchInput.value.toLowerCase();
  
  // when clicked, make an API call to the PokeAPI - "pokemon" endpoint
  // 3.  add the searchInput to the url to make an API call to the PokeAPI, get the response...
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`);

  // 4.  ...then extract data from the response...
  let data = await response.json();

  // ...do something with the data
  console.log("your data", data);

  // 5. make an API call to "pokemon-species" endpoint and extract data from the response
  let speciesRes = await fetch(data.species.url);
  let speciesData = await speciesRes.json();

  // console.log(speciesData.genera[7].genus)

  // 6.  ===== change the id =====
  // target the h2, change text to be the id
  let $h2 = document.getElementById("pokemonId");
  $h2.textContent = data.id;

  // 7.  ===== change the name =====
  // target the h3, change text to be the name
  let $h3 = document.getElementById("pokemonName");
  $h3.textContent = data.name;

  // 8.  ===== change the genus =====
  // target the h3, change text to be the genus
  let $h3Genus = document.getElementById("pokemonGenus");
  $h3Genus.textContent = speciesData.genera[7].genus;

  // 9.  ===== change info =====
  // target the li's, change text to be the stats
  let $liType = document.getElementById("pokemonType");
  let $liHeight = document.getElementById("pokemonHeight");
  let $liWeight = document.getElementById("pokemonWeight");
  $liType.textContent = "Type: " + data.types[0].type.name;
  $liHeight.textContent = "Height: " + data.height // in decimeters
  $liWeight.textContent = "Weight: " + data.weight // in hectograms

  // 10.  ===== change picture of pokemon =====
  // target the img tag, change src to be "front default sprite"; change alt to be name
  let $pokemonImg = document.getElementById("pokemonImg");
  $pokemonImg.setAttribute("src", data.sprites.front_default);
  $pokemonImg.setAttribute("alt", data.name);

  // ===== animations =====
  // when the pokemon image pops up, animate it
  pokemonImgAnimation.restart();

  // animate the ID and name
  basicInfoAnimation
    .from("#pokemonImg", { scale: 10, duration: 0.3, paused: true })
    .from("#pokemon-basic-info span", {opacity: 0, duration:0.3}, "+=0.5")
    .from("#pokemonGenus", {opacity: 0, duration:0.3}, "+=0.1")
    .from("#pokemonDesc", {opacity: 0, duration:0.3}, "+=0.1")
    .from("ul li", {opacity: 0, duration:0.3}, "+=0.1")

  // 11. ===== change description of pokemon =====
  // target the description tag, change text to be flavor text
  let $pokemonDesc = document.getElementById("pokemonDesc");
  $pokemonDesc.textContent = speciesData.flavor_text_entries[1].flavor_text;
});
