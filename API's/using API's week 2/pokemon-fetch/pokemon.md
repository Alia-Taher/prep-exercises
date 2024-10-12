# Pokemon

```` javascript

"use strict";


const VALID_URL = "https://pokeapi.co/api/v2/pokemon/?limit=5";
const INVALID_URL = "https://pokeapi.co/api/v2/pokemons/?limit=5";

async function fetchJSON(url) {
   // Fetch the JSON data from the web API that responds to the `url` parameter
  const fetchedData = await fetch(url);

   // Make sure to check for HTTP errors.
  if (!fetchedData.ok) {
    throw new Error(`HTTP Error: ${fetchedData.status}`);
  }

 // return a promise that resolves to a corresponding JavaScript object.
  const data = await fetchedData.json();
  return data;

 
 
 
}

function renderResults(pokemons) {
  // 1. Clear the text content of the HTML element with id `error`.
  const errorElement = document.querySelector("#error");
  errorElement.innerText = "";

  // 2. Set the text content of the HTML element with id `json` to JSON text
  //    from the `pokemons` argument, formatted in a human readable form (i.e.,
  //    with indentation and line breaks).
  const pokemonsElement = document.querySelector("#json");
  pokemonsElement.innerText = JSON.stringify(pokemons, null, 2);
}

function renderError(err) {
  // 1. Clear the text content of the HTML element with id `json`.
  const pokemonsElement = document.querySelector("#json");
  pokemonsElement.innerText = "";

  // 2. Set the text content of the HTML element with id `error` to the
  //    `.message` property of the `err` parameter.
  const errorElement = document.querySelector("#error");
  errorElement.innerText = err;
}

function main() {
  const button = document.querySelector("#button");
  button.addEventListener("click", () => {
    const option = document.querySelector("#option");
    const url = option.checked ? INVALID_URL : VALID_URL;

    // Use `fetchJSON()` to fetch data from the selected url.
     // If successful, render the data by calling function `renderResults()`.
    // On failure, render the error by calling function `renderError()`.

    fetchJSON(url)
      .then((data) => {
        renderResults(data);   
      })
      .catch((error) => {
        renderError(error);
      });

   
  });
}

window.addEventListener("load", main);
````