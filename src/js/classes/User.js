// @ts-check
export class User {
    /** @import {Results} from './Results.js' */
    /** @import {DataProfile} from './DataProfile.js' */
    /** @import {Metrics} from './Metrics.js' */


    /**
     * Constructs a new User instance.
     *
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @param {string} [tarifa=''] - The tarifa of the user.
     * @param {DataProfile} [dataProfile={}] - The data profile of the user.
     * @param {Results} [results={}] - The results associated with the user.
     * @param {Metrics} [metrics={}] - The metrics associated with the user.
     * @param {string} [rol='user'] - The role of the user.
     * @param {string} [token='']
     * @param {string} [_id=''] - The unique identifier for the user. If not provided, a new ID is generated.
     
     */

    constructor(email, password, tarifa = '', dataProfile = {}, results = {}, metrics = {}, rol = 'user', _id = '', token = '') {
        this.email = email
        this.password = password
        this.tarifa = tarifa
        this.dataProfile = dataProfile
        this.metrics = metrics
        this.rol = rol
        this.results = results
        this._id = _id
        this.token = token

    }
}
