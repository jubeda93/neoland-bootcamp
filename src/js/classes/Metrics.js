// @ts-check

export class Metrics {

    /**
     * Constructor de la clase Metrics
     * @param {string} peso - Peso del usuario
     * @param {string} imc - Indice de masa corporal del usuario
     * @param {string} grasa - Porcentaje de grasa corporal del usuario
     * @param {string} liquido - Porcentaje de liquido corporal del usuario
     * @param {string} gastokcal - Gasto calórico diario del usuario
     * @param {string} brazoDer - Medida del brazo derecho del usuario
     * @param {string} brazoIzq - Medida del brazo izquierdo del usuario
     * @param {string} torax - Medida del tórax del usuario
     * @param {string} cintura - Medida de la cintura del usuario
     * @param {string} cuadriceps - Medida del cuádriceps del usuario
     * @param {string} freqMedia - Frecuencia cardiaca media del usuario
     * @param {string} freqMax - Frecuencia cardiaca máxima del usuario
     * @param {string} freqBasal - Frecuencia cardiaca basal del usuario
     */
    constructor(peso,imc,grasa,liquido,gastokcal,brazoDer,brazoIzq,torax,cintura,cuadriceps,freqMedia,freqMax,freqBasal) {
        this.peso = peso
        this.imc = imc
        this.grasa = grasa
        this.liquido = liquido
        this.gastokcal = gastokcal
        this.brazoDer = brazoDer
        this.brazoIzq = brazoIzq
        this.torax = torax
        this.cintura = cintura
        this.cuadriceps = cuadriceps
        this.freqMedia = freqMedia
        this.freqMax = freqMax
        this.freqBasal = freqBasal
    }
}