 const pockemonCard = document.getElementById('pokemon-form')
 const numInput = document.getElementById('nub-pokemon')
 const categorySelect = document.getElementById('category')
 const cardContainer = document.getElementById('card-container')


 pockemonCard.addEventListener('submit',async (e) => {
    e.preventDefault()

       const numOfPokemon = parseInt(numInput.value);
       const category = categorySelect.value;

       console.log(numOfPokemon, category);
       

       cardContainer.innerHTML = "";

       const response = await fetch(`https://pokeapi.co/api/v2/type/${category}`)
       const data = await response.json();

       const pokemonIds = data.pokemon.slice(0,numOfPokemon).map((p)=>p.pokemon.url.split('/').filter(Boolean).pop());


       // Fetch details for each Pokémon
  const promises = pokemonIds.map((id) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
  );

  const results = await Promise.all(promises);

  // Render Pokémon cards
  results.forEach((pokemon) => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <p><strong>Height:</strong> ${pokemon.height}</p>
      <p><strong>Weight:</strong> ${pokemon.weight}</p>
    `;

    cardContainer.appendChild(card);
  });
});

      
