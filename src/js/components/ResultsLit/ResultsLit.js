import { getAPIData } from "../../getAPIData.js"
import { Results } from "classes/Results"
import { API_PORT } from "../../logIn.js"
import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
// @ ts-expect-error TS doesn't like this
import ResetCSS from '../../../css/reset.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import AppCSS from '../../../css/styles.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import ResultsLitCSS from './../ResultsLit/ResultsLit.css' with { type: 'css' }


export class ResultsLit extends LitElement {
    static styles = [ResetCSS, AppCSS, ResultsLitCSS]


    render() {
        return html`
        <form id="saveResults" @submit="${this._saveResults}">
      <h1>Marcas Personales</h1>
      <section>
        <p>Press de banca</p>
        <input type="text" id="benchpress" placeholder="Press banca">
      </section>
      <section>
        <p>Deadlift</p>
        <input type="text" id="deadlift" placeholder="Dead Lift">
      </section>
      <section>
        <p>Back Squat</p>
        <input type="text" id="backsquat" placeholder="Back Squat">
      </section>
      <section>
        <p>Front Squat</p>
        <input type="text" id="frontsquat" placeholder="Front Squat">
      </section>
      <section>
        <p>Snatch</p>
        <input type="text" id="snatch" placeholder="Snatch">
      </section>
      <section>
        <p>Power Snatch</p>
        <input type="text" id="cleanjerk" placeholder="Clean and Jerk">
      </section>
      <section>
        <p>Power Clean</p>
        <input type="text" id="powerclean" placeholder="Powerclean">
      </section>
      <section>
        <p>Squat Clean</p>
        <input type="text" id="squatclean" placeholder="Squat Clean">
      </section>
      <section>  
        <p>Shoulder Press</p>
        <input type="text" id="shpress" placeholder="Shoulder Press">
      </section>
      <section>
        <p>Push Press</p> 
        <input type="text" id="pushpress" placeholder="Push Press"> 
      </section>  
        <div>
        <button type="submit">Guardar datos</button>
      </div>
    </form>
        `;
    }

    async _saveResults(e) {
        e.preventDefault()
        let benchPressElement = this.renderRoot.getElementById('benchpress')
          let benchPress = /**@type {HTMLInputElement} */(benchPressElement)?.value
          let deadliftElement = this.renderRoot.getElementById('deadlift')
          let deadlift = /**@type {HTMLInputElement} */(deadliftElement)?.value
          let backSquatElement = this.renderRoot.getElementById('backsquat')
          let backsquat = /**@type {HTMLInputElement} */(backSquatElement)?.value
          let frontsquatElement = this.renderRoot.getElementById('frontsquat')
          let frontsquat = /**@type {HTMLInputElement} */(frontsquatElement)?.value
          let snatchElement = this.renderRoot.getElementById('snatch')
          let snatch = /**@type {HTMLInputElement} */(snatchElement)?.value
          let cleanjerkElement = this.renderRoot.getElementById('cleanjerk')
          let cleanjerk = /**@type {HTMLInputElement} */(cleanjerkElement)?.value
          let powercleanElement = this.renderRoot.getElementById('powerclean')
          let powerclean = /**@type {HTMLInputElement} */(powercleanElement)?.value
          let squatcleanElement = this.renderRoot.getElementById('squatclean')
          let squatclean = /**@type {HTMLInputElement} */(squatcleanElement)?.value
          let shpressElement = this.renderRoot.getElementById('shpress')
          let shpress = /**@type {HTMLInputElement} */(shpressElement)?.value
          let pushpressElement = this.renderRoot.getElementById('pushpress')
          let pushpress = /**@type {HTMLInputElement} */(pushpressElement)?.value
        
          const userLogged = JSON.parse(sessionStorage.getItem('User') || '')
          const results = JSON.stringify(new Results(benchPress, deadlift, backsquat, frontsquat, snatch, cleanjerk, powerclean, squatclean, shpress, pushpress));
          await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/update/results/${userLogged._id}`, 'PUT', results);
    }

}

customElements.define('save-results', ResultsLit)