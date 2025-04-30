import { importTemplate } from "lib/importTemplate";


// identificador y location de donde queremos implementar el componente
const TEMPLATE = {
    id: 'logInTemp',
    url: './js/components/LogInForm/LogInForm.html'
}

await importTemplate(TEMPLATE.url);

// Clase del componente web (LogInForm)

export class LogInForm extends HTMLElement {

    get template(){
        return document.getElementById(TEMPLATE.id)
    }

// 1º definir el constructor de la clase
    constructor() {
        super();
        console.log('Instanciamos LogInForm')
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
customElements.define('log-in-form', LogInForm);
