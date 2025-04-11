//@ts-check

import { User } from "./classes/User.js"
import { INITIAL_STATE, store } from "./store/redux.js"
import { Results } from "./classes/Results.js"
import { Admin } from "./classes/Admin.js"

window.addEventListener("DOMContentLoaded", onDOMContentLoaded)

function onDOMContentLoaded() {

    let signIn = document.getElementById('signIn')
    let logIn = document.getElementById('logIn')
    let logOut = document.getElementById('logOut')
    let signOut = document.getElementById('signOut')
    let saveMarks = document.getElementById('saveResults')
    let showLogInAdmin = document.getElementById('panelAdmin')


    signIn?.addEventListener('submit', funSignIn)
    logIn?.addEventListener('submit', funLogIn)
    logOut?.addEventListener('click', funLogOut)
    signOut?.addEventListener('submit', funSignOut)
    saveMarks?.addEventListener('submit', saveResults)
    showLogInAdmin?.addEventListener('click', showPanelAdmin)
    readUserDB()
    checkLogIn()
    console.log('UsuariosGuardados', store.getState())
}

/**
 * Handles the sign-in form submission, prevents the default form behavior,
 * retrieves user input values, creates a new User instance, and adds it to
 * the store.
 *
 * @param {Event} event - The event object associated with the form submission.
 */

function funSignIn(event) {
    event.preventDefault()

    let emailElement = document.getElementById('signInEmail')
    let email = /**@type {HTMLInputElement} */(emailElement)?.value
    let passwordElement = document.getElementById('signInPassword')
    let password = /**@type {HTMLInputElement} */(passwordElement)?.value
    let newUser = new User(email,password,undefined, undefined ,undefined ,undefined)
    // console.log('busco en la BBDD el email ' + email, store.user.getByEmail?.(email))
    if (store.user.getByEmail?.(email) !== undefined) {
        document.getElementById('signInFail')?.classList.remove('hidden')
        return
    }

    store.user.create(newUser)
    console.log(store.getState())
    updateUserDB()
    document.getElementById('signInOk')?.classList.remove('hidden')
    document.getElementById('signInFail')?.classList.add('hidden')
    setTimeout(() => {
        document.getElementById('signInOk')?.classList.add('hidden')
    }, 4000)

}

/**
 * Handles the login form submission, prevents the default form behavior,
 * retrieves user input values, checks if a user exists in the store,
 * and logs the result to the console. If the user exists, it saves the
 * user data to the session storage.
 *
 * @param {Event} event - The event object associated with the form submission.
 */



function funLogIn(event) {
    event.preventDefault()
    let emailElement = document.getElementById('logInEmail')
    let email = /**@type {HTMLInputElement} */(emailElement)?.value
    let passwordElement = document.getElementById('logInPassword')
    let password = /**@type {HTMLInputElement} */(passwordElement)?.value

    let userRegistred = store.user.getAll().find(( /** @type User */user) => user.email === email && user.password === password)
    
    if (userRegistred !== undefined) {
        console.log('Inicio sesion User ID:', userRegistred._id)
        let userFromREDUX = store.user.getById?.(userRegistred._id)
        sessionStorage.setItem('user', JSON.stringify(userFromREDUX))
        document.getElementById('logInOk')?.classList.remove('hidden')
        document.getElementById('signIn')?.classList.add('hidden')
        document.getElementById('logIn')?.classList.add('hidden')
        document.getElementById('saveResults')?.classList.remove('hidden')
        document.getElementById('signInUserForm')?.classList.add('hidden')
        document.getElementById('myAccount')?.classList.remove('hidden')
        location.href = "./mainMenu.html"
        setTimeout(() => {
            document.getElementById('logInOk')?.classList.add('hidden')
        }, 4000)
    } else {
        console.log(' ID not found ')
        document.getElementById('logInFail')?.classList.remove('hidden')
        setTimeout(() => {
            document.getElementById('logInFail')?.classList.add('hidden')
        }, 4000)
    }
}

/**
 * LLama al evento cuando el usuario quiere salir de la sesion
 * Borra solamente el sessionStorage y devuelve al inicio

 * @param {Event} event - The event object associated with the form submission.
 */
function funLogOut(event) {
    event.preventDefault()
    sessionStorage.removeItem('user')
    location.href = "./index.html"
}

/**
 * 
 * Evento llamado cuando el usuario quiere borrar el usuario
 * Borra tanto el local como el session Storage.
 * @param {Event} event - The event object associated with the form submission.
 */
function funSignOut(event) {
    event.preventDefault()

    if (sessionStorage.getItem('user') && confirm('¿Estás seguro de borrar tu usuario?')) {
        let storedUser = sessionStorage.getItem('user')
        if (storedUser === null) {
            storedUser = ''
        }
        store.user.delete(JSON.parse(storedUser)) // Eliminar el usuario del store
        console.log('Compruebo que esté borrado el usuario', store.user.getAll())
        sessionStorage.removeItem('user') // Eliminar del sessionStorage
        updateUserDB() // Actualizar la base de datos de usuarios en localStorage
        location.href = "./index.html"
    }
}

function checkLogIn() {

    if (sessionStorage.getItem('user')) {
        document.getElementById('signIn')?.classList.add('hidden')
        document.getElementById('logIn')?.classList.add('hidden')
        document.getElementById('saveResults')?.classList.remove('hidden')
        document.getElementById('signInUserForm')?.classList.add('hidden')
    } else if (location.pathname !== '/mainMenu.html') {
        // Redirigimos a la home si el usuario no está identificado
        
    }

}

function showPanelAdmin(event) {
    event.preventDefault()
    document.getElementById('signInAdminForm')?.classList.remove('hidden') 

}


/**
 * Handles the save results form submission, prevents the default form behavior,
 * retrieves user input values, creates a new Results instance, and adds it to
 * the store.
 *
 * @param {Event} event - The event object associated with the form submission.
 */
function saveResults(event) {
    event.preventDefault()

    let benchPressElement = document.getElementById('benchpress')
    let benchPress = /**@type {HTMLInputElement} */(benchPressElement)?.value
    let deadliftElement = document.getElementById('deadlift')
    let deadlift = /**@type {HTMLInputElement} */(deadliftElement)?.value
    let backSquatElement = document.getElementById('backsquat')
    let backsquat = /**@type {HTMLInputElement} */(backSquatElement)?.value
    let frontsquatElement = document.getElementById('frontsquat')
    let frontsquat = /**@type {HTMLInputElement} */(frontsquatElement)?.value
    let snatchElement = document.getElementById('snatch')
    let snatch = /**@type {HTMLInputElement} */(snatchElement)?.value
    let cleanjerkElement = document.getElementById('cleanjerk')
    let cleanjerk = /**@type {HTMLInputElement} */(cleanjerkElement)?.value
    let powercleanElement = document.getElementById('powerclean')
    let powerclean = /**@type {HTMLInputElement} */(powercleanElement)?.value
    let squatcleanElement = document.getElementById('squatclean')
    let squatclean = /**@type {HTMLInputElement} */(squatcleanElement)?.value
    let shpressElement = document.getElementById('shpress')
    let shpress = /**@type {HTMLInputElement} */(shpressElement)?.value
    let pushpressElement = document.getElementById('pushpress')
    let pushpress = /**@type {HTMLInputElement} */(pushpressElement)?.value

    if (sessionStorage.getItem('user')) {
        let userRegistred = sessionStorage.getItem('user')
        if (userRegistred === null) {
            userRegistred = ''
        }
    }
    let userRegistred = JSON.parse(/**@type {String} */(sessionStorage.getItem('user')))
    let newResults = new Results(benchPress, deadlift, backsquat, frontsquat, snatch, cleanjerk, powerclean, squatclean, shpress, pushpress)
    userRegistred.results = newResults
    sessionStorage.setItem('user', JSON.stringify(userRegistred))
    store.user.update(userRegistred)

    updateUserDB()
}

/**
 * Updates the local storage with the latest state of the store's User array.
 */

//ACTUALIZA EL LOCALSTORAGE CON LO QUE TENGO EN LA REDUX
function updateUserDB() {
    let localStoredString = localStorage.getItem('REDUX_DB')
    let localStoredData = JSON.parse(localStoredString || '')
    localStoredData.users = [...store.user.getAll()]
    localStorage.setItem('REDUX_DB', JSON.stringify(localStoredData))
}


//LEER LO QUE TENGO EN EL LOCALSTORAGE Y ACTUALIZO LA REDUX STORE
function readUserDB() {
    let savedUsers = []

    if (localStorage.getItem('REDUX_DB')) {
        console.log('Existen usuario en el localStorage, en ese caso los identificamos')
        let localStorageREDUX_DB = localStorage.getItem('REDUX_DB')

        if (localStorageREDUX_DB === null) {
            localStorageREDUX_DB = ''
        }
        savedUsers = JSON.parse(localStorageREDUX_DB)
            ?.users
    } else {
        console.log('Si no existen usuario, vuelve al INITIAL_STATE del Store []')
        localStorage.setItem('REDUX_DB', JSON.stringify(INITIAL_STATE))
    }
    console.log('Muestra el valor de savedUsers', savedUsers)
    savedUsers.forEach((/** @type {User} */newUser) => {
        store.user.create(newUser, () => { console.log('Usuario creado') })
    })

}






