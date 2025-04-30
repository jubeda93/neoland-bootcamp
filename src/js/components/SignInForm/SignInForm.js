import { importTemplate } from "lib/importTemplate"; 

const TEMPLATE = {
    id: 'signInTemP',
    url: './js/components/SignInForm/SignInForm.html'
}

await importTemplate(TEMPLATE.url);

export class SignInForm extends HTMLElement {
    get template() {
        return document.getElementById(TEMPLATE.id)
    }
    // 1º definir el constructor de la clase
    constructor() {
        super();
        console.log('1. instanciando SignInForm');
    }
    
//=================== Ciclo de Vida ====================//

    // Definimos el cliclo de vida de la clase //

    async connectedCallback() {
        console.log("2. constructor: Custom element added to page.");
        // Necesitamos activar el shadow DOM para poder añadir la plantilla html
        this.attachShadow({ mode: "open" });
        // this.shadowRoot.adoptedStyleSheets.push(ResetCSS, AppCSS, SignInFormCSS);
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
 
}

// Definir la etiqueta de la clase: customElemtents
customElements.define('sign-in-form', SignInForm);
