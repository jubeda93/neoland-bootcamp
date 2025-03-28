//Definiendo la clase ( primera letra de la clase, siempre en mayus)

export class User {  // clase padre
    /**
     * Constructor de la clase User
     * @param {string} name - nombre del usuario
     * @param {string} email - email del usuario
     * @param {string} surname - apellido del usuario
     * @param {string} phone - telefono del usuario
     */
    constructor(name, email, surname, phone) {
        this.name = name
        this.email = email
        this.surname = surname
        this.phone = phone 
    }
}


//=============== HERENCIA DE CLASES ========================//


export class UserDatos extends User {
/**
 * Constructs an instance of UserDatos with additional personal details.
 *
 * @param {string} sexo - The gender of the user.
 * @param {number} edad - The age of the user.
 * @param {number} altura - The height of the user in centimeters.
 * @param {number} peso - The weight of the user in kilograms.
 */

    constructor(name, surname, email, phone, sexo, edad, altura, peso) {
        super(name, surname, email, phone)  //mandamos los valores de la clase padre
        this.sexo = sexo
        this.edad = edad
        this.altura = altura
        this.peso = peso
    }
}
