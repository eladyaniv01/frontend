import { Model } from '@vuex-orm/core'

export default class Reference extends Model {
    // This is the name used as module name of the Vuex Store.
    static entity = 'references'
    static primaryKey = 'id'
    // List of all fields (schema) of the post model. `this.attr` is used
    // for the generic field type. The argument is the default value.
    static fields() {
        return {

            id: this.attr(null),
            sender: this.attr(null),
            getter: this.attr(null),
            sender_name: this.attr(''),
            getter_name: this.attr(''),
            client: this.attr(null),
            done: this.attr(null),
            created_at: this.attr(''),






        }
    }
}