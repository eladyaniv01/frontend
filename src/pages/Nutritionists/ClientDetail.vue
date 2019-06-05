<template>
  <div id="ClientDetail" class="row q-pa-sm q-ma-sm">
    <q-expansion-item
      expand-separator
      icon="fas fa-ambulance"
      label="Medical Information"
      caption="For Accurate Menu Generation"
      style="width: 100%;"
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
            <q-radio dense v-model="item.value" val="Low" label="Low"/>
            <q-radio dense v-model="item.value" val="Normal" label="Normal"/>
            <q-radio dense v-model="item.value" val="High" label="High"/>
          </li>
        </ul>
      </q-scroll-area>
    </q-expansion-item>

    <div class="col-3">
      <h6>General Information</h6>
      <q-btn push color="primary" icon="edit" @click="EditClient()"/>
      <Box
        class="q-pa-sm q-ma-sm shadow-5 justify-right"
        :fields="fields()"
        :model="this.client"
        modelName="client"
      ></Box>
    </div>
    <q-separator vertical/>

    <div class="col-4 q-pa-sm q-ma-sm">
      <h6>Daily Menu's</h6>
      <div class="text-subtitle2" align="center">
        <q-btn
          push
          icon="fas fa-plus"
          color="primary"
          v-model="client"
          @click="gotoMenu()"
          label="Menu"
        />
      </div>

      <MenuListView
        :headerFields="this.headerFields"
        :perPage="this.perPage"
        :modelList="this.Menus"
        :title="this.MenuTableToolTip"
        modelName="menus"
      />
    </div>
    <q-separator vertical/>

    <div class="col-4 q-pa-sm q-ma-sm">
      <q-expansion-item
        class="shadow-1 overflow-hidden"
        popup
        icon="note"
        label="Private Notes"
        style="border-radius:10px"
        dense
        header-class="bg-primary text-white"
        round
        default-opened
      >
        <div class="text-subtitle2" align="center">
          <q-btn icon="fas fa-plus" push color="primary" label="Note">
            <q-popup-proxy>
              <div class="col-auto q-pa-sm q-ma-sm">
                Title
                <q-input
                  filled
                  v-model="noteForm.title"
                  hint="Pick a Descriptive name to find fast"
                  type="text"
                />
                <br>Content
                <q-input filled v-model="noteForm.content" type="textarea"/>

                <div>
                  <q-btn
                    label="Create A Note"
                    @click="createNote()"
                    type="submit"
                    color="primary"
                    v-close-popup
                  />
                </div>
              </div>
            </q-popup-proxy>
          </q-btn>
        </div>
        <NoteListView :modelList="PrivateNotes" modelName="notes"/>
      </q-expansion-item>

      <q-expansion-item
        class="shadow-1 overflow-hidden"
        popup
        icon="fas fa-calendar-alt"
        label="Calendar Events"
        style="border-radius:10px"
        dense
        header-class="bg-primary text-white"
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
    <q-separator vertical/>
  </div>
</template>
<script>
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
import Box from 'src/components/Box'
import Splitpanes from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
export default {
  name: 'ClientDetail',

  components: {
    ModelDetailView,
    ModelListView,
    Box,
    ClientUpdate,
    NoteListView,
    Splitpanes,
    EventListView,
    MinListView,
    MenuListView
  },
  data() {
    return {
      noteForm: {
        title: '',
        content: ''
      },
      form: {
        title: '',
        content: '',
        accept: false
      },
      options: [
        {
          label: 'Option 1',
          value: 'Normal'
        },
        {
          label: 'Option 2',
          value: 'High'
        },
        {
          label: 'Option 3',
          value: 'Low'
        }
      ],
      showDialog: false,
      menu: Object,
      result: Object,
      headerFields: [],
      perPage: 10,
      client: Models.Client.find(parseInt(this.$route.params['id'], 10)),
      tests: Models.Test.query()
        .where('client', parseInt(this.$route.params['id'], 10))
        .get(),
      nutritionist: Nutritionist.query().get()
    }
  },
  watch: {
    cbc(newValue, oldValue) {
      console.log('cbc changed from ', oldValue)
      console.log('cbc changed to ', newValue)
    }
  },
  created() {},
  mounted() {
    var id = parseInt(this.$route.params['id'], 10)
    let client = Client.find(id)

    this.client = client
    var integer = parseInt(this.$route.params['id'], 10)
    var key = _.findKey(this.clients, { id: integer })
    let m = this.clients[key]
    this.$store.dispatch('UserModules/SetCurrentClient', m)
  },
  computed: {
    ...mapState('UserModules', {
      user: state => state.user,
      userName: state => state.user.username,

      clients: state => state.user.nutritionist.clients
    }),

    Menus() {
      var cid = parseInt(this.$route.params['id'], 10)
      var nid = Models.Nutritionist.query().get()[0].id
      let menus = Models.Menu.query()
        .where(obj => obj.client == cid)
        .where(obj => obj.nutritionist == nid)
        .get()

      return menus
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
      return `Client File for ClientID - ${this.clients[key].id} ( ${
        this.clients[key].first_name
      } )`
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
        backgroundColor: '#eee',
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
    }
  },
  methods: {
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
        console.log(pair[0] + ', ' + pair[1])
      }

      // for (let data in formData) {
      //   alert(data)
      // }

      this.$axios
        .post('api/clientnotes/', formData)
        .then(result => {
          console.log('RESULT ', result)

          this.$q.notify({
            classes: 'text-bold text-h6',
            message: 'Success!',
            position: 'right',
            icon: 'fas fa-thumbs-up',

            type: 'info'
          })
          console.log(this.client['private_notes'])
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
    onReset() {
      this.form.title = null
      this.form.content = null
      this.form.accept = false
    },
    fields() {
      let f = _.clone(this.client) || -1

      return _.keys(f)
    },
    gotoMenu() {
      // CREATE MENU BUTTON
      var integer = parseInt(this.$route.params['id'], 10)
      var key = _.findKey(this.clients, { id: integer })
      this.$router.push(`/nutritionist/clients/${this.clients[key].id}/menu`)
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
</style>
 
