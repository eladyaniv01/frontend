<template>
  <div id="NoteListView" round class="col-xs-12 col-sm-6 col-md-4 flex q-pa-sm q-ma-sm">
    <q-card class="q-pa-sm" v-for="model in modelList" :key="model.id">
      <q-btn flat @click="deleteNote(model.id)" label="X"/>
      <q-expansion-item
        expand-separator
        icon="note"
        class="q-pa-sm q-ma-sm shadow-5 text-yellow-9"
        :label="model.title"
        caption="Click to see the Note"
        style="width: 100%; max-width: 300px;"
      >
        <q-card>
          <q-card-section>
            <q-icon right class="text-yellow" name="note" style="font-size: 3em;"></q-icon>
            <div class="text-info text-subtitle2 text-left text-capitalize">ID {{model.id}}</div>
            <div class="text-subtitle2 text-primary">{{model.content}}</div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card>
  </div>
</template>

<script>
import Client from 'src/store/ORM/client.js'
import Menu from 'src/store/ORM/menu.js'
import Box from 'src/components/Box'
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
  name: 'NoteListView',
  components: {
    Box
  },
  props: {
    headerFields: {
      type: Array,
      required: false
    },
    perPage: {
      type: Number,
      required: false
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
      search: '',
      client: Client.find(parseInt(this.$route.params['id'], 10))
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
    deleteNote(id) {
      this.client['private_notes'] = this.client['private_notes'].filter(
        note => note.id !== id
      )
      this.$store.dispatch(
        'UserModules/SetClientNotes',
        this.client['private_notes']
      )
      this.$axios
        .delete(`api/clientnotes/${id}`)
        .then(result => {
          console.log('RESULT ', result)

          this.$q.notify({
            classes: 'text-bold text-h6',
            message: 'Note has been Deleted',
            position: 'right',
            icon: 'fas fa-thumbs-up',

            type: 'info'
          })

          this.$q.loading.hide()
        })
        .catch(err => {
          this.$q.loading.hide()
          console.log(err)
          console.log(err.config)
          console.log(err.request)
          console.log(err.response)
          if (err.response) {
            let errors = prettyStringJson(err.response.data)
            for (let index in errors) {
              if (errors[index]) {
                this.$q.notify({
                  message: errors[index] + '.',
                  position: 'center',

                  color: 'negative'
                })
              }
            }
          } else {
            this.$q.notify({
              message: 'Network Error, Server might be Offline',
              position: 'center',

              color: 'negative'
            })
          }
        })
    },
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
      let f = _.clone(this.modelList[0]) || -1

      delete f.problems
      delete f['stats']

      return _.keys(f)
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
