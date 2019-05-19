import { Model } from '@vuex-orm/core'

export default class Event extends Model {
    // This is the name used as module name of the Vuex Store.
    static entity = 'events'
    static primaryKey = 'id'
    // List of all fields (schema) of the post model. `this.attr` is used
    // for the generic field type. The argument is the default value.
    static fields() {
        return {
            id: this.attr(null),
            title: this.attr(''),
            start: this.attr(''),
            end: this.attr(''),
            icon: this.attr(''),
            contentFull: this.attr(''),
            content: this.attr(''),
            class: this.attr(''),
            background: this.attr(false),
            client: this.attr(null),
            nutritionist: this.attr(null),


        }
    }
}