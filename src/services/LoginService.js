import axios from 'axios'
import { Loading } from 'quasar'
import authHeader from '../helpers/auth-header.js'
import * as constants from './ServiceConstants'

const apiClient = axios.create({
  baseURL: `${constants.APIURL}/api/auth/login/`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  login(payload) {
    return apiClient.post(payload)
  }
}
