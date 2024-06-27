console.log("connected!");

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

    // using the retrieved data, make API request to get the flavor text, and parse data as JSON
    let speciesRes = await fetch(pokemonData.species.url);
    let speciesData = await speciesRes.json();

    // get flavor text, filter by language (english)
    let flavorTextArr = speciesData.flavor_text_entries;
    let filteredArr = flavorTextArr.filter(entry => entry.language.name === "en");

    // generate a random flavor text
    let randomNum = Math.floor(Math.random() * filteredArr.length);
    let flavorText = filteredArr[randomNum].flavor_text;

    console.log("Flavor text", flavorText);

    // ----- display content -----
    // get the images (default and shiny)
    let pokemonDefault = pokemonData.sprites.front_default;
    let pokemonShiny = pokemonData.sprites.front_shiny;

    // target the image elements
    let pokemonDefaultImg = document.getElementById("pokemon-default");
    let pokemonShinyImg = document.getElementById("pokemon-shiny");

    // set the attributes for the image elements
    pokemonDefaultImg.setAttribute("src", pokemonDefault);
    pokemonShinyImg.setAttribute("src", pokemonShiny);

    // set the "alt" attribute for image elements
    pokemonDefaultImg.setAttribute("alt", `Normal version of ${pokemonData.name}`);
    pokemonShinyImg.setAttribute("alt", `Shiny version of ${pokemonData.name}`);

    console.log(pokemonDefault, pokemonShiny);




  } catch (err) {
    console.log("Something went wrong.");
    console.log(err);
  };
});
