<template>
  <div>
    <div id="ClientDetail" class="row q-pa-sm q-ma-sm">
      <q-expansion-item
        expand-separator
        icon="fas fa-ambulance"
        label="Medical Information"
        caption="For Accurate Menu Generation"
        style="width: 100%;"
        header-class="bg-secondary text-white"
      >
        <q-scroll-area
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          :content-active-style="contentActiveStyle"
          style="height: 300px; width: 100%;"
        >
          <!-- <q-option-group v-model="cbc" :options="options" color="primary" inline/> -->
          <ul class="flex items-center" v-for="item in tests" :key="item.id">
            <li v-if="item.group == 'Hematology'">
              <b class="text-red">{{item.group}}</b>
            </li>
            <li v-if="item.group == 'Chemistry'">
              <b class="text-green">{{item.group}}</b>
            </li>
            <li v-if="item.group == 'Endocrinology'">
              <b class="text-blue">{{item.group}}</b>
            </li>
            <li>{{ item.name }}</li>

            <li>
              <q-radio dense v-model="item.value" val="Low" label="Low" />
              <q-radio dense v-model="item.value" val="Normal" label="Normal" />
              <q-radio dense v-model="item.value" val="High" label="High" />
            </li>
          </ul>
        </q-scroll-area>
      </q-expansion-item>
    </div>
    <div class="row q-pa-sm q-ma-sm justify-center">
      <DashboardCard
        class="col-auto"
        head1="Menus"
        :head1count="menuCount"
        head2="Last 7 Days"
        :head2count="newMenuCount"
      />
      <DashboardCard
        class="col-auto"
        head1="Meetings"
        :head1count="eventCount"
        head2="Last 7 Days"
        :head2count="newEventCount"
      />
      <DashboardCard
        class="col-auto"
        head1="Sales"
        head1count="147.0$"
        head2="Last 7 Days"
        head2count="34$"
      />
      <DashboardCard
        class="col-auto"
        head1="Purchases"
        head1count="27$"
        head2="Last 7 Days"
        head2count="5.43$"
      />
    </div>

    <div class="row q-pa-sm q-ma-sm justify-center">
      <q-btn push color="secondary" icon="edit" @click="EditClient()">
        <q-tooltip>Edit</q-tooltip>
      </q-btn>

      <div>
        <ClientComp
          class="q-pa-sm q-ma-sm"
          :fields="fields()"
          :model="this.client"
          modelName="client"
        ></ClientComp>
      </div>

      <div>
        <q-btn class="align-right" push color="secondary" icon="fas fa-weight-hanging">
          +
          <q-popup-proxy>
            <div class="col-grow q-pa-sm q-ma-sm">
              Height
              <q-input filled v-model="weightHeightForm.height" type="text" />
              <br />Weight
              <q-input filled v-model="weightHeightForm.weight" type="text" />

              <div>
                <q-btn
                  label="Add a new Weight/Height set"
                  @click="addNewHWSet()"
                  type="submit"
                  color="secondary"
                  v-close-popup
                ></q-btn>
              </div>
            </div>
          </q-popup-proxy>
          <q-tooltip>Add a new height-weight set</q-tooltip>
        </q-btn>
      </div>
    </div>

    <div class="row q-pa-sm q-ma-sm justify-center">
      <div class="col-4">
        <q-select
          style="width:50%"
          transition-show="scale"
          transition-hide="scale"
          v-model="spec"
          :options="specs"
          label="Reffer to a Specialist"
          emit-value
          map-options
        />
        <q-btn @click="makeRef">Reffer Your Client</q-btn>
      </div>
      <div class="col-auto">
        <q-markup-table>
          <tr>
            <th class="text-bold text-green">
              <u>
                <b>Past Reffrences</b>
              </u>
            </th>
          </tr>
          <tr>
            <th>Date</th>
            <th>Specialist</th>
            <th>Status</th>
          </tr>
          <tr v-for="ref in Refs" :key="ref.id">
            <td>{{created_at(ref)}}</td>
            <td>{{ref.getter_name}}</td>
            <td>{{ref.done|pb}}</td>
          </tr>
        </q-markup-table>
      </div>
    </div>

    <div class="row q-pa-sm q-ma-sm items-start">
      <q-separator vertical />

      <div class="col-grow q-pa-sm q-ma-sm">
        <div class="text-subtitle2" align="center">
          <q-select
            style="width:50%"
            transition-show="scale"
            transition-hide="scale"
            v-model="template"
            :options="menuTemplates"
            label="Pick Menu Template"
            emit-value
            map-options
          />
          <q-btn>pick</q-btn>

          <q-btn
            push
            icon="fas fa-plus"
            color="secondary"
            v-model="client"
            @click="gotoMenu()"
            label="Menu"
          >
            <q-tooltip>Generate a New Menu</q-tooltip>
          </q-btn>
        </div>

        <MenuListView
          :headerFields="this.headerFields"
          :perPage="this.perPage"
          :modelList="this.Menus"
          :title="this.MenuTableToolTip"
          modelName="menus"
        />
      </div>
      <q-separator vertical />

      <div class="col-grow q-pa-sm q-ma-sm">
        <q-expansion-item
          class="shadow-1 overflow-hidden"
          icon="note"
          label="Private Notes"
          style="border-radius:10px"
          dense
          header-class="bg-secondary text-white"
          round
          default-opened
        >
          <div class="text-subtitle2" align="center">
            <q-btn icon="fas fa-plus" push color="secondary" label="Note">
              <q-popup-proxy>
                <div class="col-grow q-pa-sm q-ma-sm">
                  Title
                  <q-input
                    filled
                    v-model="noteForm.title"
                    hint="Pick a Descriptive name to find fast"
                    type="text"
                  />
                  <br />Content
                  <q-input filled v-model="noteForm.content" type="textarea" />

                  <div>
                    <q-btn
                      label="Save"
                      @click="createNote()"
                      type="submit"
                      color="secondary"
                      v-close-popup
                    ></q-btn>
                  </div>
                </div>
              </q-popup-proxy>
              <q-tooltip>Write a Note</q-tooltip>
            </q-btn>
          </div>
          <NoteListView :modelList="PrivateNotes" modelName="notes" />
        </q-expansion-item>

        <q-expansion-item
          class="shadow-1 overflow-hidden"
          icon="fas fa-calendar-alt"
          label="Calendar Events"
          style="border-radius:10px"
          dense
          header-class="bg-secondary text-white"
          round
          default-opened
        >
          <div class="col-10 q-pa-sm q-ma-sm">
            <h6></h6>
            <div class="text-subtitle2" align="center"></div>

            <EventListView
              :headerFields="this.headerFields"
              :perPage="this.perPage"
              :modelList="Events"
              :title="this.MenuTableToolTip"
              modelName="events"
            />
          </div>
        </q-expansion-item>
      </div>
      <q-separator vertical />
    </div>
  </div>
</template>
<script>
var moment = require('moment')
import { mapState, mapGetters } from 'vuex'
import Client from 'src/store/ORM/client.js'
import Nutritionist from 'src/store/ORM/nutritionists.js'
import ModelDetailView from 'src/pages/Views/SingleViews/ModelDetailView'
import ClientUpdate from 'src/pages/Nutritionists/Forms/ClientUpdate'
import ModelListView from 'src/pages/Views/ListViews/ModelListView'
import MenuListView from 'src/pages/Views/ListViews/MenuListView'
import NoteListView from 'src/pages/Views/ListViews/NoteListView'
import EventListView from 'src/pages/Views/ListViews/EventListView'
import MinListView from 'src/pages/Views/ListViews/MinListView'
import Models from 'src/store/ORM/models.js'
import ClientComp from 'src/components/ClientComp'
import Splitpanes from 'splitpanes'
import DashboardCard from 'src/components/DashboardCard'
import Reference from 'src/store/ORM/refferences.js'
import 'splitpanes/dist/splitpanes.css'
import {
  myRep,
  sentenceCase,
  doNotify,
  prettyStringJson
} from 'src/utils/stringutils.js'
export default {
  name: 'ClientDetail',

  components: {
    ModelDetailView,
    ModelListView,
    ClientComp,
    ClientUpdate,
    NoteListView,
    Splitpanes,
    EventListView,
    MinListView,
    MenuListView,
    DashboardCard
  },
  data() {
    return {
      spec: '',
      noteForm: {
        title: '',
        content: ''
      },
      weightHeightForm: {
        height: '',
        weight: ''
      },
      form: {
        title: '',
        content: '',
        accept: false
      },
      template: '2 Default',
      showDialog: false,
      menu: Object,
      result: Object,
      headerFields: [],
      perPage: 10,
      client: Models.Client.find(parseInt(this.$route.params['id'], 10)),
      tests: Models.Test.query()
        .where('client', parseInt(this.$route.params['id'], 10))
        .get()
    }
  },
  watch: {},
  created() {},
  mounted() {
    var id = parseInt(this.$route.params['id'], 10)
    let client = Models.Client.find(id)

    this.client = client
    var integer = parseInt(this.$route.params['id'], 10)
    var key = _.findKey(this.clients, { id: integer })
    let m = this.clients[key]
    this.$store.dispatch('UserModules/SetCurrentClient', m)
  },
  computed: {
    specs() {
      let sp = Models.Supplier.query().get()
      let options = []
      for (let i in sp) {
        // console.log(cli[i])
        // console.log(i)
        let repr = sp[i].id + ' ' + sp[i].name
        options.push(repr)
      }
      // console.log('options')
      // console.log(options)
      return options
    },
    ...mapState('UserModules', {
      user: state => state.user,
      userName: state => state.user.username,
      nutritionist: state => state.user.nutritionist,
      clients: state => state.user.nutritionist.clients,
      currentClient: state => state.currentClient
    }),
    newMenuCount() {
      // int time interval (days) for a week it will be 7
      let now = moment(new Date())
      var id = parseInt(this.$route.params['id'], 10)
      let client = Client.find(id)
      let count = 0

      let total = Models.Menu.query()
        .where('client', id)
        .get()
      for (let i in total) {
        let ca = moment(Date.parse(total[i].created_at))
        if (now.diff(ca, 'days') <= 7) {
          count += 1
        }
      }
      return count
    },
    menuCount() {
      // int time interval (days) for a week it will be 7
      let now = moment(new Date())
      var id = parseInt(this.$route.params['id'], 10)
      let client = Client.find(id)
      let count = 0

      let total = Models.Menu.query()
        .where('client', id)
        .get()

      return total.length
    },
    newEventCount() {
      // int time interval (days) for a week it will be 7
      let now = moment(new Date())
      var id = parseInt(this.$route.params['id'], 10)
      let client = Client.find(id)
      let count = 0

      let total = Models.Event.query()
        .where('client', id)
        .get()
      for (let i in total) {
        let ca = moment(Date.parse(total[i].start))
        if (now.diff(ca, 'days') <= 7) {
          count += 1
        }
      }
      return count
    },
    eventCount() {
      // int time interval (days) for a week it will be 7
      let now = moment(new Date())
      var id = parseInt(this.$route.params['id'], 10)
      let client = Client.find(id)
      let count = 0

      let total = Models.Event.query()
        .where('client', id)
        .get()

      return total.length
    },
    Menus() {
      var cid = parseInt(this.$route.params['id'], 10)
      var nid = Models.Nutritionist.query().get()[0].id
      let menus = Models.Menu.query()
        .where(obj => obj.client == cid)
        .where(obj => obj.nutritionist == nid)
        .get()

      return menus
    },
    Refs() {
      let refs = Models.Reference.query()
        .where('client', parseInt(this.$route.params['id'], 10))
        .get()

      return refs
    },
    PrivateNotes() {
      var id = parseInt(this.$route.params['id'], 10)
      let notes = Models.PrivateNote.query()
        .where(note => note.client == id)
        .get()

      return notes
    },
    Events() {
      var cid = parseInt(this.$route.params['id'], 10)
      var nid = Models.Nutritionist.query().get()[0].id
      let events = Models.Event.query()
        .where(obj => obj.client == cid)
        .where(obj => obj.nutritionist == nid)
        .get()

      return events
    },
    MenuTableToolTip() {
      return 'Menu Table'
    },
    heading() {
      var integer = parseInt(this.$route.params['id'], 10)
      var key = _.findKey(this.clients, { id: integer })
      return `Client File for ClientID - ${this.clients[key].id} ( ${this.clients[key].first_name} )`
    },
    NOupdatePath() {
      return ''
    },
    updatePath() {
      var integer = parseInt(this.$route.params['id'], 10)
      return `/nutritionist/clients/${integer}/update`
    },
    contentStyle() {
      return {
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: '#555'
      }
    },

    contentActiveStyle() {
      return {
        backgroundColor: 'rgba(0,0,0,0.03)',
        color: 'black'
      }
    },

    thumbStyle() {
      return {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '10px',
        opacity: 0.75
      }
    },
    menuTemplates() {
      let sp = this.nutritionist.menu_templates
      let options = []
      for (let i in sp) {
        // console.log(cli[i])
        // console.log(i)

        options.push(sp[i])
      }
      // console.log('options')
      // console.log(options)
      return options
      // return this.nutritionist.menu_templates
    }
  },
  methods: {
    bmi(value) {
      if (isNaN(value)) {
        return value
      }
      if (!value) {
        return ''
      }
      value = parseFloat(value)
      if (value < 17) {
        return `text-red bg-amber-3`
      }
      if (value < 20.7) {
        return `text-orange`
      }
      if (value < 25.8) {
        return `text-green bg-teal-1`
      }
      if (value < 32.3) {
        return `text-orange`
      }
      if (value > 40) {
        return `text-red text-bold bg-amber-2`
      }

      return ''
    },
    makeRef() {
      this.$q.loading.show({
        delay: 200, // ms
        message: 'Processing ...'
      })

      let spec = parseInt(this.spec, 10)
      // console.log(spec)

      let formData = new FormData()
      formData.append('sender', Models.Nutritionist.query().get()[0].id)
      formData.append('getter', spec)
      formData.append('client', this.client.id)
      // for (var pair of formData.entries()) {
      //   // console.log(pair[0] + ', ' + pair[1])
      // }

      // for (let data in formData) {
      //   alert(data)
      // }
      // console.log('sender ', Models.Nutritionist.query().get()[0].id)
      // console.log('getter ', spec)
      // console.log('client ', this.client.id)
      // console.log(formData)
      this.$axios
        .post('api/makeref', formData)
        .then(result => {
          // console.log('RESULT ', result)

          this.$q.notify({
            classes: 'text-bold text-h6',
            message: 'Success!',
            position: 'right',
            icon: 'fas fa-thumbs-up',

            type: 'info'
          })
          // console.log(this.client['private_notes'])
          // console.log('RESULT REF')
          // console.log(result.data.reference)
          Models.Reference.insert({ data: result.data.reference })

          this.$q.loading.hide()
        })
        .catch(err => {
          this.$q.loading.hide()
          // console.log(err)
          // console.log(err.config)
          // console.log(err.request)
          // console.log(err.response)
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

    created_at(ref) {
      let d = moment(ref.created_at).calendar()
      return d
    },
    EditClient(e) {
      this.showDialog = true

      this.$q
        .dialog({
          component: ClientUpdate,
          dark: true,
          label: 'Hi',

          cancel: true,
          persistent: true,
          model: this.client,
          is_updating: true
        })
        .onOk(data => {
          console.log('>>>> OK, received', data)
        })
        .onCancel(() => {
          console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          console.log('I am triggered on both OK and Cancel')
        })
    },
    addNewHWSet() {
      this.$q.loading.show({
        delay: 200, // ms
        message: 'Processing ...'
      })
      var vm = this.weightHeightForm

      let formData = new FormData()

      formData.append('height', vm.height)
      formData.append('weight', vm.weight)
      // formData.append('nutritionist', this.nutritionist[0].id)
      formData.append('client', this.client.id)
      for (var pair of formData.entries()) {
        // console.log(pair[0] + ', ' + pair[1])
      }

      // for (let data in formData) {
      //   alert(data)
      // }

      this.$axios
        .post('api/create_weight_height_client_set', formData)
        .then(result => {
          // console.log('RESULT ', result)

          this.$q.notify({
            classes: 'text-bold text-h6',
            message: 'Success!',
            position: 'right',
            icon: 'fas fa-thumbs-up',

            type: 'info'
          })
          // console.log('RESULT = ', result)

          // console.log(this.client['private_notes'])
          this.client['weight_height_sets'] = [
            ...this.client['weight_height_sets'],
            {
              id: result.data.weight_height_set.id,
              client: result.data.weight_height_set.set_client,
              time_stamp: result.data.weight_height_set.time_stamp,
              height: result.data.weight_height_set.height,
              weight: result.data.weight_height_set.weight
            }
          ]
          Models.WeightHeightSet.insert({ data: result.data.weight_height_set })
          this.$store.dispatch(
            'UserModules/SetClientWeightHeightSets',
            this.client['weight_height_sets']
          )
          vm.height = null
          vm.weight = null
          // this.form.accept = false
          this.$forceUpdate()
          this.$q.loading.hide()
        })
        .catch(err => {
          this.$q.loading.hide()
          // console.log(err)
          // console.log(err.config)
          // console.log(err.request)
          // console.log(err.response)
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
    createNote() {
      this.$q.loading.show({
        delay: 200, // ms
        message: 'Processing ...'
      })
      var vm = this.noteForm

      let formData = new FormData()

      formData.append('title', vm.title)
      formData.append('content', vm.content)
      formData.append('nutritionist', this.nutritionist[0].id)
      formData.append('client', this.client.id)
      for (var pair of formData.entries()) {
        // console.log(pair[0] + ', ' + pair[1])
      }

      // for (let data in formData) {
      //   alert(data)
      // }

      this.$axios
        .post('api/clientnotes/', formData)
        .then(result => {
          // console.log('RESULT ', result)

          this.$q.notify({
            classes: 'text-bold text-h6',
            message: 'Success!',
            position: 'right',
            icon: 'fas fa-thumbs-up',

            type: 'info'
          })
          // console.log(this.client['private_notes'])
          this.client['private_notes'] = [
            ...this.client['private_notes'],
            {
              id: result.data.id,
              title: result.data.title,
              content: result.data.content
            }
          ]
          Models.PrivateNote.insert({ data: result.data })
          this.$store.dispatch(
            'UserModules/SetClientNotes',
            this.client['private_notes']
          )
          this.form.title = null
          this.form.content = null
          this.form.accept = false
          this.$q.loading.hide()
        })
        .catch(err => {
          this.$q.loading.hide()
          // console.log(err)
          // console.log(err.config)
          // console.log(err.request)
          // console.log(err.response)
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
    onReset() {
      this.form.title = null
      this.form.content = null
      this.form.accept = false
    },
    fields() {
      let f = _.clone(this.client) || -1

      return _.keys(f)
    },
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
      filtered.push('weight_height_sets')
      filtered.push('created_at')

      return filtered
    },

    gotoMenu() {
      // CREATE MENU BUTTON
      var integer = parseInt(this.$route.params['id'], 10)
      var key = _.findKey(this.clients, { id: integer })
      let tid = parseInt(this.template, 10)
      console.log(tid)

      this.$router.push(
        `/nutritionist/clients/${this.clients[key].id}/menu/${tid}/`
      )

      this.$axios
        .get(`api/clients/?nutritionist=${this.nutritionist.id}`)
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
}
</script>
<style scoped>
ul {
  columns: 3;
  display: block;
}
ul li {
  display: column;
  align-content: right;
}
table.tableizer-table {
  font-size: 12px;
  border: 1px solid #ccc;
  font-family: Arial, Helvetica, sans-serif;
}
.tableizer-table td {
  padding: 4px;
  margin: 3px;
  border: 1px solid #ccc;
}
.tableizer-table th {
  background-color: #104e8b;
  color: #fff;
  font-weight: bold;
}
</style>
 
