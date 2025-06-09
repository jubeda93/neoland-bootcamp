import { getAPIData } from "../../../getAPIData.js"
// import { User } from "../../classes/User.js"
import { DataProfile } from "classes/DataProfile"
import { API_PORT } from "../../../logIn.js"
import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
// @ ts-expect-error TS doesn't like this
import ResetCSS from '../../../../css/reset.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import AppCSS from '../../../../css/styles.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import DataUserLitCSS from './DataUserLit.css' with { type: 'css' }



export class DataUserLit extends LitElement {
    static styles = [ResetCSS, AppCSS, DataUserLitCSS]

    static properties = {
        name: { type: String },
        surName: { type: String },
        bornDate: { type: String },
        phone: { type: String },
        adress: { type: String },
        postalCode: { type: String },
        nameEmerg: { type: String },
        phoneEmerg: { type: String }
    }

    constructor() {
        super();
        this.name = '0';
        this.surName = '0';
        this.bornDate = '0';
        this.phone = '0';
        this.adress = '0';
        this.postalCode = '0';
        this.nameEmerg = '0';
        this.phoneEmerg = '0';

        this._readUserData();
    }

    render() {
        return html`
        <form id="userDataForm" @submit="${this._saveUserData}">
        <h1>PERFIL DE USUARIO</h1>
        <section>
            <p>Nombre</p>
            <input type="text" 
            id="name" 
            placeholder="Nombre"
            .value="${this.name}"
            @input="${this._userNameChanged}"
            >
        </section>
        <section>
            <p>Apellidos</p>
            <input type="text" 
            id="surName" 
            placeholder="Apellidos"
            .value="${this.surName}"
            @input="${this._userSurNameChanged}"
            >
        </section>
        <section>
            <p>Fecha de nacimiento</p>
            <input type="date" 
            id="bornDate" 
            placeholder=""
            .value="${this.bornDate}"
            @input="${this._userBornDateChanged}"
            >
        </section>
        <section>
            <p>Telefono</p>
            <input type="text" 
            id="phone" 
            placeholder="Numero de telefono"
            .value="${this.phone}"
            @input="${this._userPhoneNumChanged}"
            >
        </section>
        <section>
            <p>Direccion</p>
            <input type="text" 
            id="adress" 
            placeholder="Direccion"
            .value="${this.adress}"
            @input="${this._userAdressChanged}"
            >
        </section>
        <section>
            <p>Codigo Postal</p>
            <input type="text" 
            id="postalCode" 
            placeholder="Codigo Postal"
            .value="${this.postalCode}"
            @input="${this._userPostalCodeChanged}">
        </section>
        <section>
            <p>Contacto Emergencia</p>
            <input type="text" 
            id="nameEmerg" 
            placeholder="Contacto de Emergencia"
            .value="${this.nameEmerg}"
            @input="${this._userNameEmergChanged}">
        </section>
        <section>
            <p>Telefono Emergencia</p>
            <input type="text" 
            id="phoneEmerg" 
            placeholder="Numero de Emergencia"
            .value="${this.phoneEmerg}"
            @input="${this._userPhoneEmergChanged}"
            >
        </section>
        <button type="submit">Guardar</button>
    </form>
    `
    }

    async _readUserData() {
        const userLogged = JSON.parse(sessionStorage.getItem('User') || '{}' )
        let user = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/user/${userLogged._id}`, 'GET',);
        this.name = user.dataProfile.name || '';
        this.surName = user.dataProfile.surName || '';
        this.bornDate = user.dataProfile.bornDate || '';
        this.phone = user.dataProfile.phone || '';
        this.adress = user.dataProfile.adress || '';
        this.postalCode = user.dataProfile.postalCode || '';
        this.nameEmerg = user.dataProfile.emergName || '';
        this.phoneEmerg = user.dataProfile.emergPhone || '';
    }

    async _saveUserData(e) {
        e.preventDefault();

        const userData = {
            name: this.name,
            surName: this.surName,
            bornDate: this.bornDate,
            phone: this.phone,
            adress: this.adress,
            postalCode: this.postalCode,
            nameEmerg: this.nameEmerg,
            phoneEmerg: this.phoneEmerg
        }

        document.getElementById('saveUserDataOk')?.classList.remove('hidden')
        setTimeout(() => {
            document.getElementById('saveUserDataOk')?.classList.add('hidden')
        }, 3000);

        const userLogged = JSON.parse(sessionStorage.getItem('User') || '')
            const data = (new DataProfile(userData.name,userData.surName,userData.bornDate,userData.phone,userData.adress,userData.postalCode,userData.nameEmerg,userData.phoneEmerg));
            await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/update/dataProfile/${userLogged._id}`, 'PUT', data);

    }

    _userNameChanged(e) {
        this.name = e.target.value;
    }

    _userSurNameChanged(e) {
        this.surName = e.target.value;
    }

    _userBornDateChanged(e) {
        this.bornDate = e.target.value;
    }       

    _userPhoneNumChanged(e) {
        this.phone = e.target.value;
    }

    _userAdressChanged(e) {
        this.adress = e.target.value;
    }

    _userPostalCodeChanged(e) {
        this.postalCode = e.target.value;
    }
    _userNameEmergChanged(e) {
        this.nameEmerg = e.target.value;
    }
    _userPhoneEmergChanged(e) {
        this.phoneEmerg = e.target.value;
    }

}

customElements.define('data-user-lit', DataUserLit)