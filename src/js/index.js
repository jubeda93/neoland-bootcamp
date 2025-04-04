// @ts-check
import {User} from "./classes/User.js"
import { SingeltonDB } from "./classes/SingeltonDB.js"
import { store } from "./store/redux.js"
import { Results } from "./classes/results.js"

window.addEventListener("DOMContentLoaded", onDOMContentLoaded )

//constante donde guardaremos los Usuarios
const USER_DB = new SingeltonDB()

/**
 * Called when the initial HTML document has been completely loaded and parsed.
 * Adds event listeners to forms, and reads the user database.
 */
function onDOMContentLoaded () {
    let signIn = document.getElementById('signInForm')
    let logIn = document.getElementById('logInForm')
    let logOut = document.getElementById('logOut')
    let signOut = document.getElementById('signOut')
    let saveResults = document.getElementById('saveResults')

    signIn?.addEventListener('submit', onSignIn)
    logIn?.addEventListener('submit', onlogIn)
    logOut?.addEventListener('submit', onLogOut)
    signOut?.addEventListener('submit', onSignOut)
    saveResults?.addEventListener('submit', saveMarks)

    readUserDB()
    console.log(store.getState())
 
}

/**
 * Handles the form submission to save marks, prevents the default form behavior,
 * and performs the necessary actions to save the marks.
 *
 * @param {Event} event - The event object associated with the form submission.
 */
function saveMarks(event) {
    event.preventDefault()
    let benchpress = document.getElementById('benchpress').value
    let deadlift = document.getElementById('deadlift').value
    let backsquat = document.getElementById('backsquat').value
    let frontsquat = document.getElementById('frontsquat').value
    let snatch = document.getElementById('snatch').value
    let cleanjerk = document.getElementById('cleanjerk').value
    let powerclean = document.getElementById('powerclean').value
    let squatclean = document.getElementById('squatclean').value
    let shpress = document.getElementById('shpress').value
    let pushpress = document.getElementById('pushpress').value

    
    let userRegistred = JSON.parse(sessionStorage.getItem('user'))
    let newResults = new Results (benchpress,deadlift,backsquat,frontsquat,snatch,cleanjerk,powerclean,squatclean,shpress,pushpress)
    //USER_DB.push(newResults)
    userRegistred.results = newResults
    sessionStorage.setItem('user', JSON.stringify(userRegistred))

    newResults.setItem()

}

/**

 *  - Buscarlo en la BBDD (sessionStorage) y actualizarlo en (LocalStorage)
 * 
 */

/**
 * Handles the sign-in form submission, prevents the default form behavior,
 * retrieves user input values, checks if a user exists in the USER_DB array,
 * and adds the new user to the array if it does not exist.
 *
 * @param {Event} event - The event object associated with the form submission.
 */
function onSignIn(event) {     // REGISTRARSE
    event.preventDefault() // prevent para que no ejecute y refresque con Submit
    let nameElement = document.getElementById('name')
    let name = /**@type {HTMLInputElement} */(nameElement)?.value
    let emailElement = document.getElementById('email')
    let email = /**@type {HTMLInputElement} */(emailElement)?.value

    let newUser = new User(name, email)

    //ANTES DE DAR DE ALTA, REVISAR SI YA EXISTE EN DB

    if (USER_DB.get().findIndex((/** @type User */user) => user.email === email) >=0) {
        //mostramos el mensaje de error y salimos
        document.getElementById('signInFail')?.classList.remove('hidden')
        setTimeout(() => { 
            document.getElementById('signInFail')?.classList.add('hidden')
        },2000)
        return
    }
    //En caso contrario, si el usuario no existe continuamos
    document.getElementById('signInFail')?.classList.add('hidden')
    
   //METEMOS EN LA VARIABLE USER_DB el nuevo Usuario(newUser)
    USER_DB.push(newUser)
     // Actualizamos en el local Storage el nuevo Usuario
    updateUserDB()
    //En caso de que todo este Ok! informamos que el usuario ha sido registrado
    document.getElementById('signInOk')?.classList.remove('hidden')
    setTimeout(() => { 
        document.getElementById('signInOk')?.classList.add('hidden')
    },2000)
    
}



/**
 * Called when the user wants to log in.
 * Prevents the default form behavior, retrieves user input values, checks if a user exists in the USER_DB array,
 * and logs the result to the console.
 * If the user exists, it updates the UI to show the user link and log out form,
 * while hiding the sign-in and log-in forms. If no user is logged in and the current
 * page is not the home page, it redirects to the home page.
 * @param {Event} event - The event object associated with the form submission.
 */
function onlogIn(event) {    //  INICIAR SESION
    event.preventDefault()
   let nameElement = document.getElementById('name')
    let name = /**@type {HTMLInputElement} */(nameElement)?.value
    let emailElement = document.getElementById('email')
    let email = /**@type {HTMLInputElement} */(emailElement)?.value

    //Comprobamos si el usuario existe en la DB
    
    let userRegistred = USER_DB.get().findIndex(( /** @type User */user) => user.name === name && user.email === email)


    //INFORMAR QUE SE HA ENCONTRADO EL USUARIO
    if (userRegistred >= 0) {  //hacemos visible el parrafo de error de logIn
        sessionStorage.setItem('user', JSON.stringify(USER_DB.get()[userRegistred]))
        document.getElementById('logInOk')?.classList.remove('hidden')
        setTimeout(() => { 
            document.getElementById('logInOk')?.classList.add('hidden')
        },4000)
       document.getElementById('signInForm')?.classList.add('hidden')
       document.getElementById('logInForm')?.classList.add('hidden')
       document.getElementById('logOut')?.classList.remove('hidden')
       document.getElementById('myAccount')?.classList.remove('hidden')
       
        
    } else { 
        document.getElementById('logInFail')?.classList.remove('hidden')
        setTimeout(() => { 
            document.getElementById('logInFail')?.classList.add('hidden')
        },4000)
        
    
    } 
 
}
/**
 * Called when the user wants to log out.
 * Removes the user session from local storage.
 * Hides the user options and shows the sign-in and log-in forms again.
 * Redirects to the home page.
 * @param {Event} event - The event object associated with the form submission.
 */
function onLogOut(event) {
    event.preventDefault()
    // Eliminar la sesión del usuario
    sessionStorage.removeItem('user')
    //Volvemos a ocular opciones de usuario, y sacamos formulario de registro "landing page"
    document.getElementById('signInForm')?.classList.remove('hidden')
    document.getElementById('logInForm')?.classList.remove('hidden')
    document.getElementById('logOut')?.classList.add('hidden')
    document.getElementById('myAccount')?.classList.add('hidden')
    location.href = '/index.html'
}

//BORRAR USUARIO

/**
 * Called when the user wants to sign out.
 * Removes the user data from local storage and session storage.
 * Hides the user options and shows the sign-in and log-in forms again.
 * Redirects to the home page.
 * @param {Event} event - The event object associated with the form submission.
 */
 function onSignOut(event) {
     event.preventDefault()
     localStorage.removeItem('USER_DB')
     sessionStorage.removeItem('user')

    document.getElementById('logOut')?.classList.add('hidden')
    document.getElementById('signInForm')?.classList.remove('hidden')
    document.getElementById('logInForm')?.classList.remove('hidden')
    location.href = '/index.html'

}


function updateUserDB () {
    localStorage.setItem('USER_DB', JSON.stringify(USER_DB.get()))
}


/**
 * Reads the USER_DB from local storage and updates the USER_DB array.
 * If local storage contains USER_DB, it parses it and adds it to the USER_DB array.
 * If USER_DB is undefined, it does nothing.
 * Logs the USER_DB to the console.
 */
function readUserDB () {
    let savedUsers = []

    if (localStorage.getItem('USER_DB')) {
        let localStorageUSERDB = localStorage.getItem('USER_DB')

        if (localStorageUSERDB === null) {
            localStorageUSERDB = ''
        }           
        savedUsers = JSON.parse(localStorageUSERDB)
            

    } if (USER_DB.get() === undefined) 

    

    USER_DB.push(...savedUsers)
    console.log(USER_DB.get())

    
} 





