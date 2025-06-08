// @ts-check

export class Workout {

    /**
     * Constructor de Clase
     * @param {string} [_id=''] - ID de la clase
     * @param {string} hora - Hora de la clase
     * @param {string} fecha - Fecha de la clase
     * @param {string} disciplina - Disciplina de la clase
     * @param {number} plazas - N mero de plazas disponibles
     * @param {string[]} usuarios - Array de usuarios que se han apuntado
     */
    
    constructor(hora,fecha,plazas,disciplina, _id = undefined,usuarios = [],) {
        this._id = _id
        this.hora = hora
        this.fecha = fecha
        this.plazas = plazas
        this.disciplina = disciplina
        this.usuarios = usuarios
    }
}