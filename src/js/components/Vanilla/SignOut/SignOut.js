import { getAPIData } from "../../../getAPIData.js"
import { API_PORT } from "../../../logIn.js"
import { importTemplate } from "../../../lib/importTemplate.js"
import ResetCSS from '../../../css/reset.css' with {type: 'css'}
import AppCSS from '../../../css/styles.css' with {type: 'css'}
import SignOutCSS from './SignOut.css' with {type: 'css'}

const TEMPLATE = {
    id: 'signOutTemplate',
    url: './js/components/SignOut/SignOut.html',
}

await importTemplate(TEMPLATE.url);

export class SignOut extends HTMLElement {

    // "Cada vez que pregunte por el valor de la propiedad devuelve el Html del template que queremos pintar"
    get template() {
        return document.getElementById(TEMPLATE.id)
    }
    constructor() {
        super();

    }

    // ============ Lifecycle Methods ===========//

    async connectedCallback() {
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.adoptedStyleSheets.push(ResetCSS, AppCSS, SignOutCSS);
        this._setUpContent();
        // Ahora que existe el ShadowRoot, podemos asignar eventos a nuestro HTML    
        const signOut = this.shadowRoot.getElementById("signOut")
        signOut.addEventListener("submit", this._signOut.bind(this));


    }

    //=================== Private Methods ====================//
    // Definimos los metodos de la clase //  (_setUpContent)

    _setUpContent() {
        // Prevent render when disconnected or the template is not loaded
        if (this.shadowRoot && this.template) {
            // Con innerHtml '' , reseteamos el contenido por si tenia algo previamente 
            this.shadowRoot.innerHTML = '';
            //Añadimos con appendChild cogemos el contenido del template, lo clonamos con cloneNode(true) y lo añade añ shadowroot
            this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        }
    }

     async _signOut(e) {
        e.preventDefault();
     
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
        } else {
          alert('(Usuario no identificado) redirigiendo al Inicio');
          location.href = "./index.html"
        }
      }
}

// Definimos el web Component, con el nombre de la etiqueta html y la clase

customElements.define('sign-out', SignOut)

