import { Model } from '@vuex-orm/core'
import Client from './client.js'
export default class Menu extends Model {
    // This is the name used as module name of the Vuex Store.
    static entity = 'menus'

    // List of all fields (schema) of the post model. `this.attr` is used
    // for the generic field type. The argument is the default value.
    static fields() {
        return {
            id: this.attr(null),
            meals: this.attr(''),
            created_at: this.attr(''),
            nutritionist: this.attr(null),
            // client: this.hasOne(Client, 'client'),
            client: this.attr(null),
            problems: this.attr(''),
            stats: this.attr(''),

        }
    }
}