<template>
  <div id="ClientList">
    <div class="column" style="height: 75px"></div>
    <q-btn label="refresh" @click="refresh()"/>
    <q-input class="q-pa-sm" v-model="searchQuery" type="text" label="search by first name"/>
    <MinListView
      :headerFields="headerFields"
      :perPage="perPage"
      :modelList="modelList"
      :title="title"
      :modelName="modelName"
    />
  </div>
</template>

<script>
import Client from 'src/store/ORM/client.js'
import Menu from 'src/store/ORM/menu.js'
import Models from 'src/store/ORM/models.js'
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import {
  myRep,
  sentenceCase,
  doNotify,
  prettyStringJson
} from 'src/utils/stringutils.js'
import MinListView from 'src/pages/Views/ListViews/MinListView'
import * as constants from 'src/services/ServiceConstants.js'
import { Loading } from 'quasar'
import Axios from 'axios'
function filterIt(obj, substr) {
  return obj.first_name.includes(substr)
}
export default {
  name: 'ClientList',
  components: {
    MinListView
  },
  data() {
    return {
      headerFields: [],
      perPage: 40,
      searchQuery: ''
    }
  },
  computed: {
    ...mapState('UserModules', {
      user: state => state.user,
      clients: state => state.clients,
      // nutritionist: state => state.user.nutritionist,
      nutid: state => state.user.nutritionist['id']
    }),
    ...mapState('entities', {
      nutritionist: state => state.nutritionist.data
    }),
    getApiUrl() {
      return `${constants.APIURL}api/clients/?nutritionist=${this.nutid}`
    },
    title() {
      return 'Client List Belonging to Nutritioninst ID#' + `${this.nutid}`
    },
    modelList() {
      // let mosh = Models.Client.find(24)
      // console.log(mosh.first_name.includes(this.searchQuery))
      let unfiltered = Models.Client.query().get()

      let filtered = unfiltered.filter(
        model =>
          model.first_name
            .toLowerCase()
            .search(this.searchQuery.toLowerCase()) !== -1
      )

      return filtered
    },

    modelName() {
      return 'clients'
    }
  },
  // watch: {
  //   clients(newValue, oldValue) {
  //     console.log(
  //       `clients has changed - old value ${oldValue}, new value ${newValue}`
  //     )
  //   }
  // },
  methods: {
    APIURL() {
      return this.getApiUrl
    },
    refresh() {
      this.$axios
        .get(`api/clients/?nutritionist=${this.nutid}`)
        .then(result => {
          Client.create({ data: result.data.results })
          this.$store.dispatch('UserModules/SetClients', Client.query().get())
        })
        .catch(error => {
          try {
            let err = prettyStringJson(error.response.data)
            for (let index in err) {
              if (err[index]) {
                this.$q.notify({
                  message: err[index] + '.',
                  position: 'center',
                  closeBtn: true,
                  color: 'negative'
                })
              }
            }
          } catch (err2) {
            this.$q.notify({
              message: 'Network Error, Please Check your internet Connection',
              position: 'center',
              closeBtn: true,
              color: 'negative'
            })
          }
          // alert(error)
        })
    }
  },
  created() {
    let tests = Models.Test.query().get()
    console.log(tests)
    let evs = Models.Event.query().get()
    console.log(evs)
    this.$axios
      .get(`api/clients/?nutritionist=${this.nutid}`)
      .then(result => {
        Client.create({ data: result.data.results })
        this.$store.dispatch('UserModules/SetClients', Client.query().get())
      })
      .catch(error => {
        try {
          let err = prettyStringJson(error.response.data)
          for (let index in err) {
            if (err[index]) {
              this.$q.notify({
                message: err[index] + '.',
                position: 'center',
                closeBtn: true,
                color: 'negative'
              })
            }
          }
        } catch (err2) {
          this.$q.notify({
            message: 'Network Error, Please Check your internet Connection',
            position: 'center',
            closeBtn: true,
            color: 'negative'
          })
        }
        // alert(error)
      })
  }
}
</script>
