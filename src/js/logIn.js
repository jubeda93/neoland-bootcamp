// @ts-check
import { User } from "classes/User"
import { simpleFetch } from 'lib/simpleFetch'
import { HttpError } from 'classes/HttpError'
import { Results } from "classes/Results"
import { store, INITIAL_STATE } from 'store/redux'
// import { Admin } from "./classes/Admin.js"


//para cuando trabajemos con Express
const API_PORT = location.port ? `:${1999}` : ''
const TIMEOUT = 10000

window.addEventListener("DOMContentLoaded", onDOMContentLoaded)

/**
 * Evento que se lanza cuando el contenido de la página ha sido cargado en memoria
 * y se puede acceder a él.
 * Añade los listeners a los botones para que cuando se hagan click se ejecuten
 * las funciones correspondientes.
 * @listens DOMContentLoaded
 */

function onDOMContentLoaded() {

  let signIn = document.getElementById('signIn')
  let logIn = document.getElementById('logIn')
  let logOut = document.getElementById('logOut')
  let signOut = document.getElementById('signOut')
  let saveMarks = document.getElementById('saveResults')
  let newUserForm = document.getElementById('newUser')
  let LogUser = document.getElementById('userLog')


  signIn?.addEventListener('submit', funSignIn)
  logIn?.addEventListener('submit', funLogIn)
  logOut?.addEventListener('click', funLogOut)
  signOut?.addEventListener('submit', funSignOut)
  saveMarks?.addEventListener('submit', saveResults)
  newUserForm?.addEventListener('click', showNewUser)
  LogUser?.addEventListener('click', showLogUser)

  // readUserDB()
  // checkLogIn()

}

/**   Funcion que recoge los datos de email y contraseña
 *    Checkear si este usuario ya existe por email (TODO)
 *    Crea un nuevo usuario y lo guarda en la DDBB
 */

async function funSignIn(event) {
  event.preventDefault()

  let emailElement = document.getElementById('signInEmail')
  let email = /**@type {HTMLInputElement} */(emailElement)?.value
  let passwordElement = document.getElementById('signInPassword')
  let password = /**@type {HTMLInputElement} */(passwordElement)?.value

  let newUser = new User(email, password)
  const payload = new URLSearchParams(/** @type {any} */(newUser))
  // const payload = JSON.stringify(newUser)


  const apiData = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/create/users`, 'POST', payload)
  console.log('Respues del servidor de API', JSON.stringify(apiData))
  
  if (typeof apiData === 'object' ) {
    // Informo al usuario del resultado de la operacions
    document.getElementById('signInFail')?.classList.remove('hidden')
    setTimeout(() => {
      document.getElementById('signInFail')?.classList.add('hidden')
    }, 4000)
    console.log('ERROR al crear el usuario', newUser.email,)
    return
  } else {
    document.getElementById('signInOk')?.classList.remove('hidden')
    setTimeout(() => {
      document.getElementById('signInOk')?.classList.add('hidden')
    }, 4000)

  }






}

/**
 * Handles the login form submission, prevents the default form behavior,
 * retrieves user input values, checks if a user exists in the store,
 * and logs the result to the console. If the user exists, it saves the
 * user data to the session storage.
 *
 * @param {Event} event - The event object associated with the form submission.
 */

async function funLogIn(event) {
  event.preventDefault()
  let emailElement = document.getElementById('logInEmail')
  let email = /**@type {HTMLInputElement} */(emailElement)?.value
  let passwordElement = document.getElementById('logInPassword')
  let password = /**@type {HTMLInputElement} */(passwordElement)?.value

  const apiData = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/read/users`, 'GET')
  console.log(apiData)

  const userExists = apiData.some(user => user.email === email && user.password === password)
  console.log(userExists)

  if (userExists) {
    // El usuario existe, puedes proceder con la autenticación
    let userFromApiData = apiData[0]
    sessionStorage.setItem('User', JSON.stringify(userFromApiData))
    document.getElementById('logInOk')?.classList.remove('hidden')
    // location.href = "./mainMenu.html"
    setTimeout(() => {
      document.getElementById('logInOk')?.classList.add('hidden')
    }, 4000)
    console.log('El usuario existe')
    // ...
  } else {
    // El usuario no existe, puedes mostrar un error
    console.log('El usuario no existe')
    document.getElementById('logInFail')?.classList.remove('hidden')
    setTimeout(() => {
      document.getElementById('logInFail')?.classList.add('hidden')
    }, 4000)
  }
}

// // const payload = JSON.stringify(logUser)
// const payload = new URLSearchParams(/** @type {any} */(logUser))


//   if (apiData.length >= 0) {
//     let userFromApiData = apiData[0]
//     sessionStorage.setItem('user', JSON.stringify(userFromApiData))
//     console.log('Iniciando sesion, usuario:', userFromApiData)
//     document.getElementById('logInOk')?.classList.remove('hidden')
//     location.href = "./mainMenu.html"
//     setTimeout(() => {
//       document.getElementById('logInOk')?.classList.add('hidden')
//     }, 4000)
//   } else {
//     console.log(' ID not found, usuario incorrecto')
//     document.getElementById('logInFail')?.classList.remove('hidden')
//     setTimeout(() => {
//       document.getElementById('logInFail')?.classList.add('hidden')
//     }, 4000)
//   }
// }

async function funSignOut(/** @type {any} */event) {
  event.preventDefault()

  //comprobamos si hay algun usuario en SessionStorage Loggeado
  if (sessionStorage.getItem('user') && confirm('¿Estás seguro de borrar tu usuario?')) {

    // Parseamos el la cadena de texto para convertia objeto y poder tratarlo como Objeto
    let storedUser = JSON.parse(sessionStorage.getItem('user') || '')
    //observamos en console log que me duvuelve este objeto(id del usuario)
    console.log(storedUser._id)
    // Borramos de la base de datos(JSON) 
    const apiData = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/delete/users/${storedUser._id}`, 'DELETE')
    const apiDataJson = JSON.parse(/** @type {any} */(apiData))

    // Eliminar del sessionStorage
    sessionStorage.removeItem('user')
    location.href = "./index.html"
    console.log(apiDataJson)
  } else {
    alert('(Usuario no identificado) redirigiendo al Inicio');
    location.href = "./index.html"
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

function showNewUser(event) {
  event.preventDefault()
  document.getElementById('signIn')?.classList.remove('hidden')
  document.getElementById('logIn')?.classList.add('hidden')
}
function showLogUser(event) {
  event.preventDefault()
  document.getElementById('signIn')?.classList.add('hidden')
  document.getElementById('logIn')?.classList.remove('hidden')
}

/**
 * 
 * Evento llamado cuando el usuario quiere borrar el usuario
 * Borra tanto el local como el session Storage.
 * @param {Event} event - The event object associated with the form submission.
 */


// function checkLogIn() {

//     if (sessionStorage.getItem('user')) {
//         document.getElementById('signIn')?.classList.add('hidden')
//         document.getElementById('logIn')?.classList.add('hidden')
//         document.getElementById('saveResults')?.classList.remove('hidden')
//         document.getElementById('signInUserForm')?.classList.add('hidden')
//     } else if (location.pathname !== '/mainMenu.html') {
//         // Redirigimos a la home si el usuario no está identificado

//     }

// }




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


}


// /**
//  * Checks if there is a user logged in by verifying the presence of a token
//  * in the local storage.
//  *
//  * @returns {boolean} True if the user is logged in, false otherwise.
//  */
// export function getDataFromLocalStorage() {
//   const defaultValue = JSON.stringify(INITIAL_STATE)
//   return JSON.parse(localStorage.getItem('REDUX_DB') || defaultValue)
// }

/**
 * Retrieves the shopping list data from session storage.
 *
 * @returns {State} Saved state.
 * If no data is found, returns an empty State object.
 */

function getDataFromSessionStorage() {
  const defaultValue = JSON.stringify(INITIAL_STATE)
  return JSON.parse(sessionStorage.getItem('REDUX_DB') || defaultValue)
}

/**
 * Get data from API
 * @param {string} apiURL
 * @param {string} method
 * @param {any} [data]
 * @returns {Promise<Array< User >>}
 */
async function getAPIData(apiURL, method = 'GET', data) {
  let apiData

  try {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Access-Control-Allow-Origin', '*')
    if (data) {
      headers.append('Content-Length', String(JSON.stringify(data).length))
    }
    // Añadimos la cabecera Authorization si el usuario esta logueado
    // if (isUserLoggedIn()) {
    //   const userData = getDataFromSessionStorage()
    //   headers.append('Authorization', `Bearer ${userData?.user?.token}`)
    // }
    apiData = await simpleFetch(apiURL, {
      // Si la petición tarda demasiado, la abortamos
      signal: AbortSignal.timeout(TIMEOUT),
      method: method,
      body: data ?? undefined,
      headers: headers
    });
  } catch (/** @type {any | HttpError} */err) {
    // En caso de error, controlamos según el tipo de error
    if (err.name === 'AbortError') {
      console.error('Fetch abortado');
    }
    if (err instanceof HttpError) {
      if (err.response.status === 404) {
        console.error('Not found');
      }
      if (err.response.status === 500) {
        console.error('Internal server error');
      }
    }
  }

  return apiData
}

/**
 * Checks if there is a user logged in by verifying the presence of a token
 * in the local storage.
 *
 * @returns {boolean} True if the user is logged in, false otherwise.
 */
// function isUserLoggedIn() {
//   const userData = getDataFromSessionStorage()
//   return userData?.user?.token
// }



