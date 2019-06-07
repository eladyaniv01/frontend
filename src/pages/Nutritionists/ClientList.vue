<template>
  <div id="ClientList">
    <div class="column" style="height: 75px"></div>
    <q-option-group
      v-model="render"
      inline
      class="q-mb-md"
      :options="[
        { label: 'Cards', value: 'cards' },
        { label: 'Table', value: 'table' }
  
      ]"
    />

    <q-btn label="refresh" @click="refresh()"/>

    <q-input class="q-pa-sm" v-model="searchQuery" type="text" label="search by first name"/>
    <!-- <autoComplete v-model="searchQuery" :options="modelList.first_name" label="label"/> -->
    <transition name="fade">
      <q-markup-table class="q-ma-sm" v-if="render == 'table'">
        <thead>
          <tr class="bg-green-1">
            <th
              v-for="field in sortedFields"
              :key="field"
            >{{_.capitalize(_.replace(field, /_/gi, ' '))}}</th>
          </tr>
        </thead>

        <tbody>
          <tr
            class="cursor-pointer"
            v-for="model in modelList"
            :key="model.id"
            @click="onRowClick(model.id)"
          >
            <td v-for="field in sortedFields" :key="field">{{model[field]}}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </transition>

    <MinListView
      v-if="render == 'cards'"
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
import ClientComp from 'src/components/ClientComp'
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import {
  myRep,
  sentenceCase,
  doNotify,
  prettyStringJson
} from 'src/utils/stringutils.js'
import MinListView from 'src/pages/Views/ListViews/MinListView'
import autoComplete from 'src/components/AutoComplete'
import * as constants from 'src/services/ServiceConstants.js'
import { Loading } from 'quasar'
import Axios from 'axios'
function filterIt(obj, substr) {
  return obj.first_name.includes(substr)
}
export default {
  name: 'ClientList',
  components: {
    MinListView,
    autoComplete,
    ClientComp
  },
  data() {
    return {
      headerFields: [],
      perPage: 40,
      searchQuery: '',
      render: 'table'
    }
  },
  computed: {
    sortedFields() {
      let fields = _.keys(_.clone(Models.Client.query().get()[0]))

      let sorted = fields.sort()

      var filtered = sorted.filter(function(value, index, arr) {
        return value != 'id'
      })
      var filtered_ex = sorted.filter(function(value, index, arr) {
        return value != 'id' && value != 'client'
      })
      if (fields.includes('client')) {
        filtered_ex.unshift('id')
        filtered_ex.unshift('client')

        return filtered_ex
      }
      filtered.unshift('id')
      filtered.splice(filtered.indexOf('$id'), 1)
      filtered.splice(filtered.indexOf('events'), 1)
      filtered.splice(filtered.indexOf('got_free_menu'), 1)
      filtered.splice(filtered.indexOf('menus'), 1)
      filtered.splice(filtered.indexOf('nutritionist'), 1)
      filtered.splice(filtered.indexOf('private_notes'), 1)
      filtered.splice(filtered.indexOf('tests'), 1)
      filtered.splice(filtered.indexOf('first_name'), 1)
      filtered.splice(filtered.indexOf('last_name'), 1)
      filtered.splice(filtered.indexOf('id'), 1)
      filtered.splice(filtered.indexOf('created_at'), 1)
      filtered.splice(filtered.indexOf('height'), 1)
      filtered.splice(filtered.indexOf('weight'), 1)
      filtered.splice(filtered.indexOf('sex'), 1)

      filtered.unshift('sex')
      filtered.unshift('first_name')
      filtered.unshift('last_name')
      filtered.unshift('id')

      filtered.push('height')
      filtered.push('weight')
      filtered.push('created_at')

      return filtered
    },
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
    acList() {
      let names = []
      let clis = Models.Client.query().get()
      for (let i in clis) {
        names.push(clis[i].first_name)
      }
      return names
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
    onRowClick(id) {
      this.$router.push(`/nutritionist/clients/${id}`)
    },
    fields() {
      let f = _.clone(Models.Client.query().get()[0]) || -1

      return _.keys(f)
    },
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
<style scoped>
</style>
