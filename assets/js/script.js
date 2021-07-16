// target search button
let $searchBtn = document.getElementById("searchBtn");
// add event listener to button
$searchBtn.addEventListener("click", async function(){
  // alert("You clicked on the search button!");
  // when clicked, make an API call to the PokeAPI
  // get the response...
  let response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  
  // ...then extract data from the response...
  let data = await response.json();

  // ...do something with the data
  console.log(data);
});