console.log("connected!");
var tl = gsap.timeline();

// ---------- Variables ----------
let capitalName = "";
let typeColors = {
  normal: '#a8a77a',
	fire: '#ee8130',
	water: '#6390f0',
	electric: '#f7d02c',
	grass: '#7ac74c',
	ice: '#96d9d6',
	fighting: '#c22e28',
	poison: '#a33ea1',
	ground: '#e2bf65',
	flying: '#a98ff3',
	psychic: '#f95587',
	bug: '#a6b91a',
	rock: '#b6a136',
	ghost: '#735797',
	dragon: '#6f35fc',
	dark: '#705746',
	steel: '#b7b7ce',
	fairy: '#d685ad',
}

// ---------- Elements to create for displaying info ----------
let normPokemonImg = document.createElement("img");
let shinyPokemonImg = document.createElement("img");
let textContainer = document.createElement("div");
let pokemonName = document.createElement("h2");
let pokemonType = document.createElement("p");
let pokemonFlavorText = document.createElement("p");

// ---------- Other elements ----------
let searchLabel = document.getElementById("search-label");
let typeColor1 = document.querySelector(".type-color-1");
let typeColor2 = document.querySelector(".type-color-2");

// ---------- Functions ----------
// add the rest of letters 
let capitalize = (string) => {
  // 1. capitalize the first letter of the string
  capitalName = string[0].toUpperCase();

  // 2. loop through the rest of the string and add it to the capitalized name
  for(let i = 1; i < string.length; i++) {
    capitalName = capitalName + string[i];
  }

  return capitalName;
}

// ---------- Form functionality ----------
// target the form
let form = document.getElementById("form");

// on submit, get the value of the input box, make an API request
form.addEventListener("submit", async (event) => {
  // prevent form default behavior
  event.preventDefault();

  // get input value (API direct link uses lowercase letters)
  let searchInput = document.getElementById("searchInput").value.toLowerCase();

  // ---------- API Request ----------
  try {
    // ----- Getting the data -----
    // make API request, get the general data, and parse data as JSON
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);
    let pokemonData = await response.json();

    // see data
    // console.log(pokemonData);

    // get additional data:  flavor text
    // using the retrieved data, make API request to get the flavor text, and parse data as JSON
    let speciesRes = await fetch(pokemonData.species.url);
    let speciesData = await speciesRes.json();

    // get flavor text, filter by language (english)
    let flavorTextArr = speciesData.flavor_text_entries;
    let filteredArr = flavorTextArr.filter(entry => entry.language.name === "en");

    // generate a random flavor text
    let randomNum = Math.floor(Math.random() * filteredArr.length);
    let flavorText = filteredArr[randomNum].flavor_text;

    // get the images (default and shiny)
    let pokemonDefault = pokemonData.sprites.front_default;
    let pokemonShiny = pokemonData.sprites.front_shiny;

    // capitalize the name
    capitalize(pokemonData.name);

    // check if there's an error message. if there is, change it back to default text
    if(searchLabel.textContent === "We can't find that Pokémon.  Please try again.") {
      searchLabel.textContent = "Enter a Pokémon below, then tap on “I choose you!”";
      searchLabel.setAttribute("class", "");
    }

    // ----- Displaying the data -----
    // 1. target the image display
    let imageDisplay = document.querySelector(".pokemon-display .image-container");

    // 2. target pikachu's image
    let pikachuWaving = document.getElementById("pikachu-waving");

    // 3. check to see if pikachu is showing (this is for if a user searches again after searching for the first time)
    if(pikachuWaving) {
      // 4. if pikachu is there, remove him
      pikachuWaving.remove();

      // 5. create 2 divs to go into the pokemon display image container
      let normPokemonDiv = document.createElement("div");
      let shinyPokemonDiv = document.createElement("div");

      // 6. give the divs a class of "sprite-container"
      normPokemonDiv.setAttribute("class", "sprite-container");
      shinyPokemonDiv.setAttribute("class", "sprite-container");

      // 7. append the 2 divs to the pokemon display image container
      imageDisplay.appendChild(normPokemonDiv);
      imageDisplay.appendChild(shinyPokemonDiv);

      // 8. give the image elements (created earlier) src, alt, and class attributes
      normPokemonImg.setAttribute("src", pokemonDefault);
      normPokemonImg.setAttribute("alt", `Normal version of ${capitalName}`);
      normPokemonImg.setAttribute("class", "pokemon-sprite");

      shinyPokemonImg.setAttribute("src", pokemonShiny);
      shinyPokemonImg.setAttribute("alt", `Normal version of ${capitalName}`);
      shinyPokemonImg.setAttribute("class", "pokemon-sprite");

      // 9. append the image elements to the divs in the image container
      normPokemonDiv.appendChild(normPokemonImg);
      shinyPokemonDiv.appendChild(shinyPokemonImg);

      // 10. create p elements to indicate which image is normal and shiny
      let normPokemonText = document.createElement("p");
      let shinyPokemonText = document.createElement("p");

      // 11. set the text content
      normPokemonText.textContent = "Normal";
      shinyPokemonText.textContent = "Shiny";

      // 12. append the text to the divs created earlier containing the images
      normPokemonDiv.appendChild(normPokemonText);
      shinyPokemonDiv.appendChild(shinyPokemonText);

      // 13. give the text container (created earlier) a class of "text-container"
      textContainer.setAttribute("class", "text-container");

      // 14. append the text container to the "pokemon display" container
      let pokemonDisplay = document.getElementById("pokemon-display");
      pokemonDisplay.appendChild(textContainer);

      // 15. add a class for the h2 pokemon name (created earlier) for styling
      pokemonName.setAttribute("class", "pokemon-name");
      pokemonName.setAttribute("id", "pokemon-name");

      // 16. set the pokemon name
      // pokemonName.textContent = `#${pokemonData.id} - ${pokemonData.name}`;
      pokemonName.textContent = `#${pokemonData.id} - ${capitalName}`;

      // 17. append the name to the container
      pokemonDisplay.prepend(pokemonName);

      // 17a. give the pokemonType element a class
      pokemonType.setAttribute("class", "pokemon-type");

      // 18. determine if the pokemon has 2 types (type elements created earlier), set it, then append it to the pokemon text-container element
      if(pokemonData.types.length > 1) {
        // 2 types
        pokemonType.textContent = `Type: ${pokemonData.types[0].type.name} and ${pokemonData.types[1].type.name}`;
        textContainer.appendChild(pokemonType);

        // change rectangle colors
        typeColor1.style.backgroundColor = typeColors[pokemonData.types[0].type.name];
        typeColor2.style.backgroundColor = typeColors[pokemonData.types[1].type.name];
      } else {
        // 1 type
        pokemonType.textContent = `Type: ${pokemonData.types[0].type.name}`;
        textContainer.appendChild(pokemonType);

        // change rectangle colors
        typeColor1.style.backgroundColor = typeColors[pokemonData.types[0].type.name];
        typeColor2.style.backgroundColor = typeColors[pokemonData.types[0].type.name];
      }

      // 19. set the flavor text (element created earlier)
      pokemonFlavorText.setAttribute("class", "flavor-text");
      pokemonFlavorText.textContent = flavorText;

      // 20. append the flavor text to the textContainer
      textContainer.appendChild(pokemonFlavorText);

      // 21. add "Search for another" text to form
      let searchAnother = document.createElement("p");
      searchAnother.setAttribute("class", "search-another");
      searchAnother.textContent = "Search for another";
      form.prepend(searchAnother);
    } else {
      // if data exists (pikachu's image isn't there and populated in the "if" statement), then just change the displayed data
      // change the image src and alt attributes
      normPokemonImg.setAttribute("src", pokemonDefault);
      normPokemonImg.setAttribute("alt", `Normal version of ${capitalName}`);

      shinyPokemonImg.setAttribute("src", pokemonShiny);
      shinyPokemonImg.setAttribute("alt", `Normal version of ${capitalName}`);

      // change the name
      pokemonName.textContent = `#${pokemonData.id} - ${capitalName}`;

      // change the type
      // determine if the pokemon has 2 types, set it, then append it to the pokemon text-container element
      if(pokemonData.types.length > 1) {
        pokemonType.textContent = `Type: ${pokemonData.types[0].type.name} and ${pokemonData.types[1].type.name}`;
        
        // testing
        // console.log(typeColors[pokemonData.types[0].type.name])
        // console.log(typeColors[pokemonData.types[1].type.name])
        
        // change rectangle colors
        typeColor1.style.backgroundColor = typeColors[pokemonData.types[0].type.name];
        typeColor2.style.backgroundColor = typeColors[pokemonData.types[1].type.name];
      } else {
        pokemonType.textContent = `Type: ${pokemonData.types[0].type.name}`;

        // change rectangle colors
        typeColor1.style.backgroundColor = typeColors[pokemonData.types[0].type.name];
        typeColor2.style.backgroundColor = typeColors[pokemonData.types[0].type.name];
      }

      // change the flavor text
      pokemonFlavorText.textContent = flavorText;
    }
  } catch (err) {
    console.log(err);

    // change form label into an error message
    
    searchLabel.setAttribute("class", "error");
    searchLabel.textContent = "We can't find that Pokémon.  Please try again."
  };
});



// ---------- GSAP Animation reference ----------

// --------- ANIMATION -------------
    // ----- move form and pikachu disappear animation -----
    // console.log("Flavor text", flavorText);
    // form timeline
    // tl.to(".hero-section", {y: -150, duration: 1, ease: "power4.out"})
    //   .to("#form", {y: 150, duration: 1, ease: "power4.out"}, "<")
    //   .to("#pikachu-waving", {opacity: 0, duration: 1}, "<")
    //   .to("#pikachu-waving", {display: "none"});

    // ----------------------------------

// greensock animation example
// // use a script tag or an external JS file
// document.addEventListener("DOMContentLoaded", (event) => {
//   // gsap code here!
//   // alert("gsap loaded!");
//   console.log("gsap loaded");
//   // gsap.to("#hero-pikachu", {opacity: 0, duration: 1});

//   // var tl = gsap.timeline();

//   // pikachu timeline
//   // tl.to("#hero-pikachu", {opacity: 0, duration: 1})
//   //   .to("#hero-pikachu", {display: "none", duration: 0.5});

//   // form timeline
//   // tl.to(".hero-section", {y: -150, duration: 1, ease: "power4.out"})
//   //   .to("#form", {y: 150, duration: 1, ease: "power4.out"}, "<")
//   //   .to("#pokemon-image-1", {opacity: 0, duration: 1}, "<")
// });


// X get all the type colors
// set type 1 to the type 1 color