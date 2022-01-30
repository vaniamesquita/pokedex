// const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

// const fetchPokemon = () => {
//     const pokemonPromises = []

//     for(let i = 1; i <= 150; i++) {
//         pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
        
//     }
//     //quando todas as promises do pokemon promises estiverem resolvidas, essa expressão vai retornar uma promise, e ai permite o encadeamento do .then
//     Promise.all(pokemonPromises)
//         .then(pokemons => {
//            //console.log(pokemons)

//             const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
//                 const types = pokemon.types.map(typeInfo => typeInfo.type.name)

//                 accumulator += `
//                 <li class="card ${types[0]}">
//                 <img class="card-image" src="${pokemon.sprites.front_default}" alt="{pokemon.name}">
//                     <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
//                     <p class="card-subtitle">${types.join(" | ")}</p>
//                 </li>
//                 `


//                 return accumulator
//             } , '')

//             console.log(pokemons)
//             const ul = document.querySelector('[data-js="pokedex"]')
        
//            ul.innerHTML = lisPokemons
//         })

   
    
// }

// fetchPokemon()


const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) => 
fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => {
    return pokemons.reduce((accumulator, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)

        accumulator += `
        <li class="card ${types[0]}">
        <img class="card-image" src="${pokemon.sprites.front_default}" alt="{pokemon.name}">
            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
            <p class="card-subtitle">${types.join(" | ")}</p>
        </li>
        `
        return accumulator
    } , '')
}

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}


const pokemonPromises = generatePokemonPromises()

        //quando todas as promises do pokemon promises estiverem resolvidas, essa expressão vai retornar uma promise, e ai permite o encadeamento do .then
    Promise.all(pokemonPromises)
        .then(generateHTML)
        .then(insertPokemonsIntoPage)


   
    

