<template>
  <div id="ModelListView" class="col-xs-12 col-sm-6 col-md-4 flex justify-center items-stretch">
    <MenuBox
      class="q-pa-sm q-ma-sm shadow-5"
      v-for="model in modelList"
      :key="model.id"
      :fields="fields()"
      :model="model"
      :modelName="modelName"
    ></MenuBox>
  </div>
</template>

<script>
import Client from 'src/store/ORM/client.js'
import Menu from 'src/store/ORM/menu.js'

import MenuBox from 'src/components/MenuBox'
import axios from 'axios'
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import {
  myRep,
  sentenceCase,
  doNotify,
  prettyStringJson,
  GetFormattedDate
} from 'src/utils/stringutils.js'

export default {
  name: 'ModelListView',
  components: {
    MenuBox
  },
  props: {
    headerFields: {
      type: Array,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    APIURL: {
      type: String,
      required: false
    },
    modelList: {
      type: Array,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    update_suffix: {
      type: String,
      required: false
    },
    modelName: {
      type: String,
      required: true
    },
    APIURL: {
      type: String,
      required: false
    },
    basePath: {
      type: String,
      required: false
    }
  },

  data() {
    return {
      current: 1,
      data: {},
      separator: 'vertical',
      search: ''
    }
  },

  watch: {
    data() {
      this.data
    }
  },

  computed: {
    ...mapState({
      user: state => state['UserModules'].user,
      token: state => state['UserModules'].token,
      clients: state => state['UserModules'].clients
    }),
    letter: function(client) {
      return client.first_name
    },
    maxPage() {
      return Math.ceil(this.modelList.length / this.perPage) || -1
    },

    searchRegExp() {
      return new RegExp(`(.*)${this.search}(.*)`)
    }
  },
  methods: {
    searchMatch(authorName) {
      return authorName.toLowerCase().match(this.searchRegExp)
    },
    doSomething() {
      alert('still not functional :)')
    },
    CleanModel(model) {
      let f = _.clone(model)
      delete f.problems
      delete f.stats
      return _.reverse(f)
    },
    clientName(value) {
      let client = Client.find(value)

      return client.id + ' ' + client.first_name
    },
    fields() {
      return ['id', 'client', 'meals', 'created_at']
    },
    getPath(id, field) {
      console.log('getPath from ModelListView')
      if (field == 'id') {
        return `${this.modelName}/${id}/`
      }
      return `${field}/${id}/`
    },
    menuCount(value, model) {
      let id = model.id
      let count = Menu.query()
        .where('client', id)
        .get()

      return count.length
    },
    defs() {
      return modelList.length
    },
    // ,
    // modelList() {
    //   return this.defs()['data']['results'] || '-1'
    // },

    getDate(string) {
      return GetFormattedDate(string)
    }
  }
}
</script>
