import pokedex from '../pokedex/pokedex.json' with { type: "json" }
console.log('Ya se ha cargado completamente')
window.addEventListener("DOMContentLoaded", onDOMContentLoaded)



function onDOMContentLoaded() {
    let listaPokemon = document.getElementsByClassName('lista-pokemon')[0]
    console.log('Ya esta disponible la pagina', listaPokemon);

    for (let i = 0; i < 12; i++) {
        let liElement = document.createElement('li');
        console.log(pokedex[i].name.english);
        // nuevoPokemon.innerText = pokedex[i].name.english;

        let figureElement = document.createElement('figure');
        figureElement.classList.add('pokemon');


        //  //Creo el elementro para cargar la imagen:
        let imgElement = document.createElement('img')
        let idPokemon = String(pokedex[i].id);
        imgElement.src = '/pokedex/images/' + idPokemon.padStart(3, '0') + '.png'
        figureElement.appendChild(imgElement);

        //Creo el elementro para el id/numero:
        let figcaptionElement = document.createElement('figcaption');
        figcaptionElement.innerText = 'Nº. ' + idPokemon.padStart(4, '0')
        figcaptionElement.classList.add('numeropokemon');
        figureElement.appendChild(figcaptionElement);

        //Creo el elementro para el Nombre:
        let pElement = document.createElement('p');
        pElement.innerText = pokedex[i].name.english;
        pElement.classList.add('nombrepokemon');
        figureElement.appendChild(pElement);


        //Creo el elementro para el tipo:
        let pClasesElement = document.createElement('p');
        pClasesElement.classList.add('clases');
        
        //por cada tipo de pokemon, generamos un span

        for (let j = 0; j < pokedex[i].type.length; j++) {
            let spanElement = document.createElement('span');
            spanElement.innerText = pokedex[i].type[j];
            spanElement.classList.add('tag');
            spanElement.classList.add(pokedex[i].type[j].toLowerCase());
            pClasesElement.appendChild(spanElement);
        }



        figureElement.appendChild(pClasesElement)

        liElement.appendChild(figureElement)

        listaPokemon.appendChild(liElement);

    }

    /* Tarea: buscar un pokemon

1.Escribo en el formulario el nombre del pokemon  
2.pincho en boton de buscar
3.usando javascript, busco en la base de datos un pokemon que coincida con la busquedaç
4.Devuelvo las fotos de ese pokemon a la web
5.limpio la tabla de pokemons para dejarla preparada
6.Añado un li a la lista ordenada de pokemons con los datos del pokemons y la estructura HTML
*/


    /*
    1. INPUT del nombre o numero del pokemon
    2. SET la info del pokemon que se quiere buscar
    3. READ los archivos de la base de datos
    4. If-else, en caso de encontrar los datos solicitados muestra estos
    5. SHOW, filtro el pokemon que buscamos, lo muestramos en pagina principal y HIDE el resto de pokemons
    6. Display con dicha pagina principal donde solo mostramos el pokemon que buscamos
    
    
    
     
    INPUT: pides información al usuario
    SET: guardas información en una variable
    PRINT: muestras un valor o mensaje en la pantalla
    READ: lees un archivo o documento
    DISPLAY: muestras una ventana nueva
    SHOW / HIDE: muestras u ocultas un elemento de interfaz
    CALCULATE: realiza un cálculo
    IF-ELSE: ejecuta una acción si se cumple una condición (o en el caso de que no se cumpla)
    CASE: realiza acciones a partir de una lista de preguntas sobre un mismo valor
    FOR: realiza acciones sobre una lista de elementos, o a partir de ellos
    WHILE: realiza acciones mientras se cumpla una condición
    DO-WHILE / REPEAT-UNTIL: realiza una acción, y luego continúa haciéndolo mientras se cumpla una condición (o deje de cumplirse)
    */




}

/**
 * Busca un pokemon en la base de datos segun su nombre, fecha y lista de clases
 * @param {string} nombre - nombre del pokemon
 * @param {number} fecha - fecha de nacimiento del pokemon
 * @param {string[]} clases - lista de clases del pokemon
 */
function buscarPokemon(nombre, fecha, clases) {
    console.log('Buscando Pokemon...', nombre, fecha, clases)

}