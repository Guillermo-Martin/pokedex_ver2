import { gsap } from './../../node_modules/gsap/index.js';

// greensock animations
let pokemonImgAnimation = gsap.fromTo("#pokemonImg", { rotationY: 90 }, { rotationY: 0, duration: 0.4, paused: true });
let basicInfoAnimation = gsap.timeline();

// target search button
let $searchBtn = document.getElementById("searchBtn");
// add event listener to button
$searchBtn.addEventListener("click", async function(event){
  event.preventDefault();

  // 1.  get the value of the input (target the searchInput)
  let $searchInput = document.getElementById("searchInput");

  // 2.  convert the input to all lowercase and save to variable, add to url
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
  // target the h4 for id
  let $h2 = document.getElementById("pokemonId");
  // change the text to be the id
  $h2.textContent = data.id;

  // 7.  ===== change the name =====
  // target the h3 for name
  let $h3 = document.getElementById("pokemonName");
  // change the text content to be the name
  $h3.textContent = data.name;

  // 8.  ===== change the genus =====
  // target the h3 for genus
  let $h3Genus = document.getElementById("pokemonGenus");
  // change the text content to be the genus
  $h3Genus.textContent = speciesData.genera[7].genus;

  // 9.  ===== change info =====
  // target the li's
  let $liType = document.getElementById("pokemonType");
  let $liHeight = document.getElementById("pokemonHeight");
  let $liWeight = document.getElementById("pokemonWeight");
  // change their text
  $liType.textContent = data.types[0].type.name;
  $liHeight.textContent = data.height // in decimeters
  $liWeight.textContent = data.weight // in hectograms

  // 10.  ===== change picture of pokemon =====
  // target the img tag
  let $pokemonImg = document.getElementById("pokemonImg");
  // change the src attribute to be the "front default sprite"
  $pokemonImg.setAttribute("src", data.sprites.front_default);
  // change the alt attribute to be the pokemon name
  $pokemonImg.setAttribute("alt", data.name);

  // when the pokemon image pops up, animate it
  pokemonImgAnimation.restart();

  // animate the ID and name
  basicInfoAnimation
    .from("#pokemon-basic-info span", {opacity: 0, stagger:0.5, duration:1})
    .from("#pokemonGenus", {opacity: 0, duration:1})
    .from("#pokemonDesc", {opacity: 0, duration:1})
    .from("ul li", {opacity: 0, stagger:0.5, duration:1})

  // 11. ===== change description of pokemon =====
  // target the description tag
  let $pokemonDesc = document.getElementById("pokemonDesc");
  // change its text to be the flavor text
  $pokemonDesc.textContent = speciesData.flavor_text_entries[1].flavor_text;
});
