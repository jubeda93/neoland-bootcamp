import {User} from "./clases/User.js"
import { SingletonDB } from "./clases/SingeltonDB.js"

window.addEventListener("DOMContentLoaded", onDOMContentLoaded )

//constante donde guardaremos los Usuarios
const USER_DB = new SingletonDB()

function onDOMContentLoaded () {
    let signIn = document.getElementById('signInForm')
    let logIn = document.getElementById('logInForm')
    let logOut = document.getElementById('logOut')
    let signOut = document.getElementById('signOut')


    signIn?.addEventListener('submit', onSignIn)
    logIn?.addEventListener('submit', onlogIn)
    logOut?.addEventListener('submit', onLogOut)
    signOut?.addEventListener('submit', onSignOut)


    readUserDB()
   
        
}

function onSignIn(event) {     // REGISTRARSE
    event.preventDefault() // prevent para que no ejecute y refresque con Submit
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let newUser = new User(name, email)

    //ANTES DE DAR DE ALTA, REVISAR SI YA EXISTE EN DB

    //comprobarmos que existe en la lista de usuarios en la DB
    //lo sabemos porque el Index es >=0,
    if (USER_DB.get().findIndex((user) => user.email === email) >=0) {
        //mostramos el mensaje de error y salimos
        document.getElementById('signInFail').classList.remove('hidden')
        setTimeout(() => { 
            document.getElementById('signInFail').classList.add('hidden')
        },2000)
        return
    }
    //En caso contrario, si el usuario no existe continuamos
    document.getElementById('signInFail').classList.add('hidden')
    
   //METEMOS EN LA VARIABLE USER_DB el nuevo Usuario(newUser)
    USER_DB.push(newUser)
     // Actualizamos en el local Storage el nuevo Usuario
    updateUserDB()
    //En caso de que todo este Ok! informamos que el usuario ha sido registrado
    document.getElementById('signInOk').classList.remove('hidden')
    setTimeout(() => { 
        document.getElementById('signInOk').classList.add('hidden')
    },2000)
    
}



function onlogIn(event) {    //  INICIAR SESION
    event.preventDefault()
    let name = document.getElementById('logName').value
    let email = document.getElementById('logEmail').value 

    //Comprobamos si el usuario existe en la DB
    let userRegistred = USER_DB.get().findIndex((user) => user.name === name && user.email === email)


    //INFORMAR QUE SE HA ENCONTRADO EL USUARIO
    if (userRegistred >= 0) {  //hacemos visible el parrafo de error de logIn
        sessionStorage.setItem('user', JSON.stringify(USER_DB.get()[userRegistred]))
        document.getElementById('logInOk').classList.remove('hidden')
        setTimeout(() => { 
            document.getElementById('logInOk').classList.add('hidden')
        },4000)
       document.getElementById('signInForm').classList.add('hidden')
       document.getElementById('logInForm').classList.add('hidden')
       document.getElementById('logOut').classList.remove('hidden')
       document.getElementById('myAccount').classList.remove('hidden')
       
        
    } else { 
        document.getElementById('logInFail').classList.remove('hidden')
        setTimeout(() => { 
            document.getElementById('logInFail').classList.add('hidden')
        },4000)
        
    
    } 
 
}

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


function readUserDB () {
    let savedUsers = []

    if (localStorage.getItem('USER_DB')) {
        savedUsers = JSON.parse(localStorage.getItem('USER_DB'))

    } if (USER_DB.get() === undefined) {

    }

    USER_DB.push(...savedUsers)
    console.log(USER_DB.get())

    
} 





