import axios from 'axios'
import * as constants from './ServiceConstants'
const apiClient = axios.create({
  baseURL: `${constants.APIURL}/api`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
import { Loading } from 'quasar'
export default {
  getNutritionists: async function() {
    // await new Promise(resolve => setTimeout(resolve, 6000))

    // console.log('waited 6000')
    return apiClient.get('/nutritionists')
  }
}
