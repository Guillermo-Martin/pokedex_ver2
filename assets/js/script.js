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

// elements to create
let normPokemonImg = document.createElement("img");
let shinyPokemonImg = document.createElement("img");
let textContainer = document.createElement("div");
let pokemonName = document.createElement("h2");
let pokemonType = document.createElement("p");
let pokemonFlavorText = document.createElement("p");


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

    // check to see if pikachu is showing (this is for if a user searches again after searching for the first time)
    if(pikachuWaving) {
      alert("pikachu is there!");
      pikachuWaving.remove();

      // 2. create 2 divs to go into the pokemon display image container
      let normPokemonDiv = document.createElement("div");
      let shinyPokemonDiv = document.createElement("div");

      // 2a. give the divs a class of "sprite-container"
      normPokemonDiv.setAttribute("class", "sprite-container");
      shinyPokemonDiv.setAttribute("class", "sprite-container");

      // 3. append the 2 divs to the pokemon display image container
      imageDisplay.appendChild(normPokemonDiv);
      imageDisplay.appendChild(shinyPokemonDiv);

      // 4. create 2 image elements
      // let normPokemonImg = document.createElement("img");
      // let shinyPokemonImg = document.createElement("img");

      // 5. give the image elements src, alt, and class attributes
      normPokemonImg.setAttribute("src", pokemonDefault);
      normPokemonImg.setAttribute("alt", `Normal version of ${pokemonData.name}`);
      normPokemonImg.setAttribute("class", "pokemon-sprite");

      shinyPokemonImg.setAttribute("src", pokemonShiny);
      shinyPokemonImg.setAttribute("alt", `Normal version of ${pokemonData.name}`);
      shinyPokemonImg.setAttribute("class", "pokemon-sprite");

      // 6. append the image elements to the divs in the image container
      normPokemonDiv.appendChild(normPokemonImg);
      shinyPokemonDiv.appendChild(shinyPokemonImg);

       // 7. create p elements
      let normPokemonText = document.createElement("p");
      let shinyPokemonText = document.createElement("p");

      // 8. set the text content
      normPokemonText.textContent = "Normal";
      shinyPokemonText.textContent = "Shiny";

      // 9.  append the text to the divs created earlier
      normPokemonDiv.appendChild(normPokemonText);
      shinyPokemonDiv.appendChild(shinyPokemonText);

      // 10.  create a div with the class of "text-container"
      // let textContainer = document.createElement("div");

      // 11. give the text container a class
      textContainer.setAttribute("class", "text-container");

      // 12. append the text container to the "pokemon display" container
      let pokemonDisplay = document.getElementById("pokemon-display");
      pokemonDisplay.appendChild(textContainer);

      // 13. create an h2 for the pokemon name and number
      // let pokemonName = document.createElement("h2");

      // 13a. add a class for the h2 for styling
      pokemonName.setAttribute("class", "pokemon-name");
      pokemonName.setAttribute("id", "pokemon-name");

      // 14. set the pokemon name
      pokemonName.textContent = `#${pokemonData.id} - ${pokemonData.name}`;

      // 15. append the name to the container
      // textContainer.appendChild(pokemonName);
      pokemonDisplay.prepend(pokemonName);

      // 16. determine if the pokemon has 2 types, set it, then append it to the pokemon text-container element
      if(pokemonData.types.length > 1) {
        // pokemonTypeElem.textContent = `${pokemonData.types[0].type.name} and ${pokemonData.types[1].type.name}`;
        pokemonType.textContent = `Type: ${pokemonData.types[0].type.name} and ${pokemonData.types[1].type.name}`;
        textContainer.appendChild(pokemonType);
      } else {
        // pokemonTypeElem.textContent = pokemonData.types[0].type.name;
        pokemonType.textContent = `Type: ${pokemonData.types[0].type.name}`;
        textContainer.appendChild(pokemonType);
      }

      // 17. create a p element for the flavor text
      let pokemonFlavorText = document.createElement("p");

      // 18. set the flavor text
      pokemonFlavorText.textContent = flavorText;

      // 19. append the flavor text to the textContainer
      textContainer.appendChild(pokemonFlavorText);


    } else {
      // if pikachu isn't there
      alert("pikachu isn't there!");

      // if(normPokemonImg) {
      //   alert("normal pokemon image is here!")
      // } else {
      //   alert("normal pokemon img isn't there!")
      // }

      // change the image src and alt attributes
      normPokemonImg.setAttribute("src", pokemonDefault);
      normPokemonImg.setAttribute("alt", `Normal version of ${pokemonData.name}`);

      shinyPokemonImg.setAttribute("src", pokemonShiny);
      shinyPokemonImg.setAttribute("alt", `Normal version of ${pokemonData.name}`);

      // change the name
      pokemonName.textContent = `#${pokemonData.id} - ${pokemonData.name}`;

      // change the type
      // 16. determine if the pokemon has 2 types, set it, then append it to the pokemon text-container element
      if(pokemonData.types.length > 1) {
        // pokemonTypeElem.textContent = `${pokemonData.types[0].type.name} and ${pokemonData.types[1].type.name}`;
        pokemonType.textContent = `Type: ${pokemonData.types[0].type.name} and ${pokemonData.types[1].type.name}`;
        // textContainer.appendChild(pokemonType);
      } else {
        // pokemonTypeElem.textContent = pokemonData.types[0].type.name;
        pokemonType.textContent = `Type: ${pokemonData.types[0].type.name}`;
        // textContainer.appendChild(pokemonType);
      }

      // change the flavor text
      pokemonFlavorText.textContent = flavorText;
    }




    // 16. create a p element for the pokemon type(s)
    // let pokemonType = document.createElement("p");

    // 16. determine if the pokemon has 2 types, set it, then append it to the pokemon text-container element
    // if(pokemonData.types.length > 1) {
    //   // pokemonTypeElem.textContent = `${pokemonData.types[0].type.name} and ${pokemonData.types[1].type.name}`;
    //   pokemonType.textContent = `Type: ${pokemonData.types[0].type.name} and ${pokemonData.types[1].type.name}`;
    //   textContainer.appendChild(pokemonType);
    // } else {
    //   // pokemonTypeElem.textContent = pokemonData.types[0].type.name;
    //   pokemonType.textContent = `Type: ${pokemonData.types[0].type.name}`;
    //   textContainer.appendChild(pokemonType);
    // }

    // 17. create a p element for the flavor text
    // let pokemonFlavorText = document.createElement("p");

    // // 18. set the flavor text
    // pokemonFlavorText.textContent = flavorText;

    // // 19. append the flavor text to the textContainer
    // textContainer.appendChild(pokemonFlavorText);

    // 20. add "Search for another" text to form
    let searchAnother = document.createElement("p");
    searchAnother.textContent = "Search for another";
    form.prepend(searchAnother);


    

  } catch (err) {
    console.log("Something went wrong.");
    console.log(err);
  };
});
