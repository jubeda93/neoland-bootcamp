// @ts-check
export class User {
    /** @import {DataProfile} from './DataProfile.js' */
   


    /**
     * Constructs a new User instance.
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @param {string} [rol='user'] - The role of the user.
     * @param {string} [tarifa=''] - The tarifa of the user.
     * @param {DataProfile} [dataProfile={}] - The data profile of the user.
     * @param {string} [_id=''] - The unique identifier for the user. If not provided, a new ID is generated.
     * @param {string} [token='']
     */

    constructor(email, password, tarifa = 'trial', dataProfile = {}, rol = 'trial', _id = '', token = '') {
        this._id = _id
        this.email = email
        this.password = password
        this.rol = rol
        this.tarifa = tarifa
        this.dataProfile = dataProfile
        this.token = token

    }
}
