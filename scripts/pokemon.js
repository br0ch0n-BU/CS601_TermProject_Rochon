// The form that holds all relevant elements
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
//const pokeAPI = "https://httpbin.org/status/404/";
const pokeballinside = document.getElementById("pokemon");
const pokeballButton = document.getElementById("pokebutton");
const pokeballMsg = document.getElementById("pokemessage");

// Random integer function from MDN
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

// Catches a random Pokemon from amongst the original 150
function catchPokemon() {
  fetch(pokeAPI + getRandomIntInclusive(1, 150))
    .then((response) => {
      if (!response.ok) {
        pokeballMsg.textContent =
          "Sorry! You weren't fast enough to catch a Pokemon! (The server returned an error)";

        throw Error(response.statusText);
      }
      return response.json();
    })
    // Display the Pokemon you caught
    .then((data) => {
      pokeballMsg.innerHTML=`<p><em>You caught <span id="pokemonName">${data.name}</span>!</em></p>`
      pokeballinside.innerHTML = `<img src="${data.sprites.front_default}" alt="${data.name}"/>`;
    })
    // Catch (no pun intended) any exceptions
    .catch((error) => {
      console.error("The PokeAPI returned an error:", error);
    });
}

// Catch pokemon on click
pokeballButton.addEventListener("click", catchPokemon, false);
