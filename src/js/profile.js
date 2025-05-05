//@ts-check
import { DataProfile } from "classes/DataProfile"
import { Results } from "classes/Results"
import { Metrics } from "classes/Metrics"
import { getAPIData } from "./getAPIData.js"

window.addEventListener("DOMContentLoaded", onDOMContentLoaded)

function onDOMContentLoaded() {

    
    let saveData = document.getElementById('userDataForm')
    let saveMetrics = document.getElementById('saveMetrics')
    let userResults = document.getElementById('saveResults')

    saveData?.addEventListener('submit', saveDataProfile)
    saveMetrics?.addEventListener('submit', saveBodyMetrics)
    userResults?.addEventListener('submit', saveResults)
    

}

const API_PORT = location.port ? `:${1993}` : ''


//======= FUNCION DONDE ACTUALIZAMOS LOS DATOS DE PERFIL DEL USUARIO =======//

/**
 * Handles the save data profile form submission, prevents the default form behavior,
 * retrieves user input values, creates a new DataProfile instance, updates the user
 * object in the session storage with the new data profile, and saves it.
 *
 * @param {Event} event - The event object associated with the form submission.
 */
async function saveDataProfile(event) {
    event.preventDefault()

    let nameElement = document.getElementById('userName')
    let name = /**@type {HTMLInputElement} */(nameElement)?.value
    let surnameElement = document.getElementById('userSurName')
    let surName = /**@type {HTMLInputElement} */(surnameElement)?.value
    let adressElement = document.getElementById('adress')
    let adress = /**@type {HTMLInputElement} */(adressElement)?.value
    let postalCodeElement = document.getElementById('postalCode')
    let postalCode = /**@type {HTMLInputElement} */(postalCodeElement)?.value
    let bornDateElement = document.getElementById('bornDate')
    let bornDate = /**@type {HTMLInputElement} */(bornDateElement)?.value
    let phoneNumElement = document.getElementById('phoneNum')
    let phone = /**@type {HTMLInputElement} */(phoneNumElement)?.value
    let nameEmergElement = document.getElementById('nameEmerg')
    let energName = /**@type {HTMLInputElement} */(nameEmergElement)?.value
    let phoneEmergElement = document.getElementById('phoneEmerg')
    let emergPhone = /**@type {HTMLInputElement} */(phoneEmergElement)?.value

    const userLogged = JSON.parse(sessionStorage.getItem('User') || '')
    const results = JSON.stringify(new DataProfile(name,surName,bornDate,phone,adress,postalCode,energName,emergPhone));
    await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/update/dataProfile/${userLogged._id}`, 'PUT', results);
    
}

async function dataProfile() {
  const userLogged = JSON.parse(sessionStorage.getItem('User' || ''));
  const response = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/user/${userLogged._id}`, 'GET');
}

/**
 * Handles the save results form submission, prevents the default form behavior,
 * retrieves user input values, creates a new Results instance, and adds it to
 * the store.
 *
 * @param {Event} event - The event object associated with the form submission.
 */
async function saveResults(event) {
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

  const userLogged = JSON.parse(sessionStorage.getItem('User') || '')
  const results = JSON.stringify(new Results(benchPress, deadlift, backsquat, frontsquat, snatch, cleanjerk, powerclean, squatclean, shpress, pushpress));
  await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/update/results/${userLogged._id}`, 'PUT', results);
  

}


/**
 * Handles the save body metrics form submission, prevents the default form behavior,
 * retrieves user input values, creates a new Metrics instance, and updates the user's
 * metrics in the database.
 *
 * @param {Event} event - The event object associated with the form submission.
 */
async function saveBodyMetrics(event) {
    event.preventDefault()
  
    let pesoElement = document.getElementById('peso')
    let peso = /**@type {HTMLInputElement} */(pesoElement)?.value
    let imcElement = document.getElementById('imc')
    let imc = /**@type {HTMLInputElement} */(imcElement)?.value
    let grasaElement = document.getElementById('grasa')
    let grasa = /**@type {HTMLInputElement} */(grasaElement)?.value
    let liquidoElement = document.getElementById('liquido')
    let liquido = /**@type {HTMLInputElement} */(liquidoElement)?.value
    let gastokcalElement = document.getElementById('gastokcal')
    let gastokcal = /**@type {HTMLInputElement} */(gastokcalElement)?.value
    let brazoDerElement = document.getElementById('brazoDer')
    let brazoDer = /**@type {HTMLInputElement} */(brazoDerElement)?.value  
    let brazoIzqElement = document.getElementById('brazoIzq')
    let brazoIzq = /**@type {HTMLInputElement} */(brazoIzqElement)?.value
    let toraxElement = document.getElementById('torax')
    let torax = /**@type {HTMLInputElement} */(toraxElement)?.value
    let cinturaElement = document.getElementById('cintura')    
    let cintura = /**@type {HTMLInputElement} */(cinturaElement)?.value
    let cuadricepsElement = document.getElementById('cuadriceps')
    let cuadriceps = /**@type {HTMLInputElement} */(cuadricepsElement)?.value
    let freqMediaElement = document.getElementById('freqMedia')
    let freqMedia = /**@type {HTMLInputElement} */(freqMediaElement)?.value    
    let freqMaxElement = document.getElementById('freqMax')
    let freqMax = /**@type {HTMLInputElement} */(freqMaxElement)?.value
  
  
    let userLogged = JSON.parse(sessionStorage.getItem('User') || '')
    const userMetrics = JSON.stringify(new Metrics(peso, imc, grasa, liquido, gastokcal, brazoDer, brazoIzq, torax, cintura, cuadriceps, freqMedia, freqMax));
    console.log(userMetrics)
    await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/update/metrics/${userLogged._id}`, 'PUT', userMetrics);
    
  }


