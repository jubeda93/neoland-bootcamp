//@ts-check
//import { User } from "./classes/User.js"
import { store } from "./store/redux.js"
import { DataProfile } from "./classes/DataProfile.js"

window.addEventListener("DOMContentLoaded", onDOMContentLoaded)

function onDOMContentLoaded() {

    let changeUserEmail = document.getElementById('changeEmail')
    let changeUserPass = document.getElementById('changePass')
    let saveData = document.getElementById('userDataForm')

    changeUserEmail?.addEventListener('submit', changeEmail)
    changeUserPass?.addEventListener('submit', changePass)
    saveData?.addEventListener('submit', saveDataProfile)

    updateUserDB()

}

//======= FUNCION DONDE ACTUALIZAMOS LOS DATOS DE PERFIL DEL USUARIO =======//

function saveDataProfile(event) {
    event.preventDefault()

    let nameElement = document.getElementById('userName')
    let name = /**@type {HTMLInputElement} */(nameElement)?.value
    let surnameElement = document.getElementById('userSurName')
    let surname = /**@type {HTMLInputElement} */(surnameElement)?.value
    let adressElement = document.getElementById('adress')
    let adress = /**@type {HTMLInputElement} */(adressElement)?.value
    let postalCodeElement = document.getElementById('postalCode')
    let postalCode = /**@type {HTMLInputElement} */(postalCodeElement)?.value
    let bornDateElement = document.getElementById('bornDate')
    let bornDate = /**@type {HTMLInputElement} */(bornDateElement)?.value
    let phoneNumElement = document.getElementById('phoneNum')
    let phoneNum = /**@type {HTMLInputElement} */(phoneNumElement)?.value
    let nameEmergElement = document.getElementById('nameEmerg')
    let nameEmerg = /**@type {HTMLInputElement} */(nameEmergElement)?.value
    let phoneEmergElement = document.getElementById('phoneEmerg')
    let phoneEmerg = /**@type {HTMLInputElement} */(phoneEmergElement)?.value

    if (sessionStorage.getItem('user')) {
        let userLogged = sessionStorage.getItem('user')
        if (userLogged === null) {
            userLogged = ''
        }
    }

    let userLogged = JSON.parse(/**@type {string} */(sessionStorage.getItem('user')))
    let newDataProfile = new DataProfile(name, surname, adress, postalCode, bornDate, phoneNum, nameEmerg, phoneEmerg)
    userLogged.dataprofile = newDataProfile
    sessionStorage.setItem('user', JSON.stringify(userLogged))
    store.user.update(userLogged)
    updateUserDB()

}



function changeEmail(event) {
    event.preventDefault()

    let userLogged = JSON.parse(/** @type {string} */(sessionStorage.getItem('user')))
    let emailOldDoc = document.getElementById('emailUserOld')
    let emailOld = /**@type {HTMLInputElement} */ (emailOldDoc)?.value
    if (userLogged.email === emailOld) {
        let emailNewDoc = document.getElementById('emailUserNew')
        let emailNew = /**@type {HTMLInputElement} */ (emailNewDoc)?.value
        userLogged.email = emailNew
        sessionStorage.setItem('user', JSON.stringify(userLogged))
        store.user.update(userLogged)
        alert('Email modificado correctamente!')
        updateUserDB()
    } else {
        alert('Este Email no coincide con el del usuario..')
    }

}
function changePass(event) {
    event.preventDefault()

    let userLogged = JSON.parse(/** @type {string} */(sessionStorage.getItem('user')))
    let passOldDoc = document.getElementById('passwordOld')
    let passOld = /**@type {HTMLInputElement} */ (passOldDoc)?.value
    if (userLogged.password === passOld) {
        let passwordNewDoc = document.getElementById('passwordNew')
        let passNew = /**@type {HTMLInputElement} */ (passwordNewDoc)?.value
        userLogged.password = passNew
        sessionStorage.setItem('user', JSON.stringify(userLogged))
        store.user.update(userLogged)
        updateUserDB()
        alert('Contraseña modificada correctamente!')
    } else {
        alert('La contraseña no coincide con la actual')
    }

}



function updateUserDB() {
    let localStoredString = localStorage.getItem('REDUX_DB')
    let localStoredData = JSON.parse(localStoredString || '')
    localStoredData.users = [...store.user.getAll()]
    localStorage.setItem('REDUX_DB', JSON.stringify(localStoredData))
}

