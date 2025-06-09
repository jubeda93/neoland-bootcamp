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
    date: { type: Date },
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
    pushjerk: { type: String }

  }

  constructor() {
    super();
    this.date = '';
    this.benchPress = '';
    this.deadlift = '';
    this.backsquat = '';
    this.frontsquat = '';
    this.snatch = '';
    this.cleanjerk = '';
    this.powerclean = '';
    this.squatclean = '';
    this.shpress = '';
    this.pushpress = '';
    this.pushjerk = '';
  }

  render() {
    return html`
        <form id="saveResults" @submit="${this._saveResults}">
      <h1>REGISTRAR RESULTADOS</h1>
      <div class="inputs-grid">
      <label>
        <p>Fecha</p>
        <input type="date" 
        id="date" 
        placeholder="Fecha" 
        .value="${this.date}" 
        max="${new Date().toISOString().split('T')[0]}"
        @input="${this._dateChanged}"
        required>
      </label>
      <label>
        <p>Press de banca</p>
        <input 
        type="text" 
        id="benchpress" 
        placeholder="Press banca"
        .value="${this.benchPress}"
        @input="${this._benchPressChanged}"
        >
      </label>
      <label>
        <p>Deadlift</p>
        <input 
        type="text"
         id="deadlift"
        placeholder="Dead Lift"
        .value="${this.deadlift}"
        @input="${this._deadliftChanged}">
      </label>
      <label>
        <p>Back Squat</p>
        <input 
        type="text"
        id="backsquat"
        placeholder="Back Squat"
        .value="${this.backsquat}"
        @input="${this._backsquatChanged}">
      </label>
      <label>
        <p>Front Squat</p>
        <input 
        type="text" 
        id="frontsquat" 
        placeholder="Front Squat"
        .value="${this.frontsquat}"
        @input="${this._frontsquatChanged}">
      </label>
      <label>
        <p>Snatch</p>
        <input 
        type="text" 
        id="snatch" 
        placeholder="Snatch"
        .value="${this.snatch}"
        @input="${this._snatchChanged}">
      </label>
      <label>
        <p>Power Snatch</p>
        <input 
        type="text" 
        id="cleanjerk" 
        placeholder="Clean and Jerk"
        .value="${this.cleanjerk}"
        @input="${this._cleanjerkChanged}">
      </label>
      <label>
        <p>Power Clean</p>
        <input 
        type="text" 
        id="powerclean" 
        placeholder="Powerclean"
        .value="${this.powerclean}"
        @input="${this._powercleanChanged}">
      </label>
      <label>
        <p>Squat Clean</p>
        <input 
        type="text" 
        id="squatclean" 
        placeholder="Squat Clean"
        .value="${this.squatclean}"
        @input="${this._squatcleanChanged}">
      </label>
      <label>  
        <p>Shoulder Press</p>
        <input 
        type="text" 
        id="shpress" 
        placeholder="Shoulder Press"
        .value="${this.shpress}"
        @input="${this._shpressChanged}">
      </label>
      <label>
        <p>Push Press</p> 
        <input 
        type="text" 
        id="pushpress" 
        placeholder="Push Press"
        .value="${this.pushpress}"
        @input="${this._pushpressChanged}"
        > 
      </label> 
      <label>
        <p>Push Jerk</p>
        <input 
        type="text" 
        id="pushjerk" 
        placeholder="Push Jerk"
        .value="${this.pushjerk}"
        @input="${this._pushjerkChanged}">
      </label>
      </div> 
        <button type="submit">Guardar</button>
    </form>
        `;
  }


  async _saveResults(e) {
    e.preventDefault()

    const resultsData = {
      date: this.date,
      benchPress: this.benchPress,
      deadlift: this.deadlift,
      backsquat: this.backsquat,
      frontsquat: this.frontsquat,
      snatch: this.snatch,
      cleanjerk: this.cleanjerk,
      powerclean: this.powerclean,
      squatclean: this.squatclean,
      shpress: this.shpress,
      pushpress: this.pushpress,
      pushjerk: this.pushjerk
    }

    const userLogged = JSON.parse(sessionStorage.getItem('User') || '')
    const userLoggedID = userLogged._id
    const payload = new Results(
      resultsData.date,
      resultsData.benchPress,
      resultsData.deadlift,
      resultsData.backsquat,
      resultsData.frontsquat,
      resultsData.snatch,
      resultsData.cleanjerk,
      resultsData.powerclean,
      resultsData.squatclean,
      resultsData.shpress,
      resultsData.pushpress,
      resultsData.pushjerk,
      userLoggedID,
    )
    alert('Resultados guardados correctamente')
    console.log('Guardando resultados',payload)
    await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/create/results/${userLoggedID}`, 'POST', payload);
  }

  // FUNCIONES QUE OBSERVAN LOS CAMBIOS EN LOS INPUTS

  _dateChanged(e) {
    this.date = e.target.value
  }
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
  _pushjerkChanged(e) {
    this.pushjerk = e.target.value;
  }
}

customElements.define('save-results', ResultsLit)