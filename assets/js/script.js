console.log("connected!");

// get the value from the input after a user clicks on the "Submit" button
// target the form
let form = document.getElementById("form");

// on submit, get the value of the input box
form.addEventListener("submit", (event) => {
  // prevent form default behavior
  event.preventDefault();

  // input value
  let searchInput = document.getElementById("searchInput").value;

  console.log(searchInput);
});

// console.log(form);