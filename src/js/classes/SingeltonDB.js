
export class SingeltonDB {
    
    /**
     * @type {User[]|undefined }
     */
    database

    /**
     * Returns the database array.
     *
     * If the database is uninitialized, it is initialized with an empty array.
     *
     * @returns {User[]} database
     */
    
   get() {
    if (this.database === undefined) {
        this.database = []
    }
    return this.database
   }

   push() {
    this.database?.push(...arguments)
   }
}
