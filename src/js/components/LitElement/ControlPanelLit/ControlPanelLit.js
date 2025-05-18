import { getAPIData } from "../../../getAPIData.js"
import { API_PORT } from "../../../logIn.js"
import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import ResetCSS from '../../../../css/reset.css' with { type: 'css' }
import AppCSS from '../../../../css/styles.css' with { type: 'css' }
import ControlPanelLitCSS from './ControlPanelLit.css' with { type: 'css' }


export class ControlPanelLit extends LitElement {
    static styles = [ResetCSS, AppCSS, ControlPanelLitCSS]


    render() {
        return html`
    <div >
        <h1>Panel control usuario:</h1>
        <form id="changeEmail" @submit="${this._ChangeEmail}">
            <p>Estos cambios pueden afectar al inicio de sesion:</p>
            <p>Cambiar Email:</p>
            <input type="email" id="emailUser" placeholder="Email actual">
            <input type="email" id="emailUserNew" placeholder="Nuevo email">
            <button type="submit">Cambiar email</button>
        </form>

        <form id="changePass" @submit="${this._changePass}">
            <p>Cambio contraseña:</p>
            <input type="password" id="passwordOld" placeholder="Contraseña actual">
            <input type="password" id="passwordNew" placeholder="Nueva contraseña">
            <button type="submit">Cambiar contraseña</button>
        </form>
    </div> `
    }
    async _ChangeEmail (e) {
        e.preventDefault()
        let userLogged = JSON.parse(sessionStorage.getItem('User'))
        let emailOld = this.renderRoot.getElementById('emailUser').value
        let emailNew = this.renderRoot.getElementById('emailUserNew').value
        if (userLogged.email === emailOld) {
            userLogged.email = emailNew
            const emailToChange = JSON.stringify({email: userLogged.email})
            sessionStorage.setItem('User', JSON.stringify(userLogged))
            await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/update/user/${userLogged._id}`, 'PUT', emailToChange )
            alert('Email modificado correctamente!')
        } else {
            alert('Este Email no coincide con el del usuario..')
        }
    }

    async _changePass (e) {
        e.preventDefault()
        
        let userLogged = JSON.parse(sessionStorage.getItem('User'))
        let user =  await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/user/${userLogged._id}`, 'GET',)
        let passOld = this.renderRoot.getElementById('passwordOld').value
        let passNew =this.renderRoot.getElementById('passwordNew').value
        if (user.password === passOld ){
            user.password = passNew
            const passToChange = JSON.stringify({password: user.password})
            console.log(passToChange,typeof passToChange)
        await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/update/user/${userLogged._id}`, 'PUT', passToChange )
         alert('Password modificada correctamente!')
        } else {
            alert('La Password no coincide con la del usuario...')
        }
    }

}
    customElements.define('control-panel-lit', ControlPanelLit)
    


// }
// function changePass(event) {
//     event.preventDefault()

//     let userLogged = JSON.parse(sessionStorage.getItem('user'))
//     let passOldDoc = document.getElementById('passwordOld')
//     let passOld = /**@type {HTMLInputElement} */ (passOldDoc)?.value
//     if (userLogged.password === passOld) {
//         let passwordNewDoc = document.getElementById('passwordNew')
//         let passNew = /**@type {HTMLInputElement} */ (passwordNewDoc)?.value
//         userLogged.password = passNew
//         sessionStorage.setItem('user', JSON.stringify(userLogged))
//         store.user.update(userLogged)
//         updateUserDB()
//         alert('Contraseña modificada correctamente!')
//     } else {
//         alert('La contraseña no coincide con la actual')
//     }

// }