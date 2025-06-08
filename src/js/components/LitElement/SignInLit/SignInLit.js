import { getAPIData } from "../../../getAPIData.js"
import { User } from "../../../classes/User.js"
import { API_PORT } from "../../../logIn.js"
import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
// @ ts-expect-error TS doesn't like this
import ResetCSS from '../../../../css/reset.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import AppCSS from '../../../../css/styles.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import SignInLitCSS from './SignInLit.css' with { type: 'css' }


export class SignInLit extends LitElement {
    static styles = [ResetCSS, AppCSS, SignInLitCSS]

    render() {
        return html`
        <form id="signIn" class="hidden" @submit="${this._singInForm}">
        <slot></slot>
        <h1 id="signInTitle">Registrate</h1>
        <p>Email del usuario:</p>
        <input type="email" id="signInEmail" placeholder="Email" required>
        <p>Contraseña:</p>
        <input type="password" id="signInPassword" placeholder="Password" required>
        <button type="submit" id="signInButton"> Registrarse</button>
        <h2 id="userLogText">¿Ya eres usuario?</h2>
        <p>Haz click aqui:</p>
        <button type="button" id="userLog" @click="${this._showUserLoginFrom}"> ¡ Ir al Login !</button>
    </form>

        `;
    }
    async _singInForm(e) {
        e.preventDefault()
        let emailElement = this.renderRoot.getElementById('signInEmail')
        let email = /**@type {HTMLInputElement} */(emailElement)?.value
        let passwordElement = this.renderRoot.getElementById('signInPassword')
        let password = /**@type {HTMLInputElement} */(passwordElement)?.value
        let newUser = new User(email, password)

        // const payload = JSON.stringify(newUser)
        const apiData = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/create/users`, 'POST', newUser)

        if (!apiData) {
            // Informo al usuario del resultado de la operacions
            document.getElementById('signInFail')?.classList.remove('hidden')
            setTimeout(() => {
                document.getElementById('signInFail')?.classList.add('hidden')
            }, 4000)
            console.log('ERROR al crear el usuario', newUser.email,)
            return
        } else {
            document.getElementById('signInOk')?.classList.remove('hidden')
            setTimeout(() => {
                document.getElementById('signInOk')?.classList.add('hidden')
            }, 4000)
            console.log('Usuario creado', newUser.email,)
        }
    }

    _showUserLoginFrom() {
        const logInComponent = document.querySelector('log-in-lit');
        const logInRenderRoot = logInComponent.renderRoot;
        const logInElement = logInRenderRoot.querySelector('#logIn')
        if (logInElement) {
            logInElement.classList.remove('hidden');
            this.renderRoot.getElementById('signIn')?.classList.add('hidden')
            console.log('Sacamos Log In')
        }
    }
}

customElements.define('sign-in-lit', SignInLit)