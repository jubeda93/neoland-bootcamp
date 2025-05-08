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
        this.peso = '';
        this.imc = '';
        this.grasa = '';
        this.liquido = '';
        this.gastoKcal = '';
        this.brazoder = '';
        this.brazoIzq = '';
        this.torax = '';
        this.cintura = '';
        this.cuadriceps = '';
        this.freqMedia = '';
        this.freqMax = '';
    }


    render() {
        return html`
        <form id="saveMetrics">
    <h1>Mis mediciones:</h1>
    <section class="metrics">
        <h3>Peso</h3>
        <input type="text" 
        id="peso" 
        placeholder="Peso">
    </section>
    <section class="metrics">
        <h3>IMC</h3>
        <input type="text" id="imc" placeholder="IMC">
    </section>
    <section class="metrics">
        <h3>% Grasa</h3>
        <input type="text" id="grasa" placeholder="% Grasa">
    </section>
    <section class="metrics">
        <h3>% Liquido</h3>
        <input type="text" id="liquido" placeholder="% Liquido">
    </section>
    <section class="metrics">
        <h3>Gasto calórico</h3>
        <input type="text" id="gastoKcal" placeholder="Gasto kcal">
    </section>
    <section class="metrics">
        <h3>Brazo derecho</h3>
        <input type="text" id="brazoder" placeholder="Brazo derecho">
    </section>
    <section class="metrics">
        <h3>Brazo izquierdo</h3>
        <input type="text" id="brazoIzq" placeholder="Brazo izquierdo">
    </section>
    <section class="metrics">
        <h3>Tórax</h3>
        <input type="text" id="torax" placeholder="Tórax">
    </section>
    <section class="metrics">
        <h3>Cintura</h3>
        <input type="text" id="cintura" placeholder="Cintura">
    </section>
    <section class="metrics">
        <h3>Cuadriceps</h3>
        <input type="text" id="cuadriceps" placeholder="Cuadriceps">
    </section>
    <section class="metrics">
        <h3>Freq. cardiaca media</h3>
        <input type="text" id="freqMedia" placeholder="Freq. cardiaca media">
    </section>
    <section class="metrics">
        <h3>Freq. cardiaca maxima</h3>
        <input type="text" id="freqMax" placeholder="Freq. cardiaca maxima">
    </section>
    <button type="submit">Guardar</button> 
</form>
        
    `}

        async _saveMetrics (e) {
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
            const results = JSON.stringify(new Metrics(metricas.peso,metricas.imc,metricas.grasa,metricas.liquido,metricas.gastoKcal,metricas.brazoder,metricas.brazoIzq,metricas.torax,metricas.cintura,metricas.cuadriceps,metricas.freqMedia,metricas.freqMax));
            console.log(userLogged, results)
            await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/update/metrics/${userLogged._id}`, 'POST', results);


        }


}

customElements.define('metrics-lit', MetricsLit)