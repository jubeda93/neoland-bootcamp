import pokedexjson from '../pokedex/pokedex.json' with { type: "json" }
window.addEventListener("DOMContentLoaded", onDOMContentLoaded)
function onDOMContentLoaded() {

    let formulario = document.getElementById('formulario')

    formulario.addEventListener('submit', buscarPokemon)

    leerListaPokemons(12)

    showFavorites()

}

function leerListaPokemons(maxPokemons = 12) {
    let listaPokemons = document.getElementsByClassName('lista-pokemon')[0]

    while (listaPokemons.firstChild) {
        listaPokemons.removeChild(listaPokemons.firstChild)
    }

    for (let i = 0; i < maxPokemons; i++) {
        addPokemonToList(pokedexjson[i])
    }

}

function showFavorites() {
    let listaFavoritos = document.getElementById('listaFavoritos')
    let favoritos = JSON.parse(localStorage.getItem('favoritos'))

    while (listaFavoritos.firstChild) {
        listaFavoritos.removeChild(listaFavoritos.firstChild)
    }

    if (favoritos?.length > 0) {
        listaFavoritos.closest('.favoritos').classList.add('visible')
        favoritos.forEach((id) => {

            let pokemon = pokedexjson.find((pokemon) => String(pokemon.id) === id)
            let li = document.createElement('li')
            li.textContent = pokemon.name.english
            listaFavoritos.appendChild(li)
        })
    } else {
        listaFavoritos.closest('.favorites').classList.remove('visible')
    }

    let listaGeneracion = document.getElementById('listaGeneracion')
    let generacion = JSON.parse(localStorage.getItem('favoritos'))

    while (listaFavoritos.firstChild) {
        listaFavoritos.removeChild(listaFavoritos.firstChild)
    }

    if (favoritos?.length > 0) {
        listaFavoritos.closest('.favoritos').classList.add('visible')
        favoritos.forEach((id) => {

            let pokemon = pokedexjson.find((pokemon) => String(pokemon.id) === id)
            let li = document.createElement('li')
            li.textContent = pokemon.name.english
            listaFavoritos.appendChild(li)
        })
    } else {
        listaFavoritos.closest('.favorites').classList.remove('visible')
    }

}

function guardarFavoritos() {
    let listaFavoritos = []

    if (localStorage.getItem('favoritos')) {
        listaFavoritos = JSON.parse(localStorage.getItem('favoritos'))
    }
    console.log('Ficha pokemon', this.dataset.id, listaFavoritos)

    // ¿Está guardado mi id en favoritos?
    if (listaFavoritos.includes(this.dataset.id)) {
        // Si lo estaba, lo saco
        listaFavoritos = listaFavoritos.filter(id => id !== this.dataset.id)
        this.classList.remove('favorite')
    } else {   //Si no, lo guardo 
        listaFavoritos.push(this.dataset.id)
        this.classList.add('favorite')
    }

    localStorage.setItem('favoritos', JSON.stringify(listaFavoritos))

    showFavorites()

    

    //fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.dataset.id}`)

        // .then((respuesta) => {
        //     if (!respuesta.ok) {
        //         throw new Error(`HTTP error! Status: ${respuesta.status}`);
        //     }
        //     return respuesta.json();
        // })

        // .then((datosGenPokemon) => {
        //     console.log('datos generacion', datosGenPokemon)
        //     let listaGeneracion = document.getElementById('listaGeneracion')
        //     let li = document.createElement('li')
        //     //Array de datos vacio, donde añadiremos las generaciones
        //     let generaciones = []
            
        //     //Consulta a LocalStorage, para comprobar si existen generaciones ya guardadas
        //     if (localStorage.getItem('generaciones')) {
        //         generaciones = JSON.parse(localStorage.getItem('generaciones'))
        //     }

        //     // Si ya tengo esa generacion..
        //      if (generaciones.includes(datosGenPokemon.generation.name)) {
        //         generaciones.findIndex(datosGenPokemon.generation.name)
        //         //aqui quitariamos de la lista de generaciones el valor, por que ya existe
        //     } else {
        //         // Aqui añadiriamos a la lista de Generaciones el valor de la generacion pokemon
        //         //generaciones.push(datosGenPokemon.generation.name)
        //     }

            // Añadimos la nueva generacion a lista
            // Generamos el (li) con el nuevo valor de la generacion
            // li.textContent = datosGenPokemon.generation.name
            // listaGeneracion.appendChild(li)


            // if (listaGeneracion.includes(datosGenPokemon.generation.name)) {
            //     listaGeneracion = listaGeneracion.filter(id => id !== datosGenPokemon)
            //     datosGenPokemon.classList.remove('generacion')
            // } else {
            //     listaGeneracion.push(datosGenPokemon)
            //     datosGenPokemon.classList.add('generacion')
            // }
            // if (listaGeneracion.includes(datosGenPokemon.generacion.name))

            //localStorage.setItem('generaciones', JSON.stringify(generaciones))
            
            //Calculamos cuantos repeticiones tenemos de cada generación.

            // let cantidadGeneracion = generaciones.filter((generacion) => {
            //    return generacion === datosGenPokemon.generation.name
            // }).length

            // console.log('Pokemons de esta generacion', datosGenPokemon.generation.name, cantidadGeneracion)



        }


//Buscador
function buscarPokemon(event) {
    event.preventDefault()
    let listaPokemons = document.getElementsByClassName('lista-pokemon')[0]
    let campoBusqueda = document.getElementById('busqueda')
    let resultadosBusqueda = []

    let errorBusqueda = document.getElementsByClassName('errorbusqueda')[0]

    if (campoBusqueda.value === '') {
        leerListaPokemons(9)
        return
    }

    if (Number.isInteger(Number(campoBusqueda.value))) {
        resultadosBusqueda = pokedexjson.filter((pokemon) => pokemon.id === Number(campoBusqueda.value))
    }

    else {
        resultadosBusqueda = pokedexjson.filter((pokemon) => pokemon.name.english.toLowerCase().includes(campoBusqueda.value.toLowerCase()))
    }
    let mensajeError = document.getElementsByClassName('errorbusqueda')[0]

    if (resultadosBusqueda.length === 0) {
        mensajeError.classList.add('visible')
        console.log('No se ha encontrado ningún pokemon')

    } else {

        mensajeError.classList.remove('visible')
        console.log('He encontrado algun Pokemon, ocultar el mensaje de error')

    }
    console.log(resultadosBusqueda);


    while (listaPokemons.firstChild) {
        listaPokemons.removeChild(listaPokemons.firstChild)
    }

    for (let i = 0; i < resultadosBusqueda.length; i++) {
        addPokemonToList(resultadosBusqueda[i])
    }

}


function addPokemonToList(pokemon) {
    let listaPokemons = document.getElementsByClassName('lista-pokemon')[0]
    let nuevoPokemon = document.createElement('li');
    let fichaPokemon = document.createElement('figure');
    fichaPokemon.classList.add('pokemon');

    let listaFavoritos = []
    if (localStorage.getItem('favoritos')) {
        listaFavoritos = JSON.parse(localStorage.getItem('favoritos'))
    }

    if (listaFavoritos.includes(String(pokemon.id))) {
        nuevoPokemon.classList.add('favorite')
    }

    nuevoPokemon.dataset.id = pokemon.id
    nuevoPokemon.addEventListener('click', guardarFavoritos)

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
    fichaPokemon.appendChild(numSerie);
    fichaPokemon.appendChild(nombrePokemon);
    fichaPokemon.appendChild(tiposPokemon);
    nuevoPokemon.appendChild(fichaPokemon);
    listaPokemons.appendChild(nuevoPokemon);


}



