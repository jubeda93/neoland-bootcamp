//Definiendo la clase ( primera letra de la clase, siempre en mayus)
//@ts-check
/** @import {Results} from "./results.js" */
export class User {  

    /**
     * Constructor de la clase User
     * @param {string} name - nombre del usuario
     * @param {string} email - email del usuario
     * @param {'user' | 'admin' | 'coach'} [rol = 'user']
     * @param {Results | {}} [results={}]
     * 
     */
    constructor(name, email, rol = 'user', results={}) {
        const timestamp = new Date()
        // manera de generar un id aleatorio
        this.name = name
        this.email = email
        this.rol = rol
        this.results = results
        this._id = String(timestamp.getTime())

    }
}
    

