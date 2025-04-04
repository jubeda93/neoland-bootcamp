//@ts-check

export class UserMetrics {

    /**
     * Constructor de la clase UserMetrics
     * @param {string} [fecha = 0] - Fecha de la medicion
     * @param {string} [peso = 0] - Peso del usuario en kg
     * @param {string} [imc = 0] - Indice de masa corporal
     * @param {string} [grasa = 0] - Porcentaje de grasa corporal
     * @param {string} [freqBasal = 0] - Frecuencia basal del usuario
     * @param {string} [freqMax = 0] - Frecuencia maxima del usuario
     * @param {string} [torax = 0] - Perimetro del torax del usuario
     * @param {string} [cintura = 0] - Perimetro de la cintura del usuario
     * @param {string} [abdomen = 0] - Perimetro del abdomen del usuario
     * @param {string} [muslo = 0] - Perimetro del muslo del usuario
     */
    constructor (fecha = '0',peso= '0',imc= '0',grasa= '0',freqBasal= '0',freqMax= '0',torax= '0',cintura= '0',abdomen= '0',muslo= '0') {

        this.fecha = fecha
        this.peso = peso
        this.imc = imc
        this.grasa = grasa
        this.fecfreqBasalha = freqBasal
        this.fechafreqMax = freqMax
        this.torax = torax
        this.cintura = cintura
        this.abdomen = abdomen
        this.muslo = muslo
        

    }


    


}