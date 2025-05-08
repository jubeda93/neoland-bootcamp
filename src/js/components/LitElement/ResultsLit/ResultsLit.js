import { getAPIData } from "../../../getAPIData.js"
import { Results } from "classes/Results"
import { API_PORT } from "../../../logIn.js"
import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
// @ ts-expect-error TS doesn't like this
import ResetCSS from '../../../../../css/reset.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import AppCSS from '../../../../css/styles.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import ResultsLitCSS from './ResultsLit.css' with { type: 'css' }


export class ResultsLit extends LitElement {
  static styles = [ResetCSS, AppCSS, ResultsLitCSS]

  // PROPIEDADES DEL COMPONENTE
  static properties = {
    benchPress: { type: String },
    deadlift: { type: String },
    backsquat: { type: String },
    frontsquat: { type: String },
    snatch: { type: String },
    cleanjerk: { type: String },
    powerclean: { type: String },
    squatclean: { type: String },
    shpress: { type: String },
    pushpress: { type: String },

  }

  constructor() {
    super();
    this.benchPress = '0';
    this.deadlift = '0';
    this.backsquat = '0';
    this.frontsquat = '0';
    this.snatch = '0';
    this.cleanjerk = '0';
    this.powerclean = '0';
    this.squatclean = '0';
    this.shpress = '0';
    this.pushpress = '0';

    this._readResults();
  }

  render() {
    return html`
        <form id="saveResults" @submit="${this._saveResults}">
      <h1>Marcas Personales</h1>
      <section>
        <p>Press de banca</p>
        <input type="text" 
        id="benchpress" 
        placeholder="Press banca"
        .value="${this.benchPress}"
        @input="${this._benchPressChanged}"
        >
      </section>
      <section>
        <p>Deadlift</p>
        <input type="text"
         id="deadlift"
        placeholder="Dead Lift"
        .value="${this.deadlift}"
        @input="${this._deadliftChanged}">
      </section>
      <section>
        <p>Back Squat</p>
        <input type="text"
        id="backsquat"
        placeholder="Back Squat"
        .value="${this.backsquat}"
        @input="${this._backsquatChanged}">
      </section>
      <section>
        <p>Front Squat</p>
        <input type="text" 
        id="frontsquat" 
        placeholder="Front Squat"
        .value="${this.frontsquat}"
        @input="${this._frontsquatChanged}">
      </section>
      <section>
        <p>Snatch</p>
        <input type="text" 
        id="snatch" 
        placeholder="Snatch"
        .value="${this.snatch}"
        @input="${this._snatchChanged}">
      </section>
      <section>
        <p>Power Snatch</p>
        <input type="text" 
        id="cleanjerk" 
        placeholder="Clean and Jerk"
        .value="${this.cleanjerk}"
        @input="${this._cleanjerkChanged}">
      </section>
      <section>
        <p>Power Clean</p>
        <input type="text" 
        id="powerclean" 
        placeholder="Powerclean"
        .value="${this.powerclean}"
        @input="${this._powercleanChanged}">
      </section>
      <section>
        <p>Squat Clean</p>
        <input type="text" 
        id="squatclean" 
        placeholder="Squat Clean"
        .value="${this.squatclean}"
        @input="${this._squatcleanChanged}">
      </section>
      <section>  
        <p>Shoulder Press</p>
        <input type="text" 
        id="shpress" 
        placeholder="Shoulder Press"
        .value="${this.shpress}"
        @input="${this._shpressChanged}">
      </section>
      <section>
        <p>Push Press</p> 
        <input type="text" 
        id="pushpress" 
        placeholder="Push Press"
        .value="${this.pushpress}"
        @input="${this._pushpressChanged}"
        > 
      </section>  
        <div>
        <button type="submit">Guardar datos</button>
      </div>
    </form>
        `;
  }

  async _readResults() {
    const userLogged = JSON.parse(sessionStorage.getItem('User') || '{}' )
    console.log(userLogged)
    let usuario = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/user/${userLogged._id}`, 'GET',);
    console.log(usuario)
    this.benchPress = usuario.results.benchpress || '0';
    this.deadlift = usuario.results.deadlift|| '0';
    this.backsquat = usuario.results.backsquat|| '0';
    this.frontsquat = usuario.results.frontsquat|| '0';
    this.snatch = usuario.results.snatch|| '0';
    this.cleanjerk = usuario.results.cleanjerk|| '0';
    this.powerclean = usuario.results.powerclean|| '0';
    this.squatclean = usuario.results.squatclean|| '0';
    this.shpress = usuario.results.shpress|| '0';
    this.pushpress = usuario.results.pushpress|| '0' ;
  }


  async _saveResults(e) {
    e.preventDefault()

    const resultsData = {
      benchPress: this.benchPress,
      deadlift: this.deadlift,
      backsquat: this.backsquat,
      frontsquat: this.frontsquat,
      snatch: this.snatch,
      cleanjerk: this.cleanjerk,
      powerclean: this.powerclean,
      squatclean: this.squatclean,
      shpress: this.shpress,
      pushpress: this.pushpress
    }

    const userLogged = JSON.parse(sessionStorage.getItem('User') || '')
    const results = JSON.stringify(new Results(resultsData.benchPress,resultsData.deadlift,resultsData.backsquat, resultsData.frontsquat, resultsData.snatch, resultsData.cleanjerk, resultsData.powerclean, resultsData.squatclean, resultsData.shpress, resultsData.pushpress));
    await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/update/results/${userLogged._id}`, 'PUT', results);
  }

  

  // FUNCIONES QUE OBSERVAN LOS CAMBIOS EN LOS INPUTS
  _benchPressChanged(e) {
    this.benchPress = e.target.value;
  }
  _deadliftChanged(e) {
    this.deadlift = e.target.value;
  }

  _backsquatChanged(e) {
    this.backsquat = e.target.value;
  }
  _frontsquatChanged(e) {
    this.frontsquat = e.target.value;
  }
  _snatchChanged(e) {
    this.snatch = e.target.value;
  }
  _cleanjerkChanged(e) {
    this.cleanjerk = e.target.value;
  }
  _powercleanChanged(e) {
    this.powerclean = e.target.value;
  }
  _squatcleanChanged(e) {
    this.squatclean = e.target.value;
  }
  _shpressChanged(e) {
    this.shpress = e.target.value;
  }
  _pushpressChanged(e) {
    this.pushpress = e.target.value;
  }
}


customElements.define('save-results', ResultsLit)