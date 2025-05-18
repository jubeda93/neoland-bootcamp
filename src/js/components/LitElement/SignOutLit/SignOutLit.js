
import { getAPIData } from "../../../getAPIData.js"
import { API_PORT } from "../../../logIn.js"
import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import ResetCSS from '../../../../css/reset.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import AppCSS from '../../../../css/styles.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import SignOutLitCSS from './SignOutLit.css' with { type: 'css' }


export class SignOutLit extends LitElement {
    static styles = [ResetCSS, AppCSS, SignOutLitCSS]
    render() {
        return html`
            <button id="signOut" @click="${this._onSignOut}">Borrar usuario</button>
        `
    }

    async _onSignOut(e) {
            e.preventDefault()
        
         
            //comprobamos si hay algun usuario en SessionStorage Loggeado
            if (sessionStorage.getItem('User') && confirm('¿Estás seguro de borrar tu usuario?')) {
          
              // Parseamos el la cadena de texto para convertia objeto y poder tratarlo como Objeto
              let userLogged = JSON.parse(sessionStorage.getItem('User') || '')
              //observamos en console log que me duvuelve este objeto(id del usuario)
            
              // Borramos de la base de datos(JSON) 
              const apiData = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/delete/users/${userLogged._id}`, 'DELETE')
              console.log(typeof apiData,apiData)
              // Eliminar del sessionStorage
              sessionStorage.removeItem('User')
               location.href = "./index.html"
            } 
          }
}
  
customElements.define('sign-out-lit', SignOutLit)

