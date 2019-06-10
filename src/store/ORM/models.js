import Client from './client.js'
import Nutritionist from './nutritionists.js'
import Menu from './menu.js'
import PrivateNote from './private_notes.js'
import Event from './calendarevents'
import Test from './tests'
import InternalMessage from 'src/store/ORM/messages.js';
const Models = {
    namespaced: true,
    Client,
    Nutritionist,
    Menu,
    PrivateNote,
    Event,
    Test,
    InternalMessage

}
export default Models