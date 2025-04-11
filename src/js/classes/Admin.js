
export class Admin {
    /** @import {Results} from './Results.js' */
    /** @import {DataProfile} from ./DataProfile.js */
    /** @import {Metrics} from './Metrics.js} */

    /**
     * Constructor for Admin
     * @param {string} email
     * @param {string} password
     * @param {string} boxName
     * @param {string} cif
     * @param {string} socialAdress
     * @param {string} phone
     * @param {string} municipio
     * @param {string} provincia
     * @param {DataProfile} [dataProfile]
     * @param {Results} [results]
     * @param {Metrics} [metrics]
     * @param {string} [rol='admin']
     * @param {string} [_id='']
     */
    constructor() {email, password, boxName, cif, socialAdress,phone,municipio,provincia,dataProfile = {}, results = {},metrics = {}, rol = 'admin', _id = ''
        this.email = email
        this.password = password
        this.boxName = boxName
        this.cif = cif
        this.socialAdress = socialAdress
        this.phone = phone
        this.municipio = municipio
        this.provincia = provincia    
        this.dataProfile = dataProfile
        this.metrics = metrics
        this.rol = rol
        this.results = results    
        this._id = _id
}
}