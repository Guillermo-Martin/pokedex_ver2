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

    // see data
    // console.log(speciesData.flavor_text_entries);

    let flavorTextArr = speciesData.flavor_text_entries;

    // console.log("line 35", flavorTextArr);

    // filter the flavor_text_entries array by language
    let filteredArr = flavorTextArr.filter(entry => entry.language.name === "en");

    // console.log(filteredArr, "line 44");

    // to get flavor text
    // console.log(filteredArr[10].flavor_text);

    // generate a random flavor text
    let randomNum = Math.floor(Math.random() * filteredArr.length);
    let flavorText = filteredArr[randomNum].flavor_text;

    console.log("Flavor text", flavorText);


  } catch (err) {
    console.log("Something went wrong.");
    console.log(err);
  };
});
