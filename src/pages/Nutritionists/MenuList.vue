<template>
  <div id="MenuList">
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

    <transition name="fade">
      <q-markup-table class="q-ma-sm" v-if="render == 'table'">
        <thead>
          <tr class="bg-green-1">
            <th v-for="field in fields" :key="field">{{_.capitalize(_.replace(field, /_/gi, ' '))}}</th>
          </tr>
        </thead>

        <tbody>
          <tr
            class="cursor-pointer"
            v-for="model in modelList"
            :key="model.id"
            @click="onRowClick(model.id)"
          >
            <td class="text-center" v-for="field in fields" :key="field">{{model[field]}}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </transition>
    <ModelListView
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
import Models from 'src/store/ORM/models.js'
import Menu from 'src/store/ORM/menu.js'
import Client from 'src/store/ORM/client.js'
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import {
  myRep,
  sentenceCase,
  doNotify,
  prettyStringJson
} from 'src/utils/stringutils.js'
import ModelListView from 'src/pages/Views/ListViews/ModelListView'
import * as constants from 'src/services/ServiceConstants.js'
import { Loading } from 'quasar'
import Axios from 'axios'

export default {
  name: 'MenuList',
  components: {
    ModelListView
  },
  data() {
    return {
      menus: Menu.query().get(),
      headerFields: ['id', 'username', 'email'],
      perPage: 40,
      render: 'table'
    }
  },
  computed: {
    fields() {
      let f = _.clone(Models.Menu.query().get()[0]) || -1
      let fields = _.keys(f)
      fields.splice(fields.indexOf('$id'), 1)
      fields.splice(fields.indexOf('meals'), 1)
      fields.splice(fields.indexOf('problems'), 1)
      fields.splice(fields.indexOf('stats'), 1)
      fields.splice(fields.indexOf('nutritionist'), 1)
      return fields
    },
    ...mapState('UserModules', {
      user: state => state.user,
      // clients: state => state.user.nutritionist.clients,
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
      this.menus = Menu.query().get()
      return this.menus
    },
    modelName() {
      return 'menus'
    }
  },

  methods: {
    onRowClick(id) {
      this.$router.push(`/nutritionist/menus/${id}`)
    },
    APIURL() {
      return this.getApiUrl
    },
    refresh() {
      this.$axios
        .get(`api/menus/?nutritionist=${this.nutid}`)
        .then(result => {
          Menu.deleteAll()
          console.log(result.data.results)
          Menu.create({ data: result.data.results })
          this.menus = Menu.query().get()
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
    // console.log(this.menus)
  }
}
</script>
