import { Model } from '@vuex-orm/core'
import Menu from './menu.js'
import PrivateNote from './private_notes.js';
import Event from './calendarevents.js';
import WeightHeightSet from './weightheightsets.js';
import Test from './tests.js';
export default class Client extends Model {
    // This is the name used as module name of the Vuex Store.
    static entity = 'clients'
    static primaryKey = 'id'
    // List of all fields (schema) of the post model. `this.attr` is used
    // for the generic field type. The argument is the default value.
    static fields() {
        return {
            id: this.attr(null),
            // purchases: this.hasMany(Purchase, 'purchases'),
            menus: this.hasMany(Menu, 'client'),
            private_notes: this.hasMany(PrivateNote, 'client'),
            events: this.hasMany(Event, 'client'),
            weight_height_sets: this.hasMany(WeightHeightSet, 'client'),
            tests: this.hasMany(Test, 'client'),


            nutritionist: this.attr(null),

            first_name: this.attr(''),
            last_name: this.attr(''),
            identification: this.attr(''),
            dob: this.attr(''),

            sex: this.attr(''),
            address: this.attr(''),
            email: this.attr(''),
            phone_number: this.attr(''),
            created_at: this.attr(''),
            got_free_menu: this.attr(''),
            bmi: this.attr(''),
            bmr: this.attr(''),


        }
    }
}