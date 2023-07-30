const pokeData = document.getElementById("pokedata");
const modal = document.getElementById("modal");
const modalContent = document.querySelector(".modal-content");
const modalTitle = document.getElementById("modal-title");
const modalNumber = document.getElementById("modal-number");
const modalWeight = document.getElementById("modal-weight");
const modalHeight = document.getElementById("modal-height");
const modalType = document.getElementById("modal-type");
const modalWeakness = document.getElementById("modal-weakness");
const modalClose = document.getElementById("modal-close");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

let allPokemons;

async function fetchPokemon() {
  const response = await fetch("pokemons.json");
  const data = await response.json();
  allPokemons = data;
}

async function obtenerPokemons() {
  await fetchPokemon();

  // Generamos los artículos (cards) para cada Pokémon
  allPokemons.forEach((pokemon) => {
    const article = document.createElement("article");
    article.classList.add("card"); // Agregamos la clase "card" para estilos
    article.innerHTML = `
      <img src="${pokemon.ThumbnailImage}" alt="${pokemon.name}">
      <h2>${pokemon.name}</h2>
      <p><strong>Tipo:</strong> ${pokemon.type.join(", ")}</p>
    `;
    pokeData.appendChild(article);

    article.addEventListener("click", () => {
      showModal(pokemon);
    });
  });
}

function showModal(pokemon) {
  modalTitle.textContent = pokemon.name;
  modalNumber.textContent = pokemon.number;
  modalWeight.textContent = pokemon.weight;
  modalHeight.textContent = pokemon.height;
  modalType.textContent = pokemon.type.join(", ");
  modalWeakness.textContent = pokemon.weakness.join(", ");
  modal.style.display = "flex";
}

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

// Función para buscar Pokémon por nombre
function searchPokemonByName() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === "") {
    pokeData.innerHTML = ""; // Limpiamos la sección de cards antes de mostrar todos los Pokémon nuevamente
    obtenerPokemons();
    return; // Salimos de la función para evitar que se realice la búsqueda con un campo vacío
  }

  pokeData.innerHTML = ""; // Limpiamos la sección de cards antes de realizar la búsqueda

  // Filtramos los Pokémon cuyo nombre contenga el término de búsqueda
  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  // Generamos las cards para los Pokémon filtrados
  filteredPokemons.forEach((pokemon) => {
    const article = document.createElement("article");
    article.classList.add("card"); // Agregamos la clase "card" para estilos
    article.innerHTML = `
      <img src="${pokemon.ThumbnailImage}" alt="${pokemon.name}">
      <h2>${pokemon.name}</h2>
      <p><strong>Tipo:</strong> ${pokemon.type.join(", ")}</p>
    `;
    pokeData.appendChild(article);

    article.addEventListener("click", () => {
      showModal(pokemon);
    });
  });
}

// Llamamos a la función para obtener todos los Pokémon del archivo JSON
obtenerPokemons();

// Agregamos el evento de clic al botón de búsqueda
searchButton.addEventListener("click", searchPokemonByName);

// También podemos agregar la funcionalidad de búsqueda al presionar "Enter" en el input
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchPokemonByName();
  }
});
