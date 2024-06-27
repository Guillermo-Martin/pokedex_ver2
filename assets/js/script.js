console.log("connected!");

// get the value from the input after a user clicks on the "Submit" button
// target the form
let form = document.getElementById("form");

// on submit, get the value of the input box, making an API request
form.addEventListener("submit", async (event) => {
  // prevent form default behavior
  event.preventDefault();

  // input value (API direct link uses lowercase letters)
  let searchInput = document.getElementById("searchInput").value.toLowerCase();

  // see searchInput
  // console.log(searchInput);

  try {
    // make API request and get the data
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);

    // parse the data as JSON
    let pokemonData = await response.json();

    // see data
    console.log(pokemonData);

    // flavor text
    let speciesRes = await fetch(pokemonData.species.url);
  
    // parse the data as JSON
    let speciesData = await speciesRes.json();

    // see data
    console.log(speciesData);


  } catch (err) {
    console.log("Something went wrong.");
    console.log(err);
  };
});

