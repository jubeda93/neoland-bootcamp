// @ts-check
// import { User } from "classes/User"
// import { getAPIData } from "./getAPIData.js"

//para cuando trabajemos con Express
export const API_PORT = location.port ? `:${1993}` : ''
// const TIMEOUT = 10000

window.addEventListener("DOMContentLoaded", onDOMContentLoaded)

/**
 * Evento que se lanza cuando el contenido de la página ha sido cargado en memoria
 * y se puede acceder a él.
 * Añade los listeners a los botones para que cuando se hagan click/submit se ejecuten
 * las funciones correspondientes.
 * @listens DOMContentLoaded
 */

function onDOMContentLoaded() {

  // let signIn = document.getElementById('signIn')
  // let logIn = document.getElementById('logIn')
  // let signOut = document.getElementById('signOut')
  let logOut = document.getElementById('logOut')
  // let newUserForm = document.getElementById('newUser')
  let logUserForm = document.getElementById('userLog')
  
  // signIn?.addEventListener('submit', funSignIn)
  // logIn?.addEventListener('submit', funLogIn)
  // signOut?.addEventListener('submit', funSignOut)
  logOut?.addEventListener('click', funLogOut)
  // newUserForm?.addEventListener('click', showNewUserForm)
  logUserForm?.addEventListener('click', showLogInForm)

  
}

/**
 * LLama al evento cuando el usuario quiere salir de la sesion
 * Borra solamente el sessionStorage y devuelve al inicio

 * @param {Event} event - The event object associated with the form submission.
 */
function funLogOut(event) {
  event.preventDefault()
  sessionStorage.removeItem('User')
  window.location.href = "./index.html"
}

// function showNewUserForm () {
//   document.getElementById('signIn')?.classList.remove('hidden')
//   document.getElementById('logIn')?.classList.add('hidden')
//   console.log('Sacamos registerForm')
// }
function showLogInForm () {
  document.getElementById('logIn')?.classList.remove('hidden')
  document.getElementById('signIn')?.classList.add('hidden')
  console.log('Sacamos LogInForm')
}














/**
 * Handles the sign-in form submission, prevents the default form behavior,
 * retrieves user input values, creates a new User instance, and adds it to
 * the USER_DB array. Finally, logs the updated USER_DB to the console.
 *
 * @param {Event} event - The event object associated with the form submission.
 */


//======================== SIGN IN ========================//

// async function funSignIn(event) {
//   event.preventDefault()
//   let emailElement = document.getElementById('signInEmail')
//   let email = /**@type {HTMLInputElement} */(emailElement)?.value
//   let passwordElement = document.getElementById('signInPassword')
//   let password = /**@type {HTMLInputElement} */(passwordElement)?.value

//   let newUser = new User(email, password)

//   console.log('newUser',newUser, typeof newUser)
//   const payload = JSON.stringify(newUser)
//   console.log('payload',payload,typeof payload)
//   const apiData = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/create/users`,'POST', payload)
  
//   if (!apiData) {
//     // Informo al usuario del resultado de la operacions
//     document.getElementById('signInFail')?.classList.remove('hidden')
//     setTimeout(() => {
//       document.getElementById('signInFail')?.classList.add('hidden')
//     }, 4000)
//     console.log('ERROR al crear el usuario', newUser.email,)
//     return
//   } else {
//     document.getElementById('signInOk')?.classList.remove('hidden')
//     setTimeout(() => {
//       document.getElementById('signInOk')?.classList.add('hidden')
//     }, 4000)
//     console.log('Usuario creado', newUser.email,)
//   }
// }

/**
 * Handles the login form submission, prevents the default form behavior,
 * retrieves user input values, checks if a user exists in the store,
 * and logs the result to the console. If the user exists, it saves the
 * user data to the session storage.
 *
 * @param {Event} event - The event object associated with the form submission.
 */

//======================== LOG IN ========================//

// async function funLogIn(event) {
//   event.preventDefault()
//   let emailElement = document.getElementById('logInEmail')
//   let email = /**@type {HTMLInputElement} */(emailElement)?.value
//   let passwordElement = document.getElementById('logInPassword')
//   let password = /**@type {HTMLInputElement} */(passwordElement)?.value
//   let newUser = new User(email, password, 'user')

//   const payload = JSON.stringify(newUser)
//   console.log('payload',payload, typeof payload)

//   const apiData = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/login`, 'POST', payload)

//   console.log(typeof apiData, apiData) 

//   if (!apiData) {
//     console.log('El usuario no existe')
//     document.getElementById('logInFail')?.classList.remove('hidden')
//     setTimeout(() => {
//       document.getElementById('logInFail')?.classList.add('hidden')
//     }, 4000)
//     return

//   } else {
//     // El usuario existe, puedes proceder con la autenticación
//     sessionStorage.setItem('User', JSON.stringify(apiData))
//     document.getElementById('logInOk')?.classList.remove('hidden')
//     window.location.href = "./mainMenu.html"
//     setTimeout(() => {
//       document.getElementById('logInOk')?.classList.add('hidden')
//     }, 4000)
//     console.log('El usuario existe')
//   }
// }

//======================== SIGN OUT ========================//

// async function funSignOut(/** @type {any} */event) {
//   event.preventDefault()
 

//   //comprobamos si hay algun usuario en SessionStorage Loggeado
//   if (sessionStorage.getItem('User') && confirm('¿Estás seguro de borrar tu usuario?')) {

//     // Parseamos el la cadena de texto para convertia objeto y poder tratarlo como Objeto
//     let userLogged = JSON.parse(sessionStorage.getItem('User') || '')
//     //observamos en console log que me duvuelve este objeto(id del usuario)
  
//     // Borramos de la base de datos(JSON) 
//     const apiData = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/delete/users/${userLogged._id}`, 'DELETE')
//     console.log(typeof apiData,apiData)
//     // Eliminar del sessionStorage
//     sessionStorage.removeItem('User')
//     location.href = "./index.html"
//   } else {
//     alert('(Usuario no identificado) redirigiendo al Inicio');
//     location.href = "./index.html"
//   }
// }

/**
 * LLama al evento cuando el usuario quiere salir de la sesion
 * Borra solamente el sessionStorage y devuelve al inicio

 * @param {Event} event - The event object associated with the form submission.
 */

//======================== LOG OUT ========================//