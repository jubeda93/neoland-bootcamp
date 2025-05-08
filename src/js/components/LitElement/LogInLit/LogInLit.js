import { getAPIData } from "../../../getAPIData.js"
import { User } from "../../../classes/User.js"
import { API_PORT } from "../../../logIn.js"
import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
// @ ts-expect-error TS doesn't like this
import ResetCSS from '../../../../css/reset.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import AppCSS from '../../../../css/styles.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import LogInLitCSS from './LogInLit.css' with { type: 'css' }

export class LogInLit extends LitElement {
  static styles = [ResetCSS, AppCSS, LogInLitCSS]

  render() {
    return html`
         <form id="logIn" @submit="${this._onLogInForm}">
        <h1>Iniciar sesion</h1>
        <p>Email del usuario:</p>
        <input type="email" id="logInEmail" placeholder="Email" required>
        <p>Contraseña:</p>
        <input type="password" id="logInPassword" placeholder="Password" required>
        <button type="submit"> Iniciar sesion</button>
        <p>Haz click aqui para darte de alta:</p>
        <button type="button" id="newUser" @click="${this._showNewUserForm}"> ¡ Nuevo usuario !</button>
      </form>
        `
  }
  async _onLogInForm(e) {
    e.preventDefault()
    let emailElement = this.renderRoot.getElementById('logInEmail')
    let email = /**@type {HTMLInputElement} */(emailElement)?.value
    let passwordElement = this.renderRoot.getElementById('logInPassword')
    let password = /**@type {HTMLInputElement} */(passwordElement)?.value
    let newUser = new User(email, password, 'user')

    const payload = JSON.stringify(newUser)
    console.log(payload)

    const apiData = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/login`, 'POST', payload)

    console.log(typeof apiData, apiData)

    if (!apiData) {
      console.log('El usuario no existe')
      document.getElementById('logInFail')?.classList.remove('hidden')
      setTimeout(() => {
        document.getElementById('logInFail')?.classList.add('hidden')
      }, 4000)
      return

    } else {
      // El usuario existe, puedes proceder con la autenticación
      sessionStorage.setItem('User', JSON.stringify(apiData))
      document.getElementById('logInOk')?.classList.remove('hidden')
      window.location.href = "./mainMenu.html"
      setTimeout(() => {
        document.getElementById('logInOk')?.classList.add('hidden')
      }, 4000)
      
    }
  }


  async _showNewUserForm() {
    const signInComponent = document.querySelector('sign-in-lit');
    const signInRenderRoot = signInComponent.renderRoot;
    const signInElement = signInRenderRoot.querySelector('#signIn')
    if (signInElement) {
      signInElement.classList.remove('hidden');
      this.renderRoot.getElementById('logIn')?.classList.add('hidden')
      console.log('Sacamos Register Form')
    }
  }

}

customElements.define('log-in-lit', LogInLit)