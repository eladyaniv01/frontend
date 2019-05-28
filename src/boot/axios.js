import Vue from 'vue'
import axios from 'axios'
import * as constants from 'src/services/ServiceConstants'






export default ({ Vue }) => {
  Vue.prototype.$axios = axios.create({
    baseURL: `${constants.APIURL}`,
    crossDomain: true,
    // headers: { 'Access-Control-Allow-Methods': ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'] }



    // ^ ^ ^ this will allow you to use this.$axios
    //       so you won't necessarily have to import axios in each vue file
  })

}
