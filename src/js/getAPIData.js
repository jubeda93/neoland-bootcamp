import { simpleFetch } from 'lib/simpleFetch'
import { HttpError } from 'classes/HttpError'


const TIMEOUT = 10000

/**
 * Get data from API
 * @param {string} apiURL
 * @param {string} method
 * @param {any} [data]
 * @returns {Promise<Array< User >>}
 */
export async function getAPIData(apiURL, method = 'GET', data) {
  let apiData

  try {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Access-Control-Allow-Origin', '*')
    if (data) {
      headers.append('Content-Length', String(JSON.stringify(data).length))
    }
    // Añadimos la cabecera Authorization si el usuario esta logueado
    if (isUserLoggedIn()) {
      const userData = getDataFromSessionStorage()
      headers.append('Authorization', `Bearer ${userData?.token}`)
    }
    apiData = await simpleFetch(apiURL, {
      // Si la petición tarda demasiado, la abortamos
      signal: AbortSignal.timeout(TIMEOUT),
      method: method,
      body: data ? JSON.stringify(data) : undefined,
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
 * in the session storage.
 *
 * @returns {boolean} True if the user is logged in, false otherwise.
 *
 */
function isUserLoggedIn() {
    const userData = getDataFromSessionStorage()
    return userData?.token
  }

  /**
 * Retrieves the user data stored in session storage.
 *
 * @returns {Object} The parsed user data from session storage, or an empty
 * object if no user data is found.
 */


export function getDataFromSessionStorage() {
    const defaultValue = JSON.stringify({})
    return JSON.parse(sessionStorage.getItem('User') || defaultValue)
  }

  /**
 * Retrieves the value from the specified input element.
 * @param {HTMLElement | null} inputElement - The input element from which to get the value.
 * @returns {string} The value of the input element, or an empty string if the element is null.
 */
export function getInputValue(inputElement) {
  if (inputElement) {
    return /** @type {HTMLInputElement} */(inputElement).value
  } else {
    return ''
  }
}
  