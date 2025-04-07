export class User {
    /** @import {Results} from './Results.js' */
    /**
     * Creates a new User instance.
     * @param {string} name - The name of the user.
     * @param {string} email - The email address of the user.
     * @param {Results | {} } [results={}] - The results associated with the user.
     * @param {'user' | 'admin'} [rol='user'] - The role of the user, defaults to 'user'.
     * @param {string} [password=''] - The password for the user account.
     * @param {string} [_id='']
     */


    constructor(name, email, results = {}, rol = 'user', password = '', _id = '') {
        this.name = name
        this.email = email
        this.rol = rol
        this.password = password
        this.results = results
        
        if (_id === '') {
            const timestamp = new Date()
            // Generar id aleatorio (hasta que tengamos el de la BBDD)
            this._id = String(timestamp.getTime())
        } else {
            this._id = _id
        }
    }
}
