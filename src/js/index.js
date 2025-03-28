import {User, UserDatos} from "./clases/User.js"

window.addEventListener("DOMContentLoaded", onDOMContentLoaded )

//constante donde guardaremos los Usuarios
const USER_DB = []

function onDOMContentLoaded () {
    let signIn = document.getElementById('signIn')

    signIn.addEventListener('submit', signInForm)
        
}

function signInForm(event) {
    event.preventDefault()
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let newUser = new User(name, email)

    USER_DB.push(newUser)
    updateUserDB()

    //Hacemos visible el texto oculto de Registro
    document.getElementById('signInOk').classList.add('show')

}

function logIn(event) {
    let name = document.getElementById('logName').value
    let email = document.getElementById('logEmail').value 

    //buscar en BD si el usuario existe
    let userRegistred = USER_DB.findIndex((user) => user.name === name && user.email === email)
    
    if (userRegistred >= 0) {
        document.getElementById('logInOk').classList.add('show')

    } 
    
}

function updateUserDB () {
    localStorage.setItem('USER_DB', JSON.stringify(USER_DB))
}





