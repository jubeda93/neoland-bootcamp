//Definiendo la clase ( primera letra de la clase, siempre en mayus)

class User {
    /**
     * Constructor de la clase User
     * @param {string} name - nombre del usuario
     * @param {string} surname - apellido del usuario
     * @param {string} email - email del usuario
     * @param {string} phone - telefono del usuario
     */
    constructor(name, surname, email, phone) {
        this.name = name
        this.surname = surname
        this.email = email
        this.phone = phone 
    }
}

class UserDatos extends User {
/**
 * Constructs an instance of UserDatos with additional personal details.
 *
 * @param {string} sexo - The gender of the user.
 * @param {number} edad - The age of the user.
 * @param {number} altura - The height of the user in centimeters.
 * @param {number} peso - The weight of the user in kilograms.
 */

    constructor(sexo, edad, altura, peso) {
        this.sexo = sexo
        this.edad = edad
        this.altura = altura
        this.peso = peso
    }
}
