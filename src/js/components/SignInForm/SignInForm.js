import { getAPIData } from "../../../js/getAPIData.js"
import { User } from "../../classes/User.js"
import { API_PORT } from "../../logIn.js"
import { importTemplate } from "lib/importTemplate";
import ResetCSS from '../../../css/reset.css' with {type: 'css'}
import AppCSS from '../../../css/styles.css' with {type: 'css'}

import SignInCSS from './SignInForm.css' with {type: 'css'}

const TEMPLATE = {
    id: 'signInTemP',
    url: './js/components/SignInForm/SignInForm.html'
}

await importTemplate(TEMPLATE.url);

export class SignInForm extends HTMLElement {
    static observedAttributes = ["prueba"];

    get prueba() {
        return this.getAttribute('prueba');
    }

    get template() {
        return document.getElementById(TEMPLATE.id)
    }
    
    constructor() {
        super();
        console.log('1. instanciando SignInForm');
    }
    
//=================== Ciclo de Vida ====================//

    // Definimos el cliclo de vida de la clase //

    async connectedCallback() {
        // Necesitamos activar el shadow DOM para poder añadir la plantilla html
        this.attachShadow({ mode: "open" });
        this.shadowRoot.adoptedStyleSheets.push(ResetCSS, AppCSS, SignInCSS);
        this._setUpContent();
        const signInForm = this.shadowRoot.getElementById("signIn")
        // explicame esta linea
        this.shadowRoot.addEventListener('slotCHANGE', this._handleSlotChanged.bind(this), ({ passive: true }))
        signInForm.addEventListener("submit", this._singInForm.bind(this))
    
    }

    disconnectedCallback() {
        console.log("disconnectedCallback: Custom element removed from page.");
        // Don't forget to remove event listeners
        // window.removeEventListener('stateChanged', this._handleStateChanged);
    }

    adoptedCallback() {
        console.log("adoptedCallback: Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`attributeChangedCallback: Attribute ${name} has changed.`, oldValue, newValue);
        this._setUpContent();
    }

//=================== Metodos ====================//
// Definimos los metodos de la clase //  (_setUpContent)

_setUpContent() {
    // Prevent render when disconnected or the template is not loaded
    if (this.shadowRoot && this.template) {
      // Replace previous content
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(this.template.content.cloneNode(true));

    }
  }

/**
     * Handles a slot change event from the shadow root
     * @param {Event} e - The slot change event
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _handleSlotChanged(e) {
        // Notify the slot change event
        // console.log(['Slot changed', e])
    }

    /**
     * Handles a state change event from the store
     * @param {import('../../store/redux').State} state - The new state
     * @private
     */
    _handleStateChanged(state) {
        // Do whatever is needed in this component after a particular state value changes
        // Filter by the states needed in this component
        console.log('stateChanged observed from component', state?.detail?.type);
    }

    /**
     * Updates the visibility of the sidebar based on the screen size.
     * If the screen width is 460px or less, the sidebar is hidden;
     * otherwise, the sidebar is shown.
     * @private
     */
    _checkSmallScreenBehaviors() {
        if (window.matchMedia('(max-width: 460px)').matches) {
            this.showSidebar = false;
        } else {
            this.showSidebar = true;
        }
    }

    // ===================== BLOQUE DE CODIGO DE LA FUNCION ================== //

    async _singInForm(e){
        e.preventDefault()
        let emailElement = this.shadowRoot.getElementById('signInEmail')
        let email = /**@type {HTMLInputElement} */(emailElement)?.value
        let passwordElement = this.shadowRoot.getElementById('signInPassword')
        let password = /**@type {HTMLInputElement} */(passwordElement)?.value
      
        let newUser = new User(email, password)
      
        console.log('newUser',newUser, typeof newUser)

        const payload = JSON.stringify(newUser)

        console.log('payload',payload,typeof payload)

        const apiData = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/create/users`,'POST', payload)
        
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
 
}



// Definir la etiqueta de la clase: customElemtents
customElements.define('sign-in-form', SignInForm);
