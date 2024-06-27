console.log("connected!");

// get the value from the input after a user clicks on the "Submit" button
// target the form
let form = document.getElementById("form");

// on submit, get the value of the input box, making an API request
form.addEventListener("submit", (event) => {
  // prevent form default behavior
  event.preventDefault();

  // input value (API direct link uses lowercase letters)
  let searchInput = document.getElementById("searchInput").value.toLowerCase();

  // console.log(searchInput);

  // make API request
  let pokemonData = fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);

  pokemonData
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
});