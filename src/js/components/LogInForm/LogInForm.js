// @ ts-check
import { getAPIData } from "../../../js/getAPIData.js"
import { User } from "../../classes/User.js"
import { API_PORT } from "../../logIn.js"
import { importTemplate } from "lib/importTemplate";
import ResetCSS from '../../../css/reset.css' with {type: 'css'}
import AppCSS from '../../../css/styles.css' with {type: 'css'}
import LoginFromCSS from './LoginForm.css' with {type: 'css'}

// identificador y location de donde queremos implementar el componente
const TEMPLATE = {
    id: 'logInTemp',
    url: './js/components/LogInForm/LogInForm.html'
}

await importTemplate(TEMPLATE.url);

// Clase del componente web (LogInForm)

export class LogInForm extends HTMLElement {
    static observedAttributes = ["prueba"];

    get prueba() {
        return this.getAttribute('prueba');
    }

    get template() {
        return document.getElementById(TEMPLATE.id)
    }

    // 1º definir el constructor de la clase
    constructor() {
        super();
        console.log('Instanciamos LogInForm')
    }
    //=================== Ciclo de Vida | Lifecycle Methods ====================//
    //=================== "DOM del Componente Web" ====================//


    /**  Definimos el cliclo de vida de la clase 
        * 
        * Tenemos que hacer el attachShadow (mode: open/close)
        * Creamos el shadowroot de lo stylesSheets (CSS)
        * 
    */
    async connectedCallback() {
        console.log("2. constructor: Custom element added to page.");
        // Necesitamos activar el shadow DOM para poder añadir la plantilla html
        this.attachShadow({ mode: "open" });
        this.shadowRoot.adoptedStyleSheets.push(ResetCSS, AppCSS, LoginFromCSS);

        this._setUpContent();
        const logInForm = this.shadowRoot.getElementById("logIn")
        this.shadowRoot.addEventListener('slotCHANGE', this._handleSlotChanged.bind(this), ({ passive: true }))

        // Aqui llamamos al addevent listener de la funcion JavaScrip(LogIn) "onDomContentLoaded"
        logInForm.addEventListener("submit", this._onLogInForm.bind(this))


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

    //================ BLOQUE DE CODIGO DE LA FUNCION JAVASCRIPT ===================//

    async _onLogInForm(e) {
        e.preventDefault()
        let emailElement = this.shadowRoot.getElementById('logInEmail')
        let email = /**@type {HTMLInputElement} */(emailElement)?.value
        let passwordElement = this.shadowRoot.getElementById('logInPassword')
        let password = /**@type {HTMLInputElement} */(passwordElement)?.value
        let newUser = new User(email, password, 'user')

        const payload = JSON.stringify(newUser)
        console.log( payload)

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
            console.log('El usuario existe')
        }
    }


}


// Definir la etiqueta de la clase: customElemtents
customElements.define('log-in-form', LogInForm);
