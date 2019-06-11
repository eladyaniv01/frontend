
import { Model } from '@vuex-orm/core'
import Menu from './menu.js'
import Client from './client.js'
import PrivateNote from './private_notes.js';
import Event from './calendarevents.js';
import InternalMessage from './messages.js';
import Supplier from 'src/store/ORM/suppliers.js'
export default class Nutritionist extends Model {
    // This is the name used as module name of the Vuex Store.
    static entity = 'nutritionists'
    static primaryKey = 'id'
    // List of all fields (schema) of the post model. `this.attr` is used
    // for the generic field type. The argument is the default value.
    static fields() {
        return {
            id: this.attr(null),
            first_name: this.attr(''),
            last_name: this.attr(''),
            owner: this.attr(''),
            identification: this.attr(''),
            dob: this.attr(''),
            sex: this.attr(''),
            address: this.attr(''),
            email: this.attr(''),
            created_at: this.attr(''),
            // clients: this.attr(null),
            clients: this.hasMany(Client, 'nutritionist'),
            menus: this.hasMany(Menu, 'nutritionist'),
            events: this.hasMany(Event, 'nutritionist'),
            private_notes: this.hasMany(PrivateNote, 'nutritionist'),
            suppliers: this.hasMany(Supplier, 'nutritionist'),
            // messages: this.hasMany(InternalMessage, 'sender')



        }
    }
}