import Client from './client.js'
import Nutritionist from './nutritionists.js'
import Menu from './menu.js'
import PrivateNote from './private_notes.js'
import Event from './calendarevents'
import Test from './tests'
import InternalMessage from 'src/store/ORM/messages.js';
import Supplier from 'src/store/ORM/suppliers.js'
import Reference from 'src/store/ORM/refferences.js'
const Models = {
    namespaced: true,
    Client,
    Nutritionist,
    Menu,
    PrivateNote,
    Event,
    Test,
    InternalMessage,
    Supplier,
    Reference

}
export default Models