import Client from './client.js'
import Nutritionist from './nutritionists.js'
import Menu from './menu.js'
import PrivateNote from './private_notes.js'
import Event from './calendarevents'
import Test from './tests'
import InternalMessage from 'src/store/ORM/messages.js';
import Supplier from 'src/store/ORM/suppliers.js'
const Models = {
    namespaced: true,
    Client,
    Nutritionist,
    Menu,
    PrivateNote,
    Event,
    Test,
    InternalMessage,
    Supplier

}
export default Models