// @ts-check
export class DataProfile {

    /**
     * @param {string} [name]
     * @param {string} [surName]
     * @param {string} [bornDate]
     * @param {string} [phone]
     * @param {string} [adress]
     * @param {string} [postalCode]
     * @param {string} [emergName]
     * @param {string} [emergPhone]
     */
constructor(name,surName,bornDate,phone,adress,postalCode,emergName,emergPhone){
    this.name = name
    this.surName = surName
    this.bornDate = bornDate
    this.phone = phone
    this.adress = adress
    this.postalCode = postalCode
    this.emergName = emergName
    this.emergPhone = emergPhone
    
}
}