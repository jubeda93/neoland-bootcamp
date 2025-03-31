export class SingletonDB {
    database

   get() {
    if (this.database === undefined) {
        this.database = []
    }
    return this.database
   }

   push() {
    this.database.push(...arguments)
   }
}
