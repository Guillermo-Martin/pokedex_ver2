// greensock timeline
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
let pikachuWaving = document.getElementById("pikachu-waving");
let audio = "";

// ---------- Functions ----------
// Capitalize the pokemon's name to display
let capitalize = (string) => {
  // 1. capitalize the first letter of the string
  capitalName = string[0].toUpperCase();

  // 2. loop through the rest of the string and add it to the capitalized name
  for(let i = 1; i < string.length; i++) {
    capitalName = capitalName + string[i];
  }

  return capitalName;
}

// Colors animation for the pokemon type(s)
let typeColorAnimation = tl
  .set(".type-color-1", {transform: "rotate(38deg)", scaleX: 0}, "<")
  .set(".type-color-2", {transform: "rotate(38deg)", scaleX: 0}, "<")
  .to(".type-color-1", {scaleX: 1, opacity: 0.5, ease: "power4.out", duration: 1, delay: 0.3}, "<")
  .to(".type-color-2", {scaleX: 1, ease: "power4.out", duration: 1}, "<")
  .pause();


// ---------- Form functionality ----------
// target the form
let form = document.getElementById("form");

// on submit, get the value of the input box, make an API request
form.addEventListener("submit", async (event) => {
  // prevent form default behavior
  event.preventDefault();

  // get input value (API direct link uses lowercase letters)
  let searchInput = document.getElementById("searchInput").value.toLowerCase();

  // Check edge cases: pokemon with some punctuation in the name
  // Using an "or" statement in a switch statement: https://stackoverflow.com/questions/6476994/using-or-operator-in-javascript-switch-statement
  switch(searchInput) {
    case "mr. mime":
    case "mr.mime":
    case "mr mime":
    case "mister mime":
      searchInput = "mr-mime";
      break
    case "mr. rime":
    case "mr.rime":
    case "mr rime":
    case "mister rime":
      searchInput = "mr-rime";
      break
    case "mime jr.":
    case "mime jr":
    case "mime junior":
      searchInput = "mime-jr";
      break;
    case "porygon-2":
    case "porygon 2":
      searchInput = "porygon2";
      break;
    case "farfetch'd":
      searchInput = "farfetchd";
      break;
    case "nidoran♂":
    case "nidoran-male":
    case "nidoran (male)":
    case "nidoran male":
      searchInput = "nidoran-m";
      break;
    case "nidoran♀":
    case "nidoran-female":
    case "nidoran (female)":
    case "nidoran female":
      searchInput = "nidoran-f";
      break;
    case "deoxys":
      searchInput = "deoxys-normal";
    default:
      break;
  } 

  // ---------- API Request ----------
  try {
    // ----- Getting the data -----
    // make API request, get the general data, and parse data as JSON
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);
    let pokemonData = await response.json();

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

    // get the sound
    let pokemonCry = pokemonData.cries.latest;

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

      // 4a. play the type color animation
      typeColorAnimation.play();
      
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

      // 14a. create a p element to tell the user to click on the pokemon to hear its cry
      let clickText = document.createElement("p");

      // 14a-1. create two spans: one for mobile text, one for desktop text
      let mobileText = document.createElement("span");
      let deskText = document.createElement("span");

      // 14a-2. give the spans text
      mobileText.textContent = "(Tap on the Pokémon!)";
      deskText.textContent = "(Click on the Pokémon to hear its cry!)";

      // 14a-3. give the spans a class for showing/hiding
      mobileText.setAttribute("class", "mobile-text");
      deskText.setAttribute("class", "desk-text");

      // 14a-4. append the spans to the clickText element
      clickText.appendChild(mobileText);
      clickText.appendChild(deskText);

      // 14b. give the element a class for styling and some text
      clickText.setAttribute("class", "click-text");
      // clickText.textContent = "(Click on the Pokémon to hear its cry!)";

      // 14c. append it to the pokemonDisplay container, before the Text container
      pokemonDisplay.insertBefore(clickText, textContainer);

      // 15. add a class for the h2 pokemon name (created earlier) for styling
      pokemonName.setAttribute("class", "pokemon-name");
      pokemonName.setAttribute("id", "pokemon-name");

      // 16. set the pokemon name
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
        typeColor1.style.opacity = 0.5;
        typeColor2.style.backgroundColor = typeColors[pokemonData.types[1].type.name];
      } else {
        // 1 type
        pokemonType.textContent = `Type: ${pokemonData.types[0].type.name}`;
        textContainer.appendChild(pokemonType);

        // change rectangle colors
        typeColor1.style.backgroundColor = typeColors[pokemonData.types[0].type.name];
        typeColor1.style.opacity = 0.5;
        typeColor2.style.backgroundColor = typeColors[pokemonData.types[0].type.name];

        // play the color animation
        typeColorAnimation.play();
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

      // ---------- Pokemon jump animation and play sound ----------
      let spriteArr = document.querySelectorAll(".pokemon-sprite");

      // add an click listener on the sprites
      for(let i = 0; i < spriteArr.length; i++) {
        spriteArr[i].addEventListener("click", () => {
          // https://stackoverflow.com/questions/9419263/how-to-play-audio
          // create a new audio object
          audio = new Audio(`${pokemonCry}`);

          // set an id, so you can target it in subsequent searches
          audio.setAttribute("id", "pokemonCry");

          // play pokemon cry
          audio.play();

          // play bounce animation
          gsap.timeline({repeat: 2})
            .to(spriteArr[i], {y: -10, duration: 0.1})
            .to(spriteArr[i], {y: 0, duration: 0.1});
        });
      };
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
        
        // change rectangle colors
        typeColor1.style.backgroundColor = typeColors[pokemonData.types[0].type.name];
        typeColor1.style.opacity = 0.5;
        typeColor2.style.backgroundColor = typeColors[pokemonData.types[1].type.name];

        // restart the color animation
        typeColorAnimation.restart();
      } else {
        pokemonType.textContent = `Type: ${pokemonData.types[0].type.name}`;

        // change rectangle colors
        typeColor1.style.backgroundColor = typeColors[pokemonData.types[0].type.name];
        typeColor1.style.opacity = 0.5;
        typeColor2.style.backgroundColor = typeColors[pokemonData.types[0].type.name];

        // restart the color animation
        typeColorAnimation.restart();
      }

      // change the flavor text
      pokemonFlavorText.textContent = flavorText;

      // ---------- Pokemon jump animation and play sound----------
      let spriteArr = document.querySelectorAll(".pokemon-sprite");

      for(let i = 0; i < spriteArr.length; i++) {
        spriteArr[i].addEventListener("click", () => {
          // Fixing the play promise error:  https://developer.chrome.com/blog/play-request-was-interrupted
          let playPromise = audio.play();

          // if "playPromise" doesn't equal undefined...
          if(playPromise !== undefined) {
            playPromise.then(() => {
              // ...then pause any audio that is playing
              audio.pause();

              // change the src of the sound
              audio.setAttribute("src", pokemonCry);

              // then play the audio
              audio.play();
            })
            .catch(err => {
              console.log(err);
            });
          };
          
          // play the jumping animation and play sound
          gsap.timeline({repeat: 2})
            .to(spriteArr[i], {y: -10, duration: 0.1})
            .to(spriteArr[i], {y: 0, duration: 0.1});
        });
      };
    }
  } catch (err) {
    console.log(err);

    // change form label into an error message
    searchLabel.setAttribute("class", "error");
    searchLabel.textContent = "We can't find that Pokémon.  Please try again."
  };
});
