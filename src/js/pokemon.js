import pokedex from '../pokedex/pokedex.json' with { type: "json" }
window.addEventListener("DOMContentLoaded", onDOMContentLoaded)
function onDOMContentLoaded() {
    

    leerListaPokemons(12)

}

function leerListaPokemons(maxPokemons = 9) {
    let listaPokemons = document.getElementsByClassName('lista-pokemon')[0]

    while (listaPokemons.firstChild) {
        listaPokemons.removeChild(listaPokemons.firstChild)
    }

    for (let i = 0; i < maxPokemons; i++) {
        addPokemonToList(pokedex[i])
    }

}



    function addPokemonToList(pokemon) {
    let listaPokemons = document.getElementsByClassName('lista-pokemon')[0]
    let nuevoPokemon = document.createElement('li');
    let fichaPokemon = document.createElement('figure');
    fichaPokemon.classList.add('pokemon');


    //  //Creo el elemento para cargar la imagen:
    let imagenPokemon = document.createElement('img')
    let idPokemon = String(pokemon.id);
    imagenPokemon.src = '/pokedex/images/' + idPokemon.padStart(3, '0') + '.png'
    fichaPokemon.appendChild(imagenPokemon);

    //Creo el elemento para el id/numero:
    let numSerie = document.createElement('figcaption');
    numSerie.innerText = 'Nº. ' + idPokemon.padStart(4, '0')
    numSerie.classList.add('numeropokemon');


    //Creo el elemento para el Nombre:
    let nombrePokemon = document.createElement('p');
    nombrePokemon.innerText = pokemon.name.english;
    nombrePokemon.classList.add('nombrepokemon');



    //Creo el elemento para el tipo:
    let tiposPokemon = document.createElement('p');
    tiposPokemon.classList.add('clases');



    //por cada tipo de pokemon, generamos un span
    for (let j = 0; j < pokemon.type.length; j++) {
        let spanElement = document.createElement('span');
        spanElement.innerText = pokemon.type[j];
        spanElement.classList.add('tag');
        spanElement.classList.add(pokemon.type[j].toLowerCase());
        tiposPokemon.appendChild(spanElement);
    }

    fichaPokemon.appendChild(imagenPokemon);
    fichaPokemon.appendChild(nombrePokemon);
    fichaPokemon.appendChild(tiposPokemon)
    nuevoPokemon.appendChild(fichaPokemon)
    listaPokemons.appendChild(nuevoPokemon);
    fichaPokemon.appendChild(numSerie); 
}



