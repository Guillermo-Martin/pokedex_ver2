console.log("connected!");
var tl = gsap.timeline();

// greensock animation example
// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  // gsap code here!
  // alert("gsap loaded!");
  console.log("gsap loaded");
  // gsap.to("#hero-pikachu", {opacity: 0, duration: 1});

  // var tl = gsap.timeline();

  // pikachu timeline
  // tl.to("#hero-pikachu", {opacity: 0, duration: 1})
  //   .to("#hero-pikachu", {display: "none", duration: 0.5});

  // form timeline
  // tl.to(".hero-section", {y: -150, duration: 1, ease: "power4.out"})
  //   .to("#form", {y: 150, duration: 1, ease: "power4.out"}, "<")
  //   .to("#pokemon-image-1", {opacity: 0, duration: 1}, "<")
});



// get the value from the input after a user clicks on the "Submit" button
// target the form
let form = document.getElementById("form");


// on submit, get the value of the input box, make an API request
form.addEventListener("submit", async (event) => {
  // prevent form default behavior
  event.preventDefault();

  // input value (API direct link uses lowercase letters)
  let searchInput = document.getElementById("searchInput").value.toLowerCase();

  // see searchInput
  // console.log(searchInput);

  try {
    // make API request, get the general data, and parse data as JSON
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);
    let pokemonData = await response.json();

    // see data
    console.log(pokemonData);

    // ******* GET DATA *******
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

    // --------- ANIMATION -------------
    // ----- move form and pikachu disappear animation -----
    // console.log("Flavor text", flavorText);
    // form timeline
    // tl.to(".hero-section", {y: -150, duration: 1, ease: "power4.out"})
    //   .to("#form", {y: 150, duration: 1, ease: "power4.out"}, "<")
    //   .to("#pikachu-waving", {opacity: 0, duration: 1}, "<")
    //   .to("#pikachu-waving", {display: "none"});

    // ----------------------------------

    // ----- display content -----
    // create the image elements
    // let pokemonImg1 = document.getElementById("pokemon-image-1");
    // pokemonImg1.setAttribute("src", pokemonDefault);

    // 0. target the image display
    let imageDisplay = document.querySelector(".pokemon-display .image-container");

    // 1. remove pikachu
    let pikachuWaving = document.getElementById("pikachu-waving");
    pikachuWaving.remove();

    // 2. create 2 divs to go into the pokemon display image container
    let normPokemonDiv = document.createElement("div");
    let shinyPokemonDiv = document.createElement("div");

    // 3. append the 2 divs to the pokemon display image container
    imageDisplay.appendChild(normPokemonDiv);
    imageDisplay.appendChild(shinyPokemonDiv);

    // 4. create 2 image elements
    let normPokemonImg = document.createElement("img");
    let shinyPokemonImg = document.createElement("img");

    // 5. give the image elements src, alt, and class attributes
    normPokemonImg.setAttribute("src", pokemonDefault);
    normPokemonImg.setAttribute("alt", `Normal version of ${pokemonData.name}`);
    normPokemonImg.setAttribute("class", "");

    shinyPokemonImg.setAttribute("src", pokemonShiny);
    shinyPokemonImg.setAttribute("alt", `Normal version of ${pokemonData.name}`);
    shinyPokemonImg.setAttribute("class", "");

    // 6. append the image elements to the divs in the image container
    normPokemonDiv.appendChild(normPokemonImg);
    shinyPokemonDiv.appendChild(shinyPokemonImg);

    // imageDisplay.appendChild(normPokemonImg);
    // imageDisplay.appendChild(shinyPokemonImg);

    // add a src, alt, and class attribute








    let pokemonDefaultImg = document.getElementById("pokemon-default");
    let pokemonShinyImg = document.getElementById("pokemon-shiny");

    // set the attributes for the image elements
    pokemonDefaultImg.setAttribute("src", pokemonDefault);
    pokemonShinyImg.setAttribute("src", pokemonShiny);

    // set the "alt" attribute for image elements
    pokemonDefaultImg.setAttribute("alt", `Normal version of ${pokemonData.name}`);
    pokemonShinyImg.setAttribute("alt", `Shiny version of ${pokemonData.name}`);


    // get the copy
    let pokemonName = pokemonData.name;
    let pokemonNum = pokemonData.id;

    // console.log(pokemonData.types);

    // console.log(pokemonData.name, pokemonData.id, pokemonData.types.type);

    // target the text elements
    let pokemonNameElem = document.getElementById("pokemon-name");
    let pokemonNumberElem = document.getElementById("pokemon-number");
    let pokemonFlavorTextElem = document.getElementById("pokemon-flavor-text");
    let pokemonTypeElem = document.getElementById("pokemon-type");

    // set the text elements
    pokemonNameElem.textContent = pokemonName;
    pokemonNumberElem.textContent = pokemonNum;
    pokemonFlavorTextElem.textContent = flavorText;
    
    // setting the type: if the pokemon has two types, display both, else, display main type
    if(pokemonData.types.length > 1) {
      pokemonTypeElem.textContent = `${pokemonData.types[0].type.name} and ${pokemonData.types[1].type.name}`;
    } else {
      pokemonTypeElem.textContent = pokemonData.types[0].type.name;
    }

  } catch (err) {
    console.log("Something went wrong.");
    console.log(err);
  };
});
