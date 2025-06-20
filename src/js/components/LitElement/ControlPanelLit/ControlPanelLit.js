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
    <div id="controlPanel">
        <h1>AJUSTES DE CUENTA</h1>
         <p>* Estos cambios pueden afectar al inicio de sesion *</p>
        <form id="changeEmail" @submit="${this._ChangeEmail}">
            <p>Cambiar Email:</p>
            <input type="email" id="emailUser" placeholder="Email actual" required>
            <input type="email" id="emailUserNew" placeholder="Nuevo email" required>
            <button type="submit">Cambiar email</button>
        </form>

        <form id="changePass" @submit="${this._changePass}">
            <p>Cambio contraseña:</p>
            <input type="password" id="passwordOld" placeholder="Contraseña actual" required>
            <input type="password" id="passwordNew" placeholder="Nueva contraseña" required>
            <button type="submit">Cambiar contraseña</button>
        </form>
        <button id="signOut" @click="${this._onSignOut}">Borrar usuario</button>
        
    </div> `
    }

    async _onSignOut(e) {
        e.preventDefault()

        if (sessionStorage.getItem('User') && confirm('¿Estás seguro de borrar tu usuario?')) {
            let userLogged = JSON.parse(sessionStorage.getItem('User') || '')
            const apiData = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/delete/users/${userLogged._id}`, 'DELETE')
            console.log(typeof apiData, apiData)
            // Eliminar del sessionStorage
            sessionStorage.removeItem('User')
            location.href = "./index.html"
        }
    }

    async _ChangeEmail(e) {
        e.preventDefault()
        let userLogged = JSON.parse(sessionStorage.getItem('User'))
        let emailOld = this.renderRoot.getElementById('emailUser').value
        let emailNew = this.renderRoot.getElementById('emailUserNew').value
        if (userLogged.email === emailOld) {
            userLogged.email = emailNew
            const emailToChange = ({ email: userLogged.email })
            sessionStorage.setItem('User', JSON.stringify(userLogged))
            await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/update/user/${userLogged._id}`, 'PUT', emailToChange)
            document.getElementById('modifyUserDataOk')?.classList.remove('hidden')
            setTimeout(() => {
                document.getElementById('modifyUserDataOk')?.classList.add('hidden')
            }, 4000);
            alert('Email modificado correctamente!')
            console.log('Email modificado correctamente!')
        } else {
            document.getElementById('modifyUserDataFail')?.classList.remove('hidden')
            setTimeout(() => {
                document.getElementById('modifyUserDataFail')?.classList.add('hidden')
            }, 4000);
            alert('Este email no coincide con el del usuario..')
            console.log('Este email no coincide con el del usuario..')
        }
    }

    async _changePass(e) {
        e.preventDefault()

        let userLogged = JSON.parse(sessionStorage.getItem('User'))
        let user = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/user/${userLogged._id}`, 'GET',)
        let passOld = this.renderRoot.getElementById('passwordOld').value
        let passNew = this.renderRoot.getElementById('passwordNew').value
        if (user.password === passOld) {
            user.password = passNew
            const passToChange = ({ password: user.password })
            await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/update/user/${userLogged._id}`, 'PUT', passToChange)
            document.getElementById('modifyPasswordOk')?.classList.remove('hidden')
            setTimeout(() => {
                document.getElementById('modifyPasswordOk')?.classList.add('hidden')
            }, 4000);
            alert('Password modificada correctamente!')
            console.log('Password modificada correctamente!')
        } else {
            document.getElementById('modifyPasswordFail')?.classList.remove('hidden')
            setTimeout(() => {
                document.getElementById('modifyPasswordFail')?.classList.add('hidden')
            }, 4000);
            console.log('La password no coincide con la del usuario...')
            alert('La password no coincide con la del usuario...')
        }
    }

}
customElements.define('control-panel-lit', ControlPanelLit)
