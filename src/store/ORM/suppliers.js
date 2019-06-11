import { Model } from '@vuex-orm/core'

export default class Supplier extends Model {
    // This is the name used as module name of the Vuex Store.
    static entity = 'suppliers'
    static primaryKey = 'id'
    // List of all fields (schema) of the post model. `this.attr` is used
    // for the generic field type. The argument is the default value.
    static fields() {
        return {

            id: this.attr(null),
            owner: this.attr(null),
            name: this.attr(null),
            email: this.attr(null),
            phone_number: this.attr(''),







        }
    }
}