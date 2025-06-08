import { getAPIData } from "../../../getAPIData.js"
import { Metrics } from "classes/Metrics"
import { API_PORT } from "../../../logIn.js"
import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import ResetCSS from '../../../../../css/reset.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import AppCSS from '../../../../css/styles.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import MetricsLitCSS from '../MetricsLit/MetricsLit.css' with { type: 'css' }



export class MetricsLit extends LitElement {
    static styles = [ResetCSS, AppCSS, MetricsLitCSS]

    static properties = {
        peso: { type: String },
        imc: { type: String },
        grasa: { type: String },
        liquido: { type: String },
        gastoKcal: { type: String },
        brazoder: { type: String },
        brazoIzq: { type: String },
        torax: { type: String },
        cintura: { type: String },
        cuadriceps: { type: String },
        freqMedia: { type: String },
        freqMax: { type: String },
    }

    constructor() {
        super();
        this.peso = '0';
        this.imc = '0';
        this.grasa = '0';
        this.liquido = '0';
        this.gastoKcal = '0';
        this.brazoder = '0';
        this.brazoIzq = '0';
        this.torax = '0';
        this.cintura = '0';
        this.cuadriceps = '0';
        this.freqMedia = '0';
        this.freqMax = '0';

        this._readMetrics();
    }


    render() {
        return html`
        <form id="saveMetrics" @submit="${this._saveMetrics}">
    <h1>MEDICIONES</h1>
    <p>*Registro de ultimas mediciones corporales*</p>
    <section class="metrics">
        <h3>Peso</h3>
        <input type="text" 
        id="peso" 
        placeholder="Peso"
        .value="${this.peso}"
        @input="${this._pesoChanded}"
        >
    </section>
    <section class="metrics">
        <h3>IMC</h3>
        <input 
        type="text" 
        id="imc" 
        placeholder="IMC"
        .value="${this.imc}"
        @input="${this._imcChanded}">
    </section>
    <section class="metrics">
        <h3>% Grasa</h3>
        <input 
        type="text" 
        id="grasa" 
        placeholder="% Grasa"
        .value="${this.grasa}"
        @input="${this._grasaChanged}">
    </section>
    <section class="metrics">
        <h3>% Liquido</h3>
        <input 
        type="text" 
        id="liquido" 
        placeholder="% Liquido"
        .value="${this.liquido}"
        @input="${this._liquidoChanged}">
    </section>
    <section class="metrics">
        <h3>Gasto calórico</h3>
        <input 
        type="text" 
        id="gastoKcal" 
        placeholder="Gasto kcal"
        .value="${this.gastoKcal}"
        @input="${this._gastoKcalChanged}">
    </section>
    <section class="metrics">
        <h3>Brazo derecho</h3>
        <input 
        type="text" 
        id="brazoder" 
        placeholder="Brazo derecho"
        .value="${this.brazoder}"
        @input="${this._brazoderChanged}">
    </section>
    <section class="metrics">
        <h3>Brazo izquierdo</h3>
        <input 
        type="text" 
        id="brazoIzq" 
        placeholder="Brazo izquierdo"
        .value="${this.brazoIzq}"
        @input="${this._brazoIzqChanged}">
    </section>
    <section class="metrics">
        <h3>Tórax</h3>
        <input 
        type="text" 
        id="torax" 
        placeholder="Tórax"
        .value="${this.torax}"
        @input="${this._toraxChanged}">
    </section>
    <section class="metrics">
        <h3>Cintura</h3>
        <input 
        type="text" 
        id="cintura" 
        placeholder="Cintura"
        .value="${this.cintura}"
        @input="${this._cinturaChanged}">
    </section>
    <section class="metrics">
        <h3>Cuadriceps</h3>
        <input 
        type="text" 
        id="cuadriceps" 
        placeholder="Cuadriceps"
        .value="${this.cuadriceps}"
        @input="${this._cuadricepsChanged}">
    </section>
    <section class="metrics">
        <h3>Freq. cardiaca media</h3>
        <input 
        type="text" 
        id="freqMedia" 
        placeholder="Freq. cardiaca media"
        .value="${this.freqMedia}"
        @input="${this._freqMediaChanged}">
    </section>
    <section class="metrics">
        <h3>Freq. cardiaca maxima</h3>
        <input 
        type="text" 
        id="freqMax" 
        placeholder="Freq. cardiaca maxima"
        .value="${this.freqMax}"
        @input="${this._freqMaxChanged}">
    </section>
    <button type="submit">Guardar</button> 
</form>`}

        async _readMetrics() {
            const userLogged = JSON.parse(sessionStorage.getItem('User') || '{}')
            let user = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/user/${userLogged._id}`, 'GET',);
            this.peso = user.metrics.peso || '0'; 
            this.imc = user.metrics.imc || '0';
            this.grasa = user.metrics.grasa || '0';
            this.liquido = user.metrics.liquido || '0';
            this.gastoKcal = user.metrics.gastoKcal || '0';
            this.brazoder = user.metrics.brazoder || '0';
            this.brazoIzq = user.metrics.brazoIzq || '0';
            this.torax = user.metrics.torax || '0';
            this.cintura = user.metrics.cintura || '0';
            this.cuadriceps = user.metrics.cuadriceps || '0';
            this.freqMedia = user.metrics.freqMedia || '0';
            this.freqMax = user.metrics.freqMax || '0';
        }

    async _saveMetrics(e) {
        e.preventDefault()
        const metricas = {
            peso: this.peso,
            imc: this.imc,
            grasa: this.grasa,
            liquido: this.liquido,
            gastoKcal: this.gastoKcal,
            brazoder: this.brazoder,
            brazoIzq: this.brazoIzq,
            torax: this.torax,
            cintura: this.cintura,
            cuadriceps: this.cuadriceps,
            freqMedia: this.freqMedia,
            freqMax: this.freqMax,
        }

        const userLogged = JSON.parse(sessionStorage.getItem('User') || '{}')
        const results = (new Metrics(metricas.peso, metricas.imc, metricas.grasa, metricas.liquido, metricas.gastoKcal, metricas.brazoder, metricas.brazoIzq, metricas.torax, metricas.cintura, metricas.cuadriceps, metricas.freqMedia, metricas.freqMax));
        await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/update/metrics/${userLogged._id}`, 'PUT', results);

    }

    _pesoChanded(e) {
        this.peso = e.target.value
    }
    _imcChanded(e) {
        this.imc = e.target.value
    }
    _grasaChanged(e) {
        this.grasa = e.target.value
    }
    _liquidoChanged(e) {
        this.liquido = e.target.value
    }
    _gastoKcalChanged(e) {
        this.gastoKcal = e.target.value
    }
    _brazoderChanged(e) {
        this.brazoder = e.target.value
    }
    _brazoIzqChanged(e) {
        this.brazoIzq = e.target.value
    }
    _toraxChanged(e) {
        this.torax = e.target.value
    }
    _cinturaChanged(e) {
        this.cintura = e.target.value
    }
    _cuadricepsChanged(e) {
        this.cuadriceps = e.target.value
    }
    _freqMediaChanged(e) {
        this.freqMedia = e.target.value
    }
    _freqMaxChanged(e) {
        this.freqMax = e.target.value
    }


}

customElements.define('metrics-lit', MetricsLit)