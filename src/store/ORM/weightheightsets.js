import { Model } from '@vuex-orm/core'

export default class WeightHeightSet extends Model {
    // This is the name used as module name of the Vuex Store.
    static entity = 'WeightHeightSets'
    static primaryKey = 'id'
    // List of all fields (schema) of the post model. `this.attr` is used
    // for the generic field type. The argument is the default value.
    static fields() {
        return {
            id: this.attr(null),
            time_stamp: this.attr(''),
            height: this.attr(''),
            weight: this.attr(null),
            set_client: this.attr(null),
            client: this.attr(null)



        }
    }
}