<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="width: 700px; max-width: 80vw;">
      <!-- <div v-for="(item ,head) in event" :key="item.id">{{head }} : {{ item }}</div> -->
      <q-card-actions align="around">
        <q-btn color="primary" label="Save" icon="fas fa-edit" @click="save(event)" v-close-popup/>
        <q-btn
          color="negative"
          label="Delete"
          icon="fas fa-calendar-times"
          @click="del(event)"
          v-close-popup
        />
      </q-card-actions>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-icon :name="event.icon" class="shadow-1"/>
          </q-avatar>

          <!-- <q-input v-model="event.start" type="text"/> -->

          <q-input
            color="brown-8"
            v-model="event.start"
            label="Enter Start date and time"
            mask="####-##-## ##:##"
          >
            <template v-slot:append>
              <q-icon name="far fa-calendar" class="cursor-pointer">
                <!-- <q-popup-edit v-model="event.start">
              <q-date v-model="event.start" dense autofocus counter/>
              <q-time v-model="startTime" dense autofocus counter/>
                </q-popup-edit>-->

                <q-popup-proxy v-model="showDateTimeScroller" style="width:500px;">
                  <q-date-time-scroller
                    border-color="#009688"
                    bar-color="#FFFF00"
                    color="teal-6"
                    background-color="white"
                    inner-color="white"
                    inner-background-color="teal-6"
                    style="height: 280px; width:250px;"
                    v-model="event.start"
                    @close="() => { showDateTimeScroller = false }"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            color="brown-8"
            v-model="event.end"
            label="Enter End date and time"
            mask="####-##-## ##:##"
          >
            <template v-slot:append>
              <q-icon name="far fa-calendar" class="cursor-pointer">
                <!-- <q-popup-edit v-model="event.start">
              <q-date v-model="event.start" dense autofocus counter/>
              <q-time v-model="startTime" dense autofocus counter/>
                </q-popup-edit>-->

                <q-popup-proxy v-model="showDateTimeScroller2">
                  <q-date-time-scroller
                    border-color="#009688"
                    bar-color="#FFFF00"
                    color="teal-6"
                    background-color="white"
                    inner-color="white"
                    inner-background-color="teal-6"
                    style="height: 280px; width:250px;"
                    v-model="event.end"
                    @close="() => { showDateTimeScroller2 = false }"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-item-section>
        <q-item-section></q-item-section>
        <q-item-section>
          <q-select
            transition-show="scale"
            transition-hide="scale"
            v-model="event.client"
            :options="clients"
            label="Client"
            emit-value
            map-options
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-input v-model="event.title" label="Title" type="text"/>

        <q-input v-model="event.content" label="Short Description" type="text"/>
      </q-item>
      <q-item>
        <q-item-section>
          <q-editor v-model="event.contentFull" label="Long Description" type="html"/>
          <!-- <q-item-label v-html="event.contentFull"/> -->
        </q-item-section>
      </q-item>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Models from 'src/store/ORM/models.js'
import {
  myRep,
  sentenceCase,
  doNotify,
  prettyStringJson
} from 'src/utils/stringutils.js'
export default {
  name: 'Event',
  props: ['event'],
  data() {
    return {
      form: {
        dateTime: '',
        title: '',
        notify: false
      },
      showDateTimeScroller: false,
      showDateTimeScroller2: false,
      dateTime1: '2019-05-10 06:30',
      startTime: '',
      timeRangeInput: '09:05 - 23:30',
      editableEvents: true
    }
  },
  computed: {
    clients() {
      let cli = Models.Client.query().get()
      let options = []
      for (let i in cli) {
        // console.log(cli[i])
        // console.log(i)
        let repr = cli[i].id + ' ' + cli[i].first_name + ' ' + cli[i].last_name
        options.push(repr)
      }
      // console.log('options')
      // console.log(options)
      return options
    },
    client() {
      let event = this.event
      // console.log(event)
      let cli = Models.Client.find(event.client)
      // console.log(cli)
      // let repr = cli.id + ' ' + cli.first_name + ' ' + cli.last_name
      if (cli !== null) {
        return cli
      }
      let cli2 = Models.Client.find(event.client.substring(2, 0))
      return cli2
    }
  },

  methods: {
    /* istanbul ignore next */
    del(event) {
      let form = event

      let id = event.id
      if (id !== null && typeof id !== 'undefined') {
        this.$axios
          .delete(`api/calendarevents/${id}/`)
          .then(result => {
            this.$q.notify({
              classes: 'text-bold text-h6',
              message: 'Success!',
              position: 'right',
              icon: 'fas fa-thumbs-up',

              type: 'info'
            })
            this.$q.loading.hide()
            Models.Event.delete({ where: id })
          })

          .catch(err => {})
      } else {
      }
      //

      // formData.append('username', vm.username)
      // formData.append('password', vm.password)
      // formData.append('email', vm.email)
      this.hide()
    },
    /* istanbul ignore next */
    save(event) {
      let form = event

      let id = event.id

      console.log(typeof id === 'undefined')
      // if we are editing and existing event
      if (id !== null && typeof id !== 'undefined') {
        // EDIT
        if (typeof event.client !== 'number') {
          event.client = event.client.substring(2, 0)
        }
        event.icon = 'shopping_cart'

        this.$axios
          .put(`api/calendarevents/${id}/`, event)
          .then(result => {
            console.log('RESULT ', result)

            this.$q.notify({
              classes: 'text-bold text-h6',
              message: 'Success!',
              position: 'right',
              icon: 'fas fa-thumbs-up',

              type: 'info'
            })
            Models.Event.update({ where: event.id, data: event })
            this.$q.loading.hide()
          })
          .catch(err => {
            this.$q.loading.hide()
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
              alert('last error in the edit case')
              this.$q.notify({
                message: 'Network Error, Server might be Offline',
                position: 'center',

                color: 'negative'
              })
            }
          })
      } else {
        // CREATE
        if (typeof event.client !== 'number') {
          event.client = event.client.substring(2, 0)
        }
        let nut_id = Models.Nutritionist.query().get()[0].id
        event.nutritionist = nut_id
        event.icon = 'shopping_cart'
        this.$axios
          .post(`api/calendarevents/`, event)
          .then(result => {
            console.log('RESULT ', result)

            this.$q.notify({
              classes: 'text-bold text-h6',
              message: 'Success!',
              position: 'right',
              icon: 'fas fa-thumbs-up',

              type: 'info'
            })
            Models.Event.insert({ data: result.data })
            this.$q.loading.hide()
          })
          .catch(err => {
            this.$q.loading.hide()
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
              alert('last error in the create case')
              this.$q.notify({
                message: 'Network Error, Server might be Offline',
                position: 'center',

                color: 'negative'
              })
            }
          })
        //  block of code to be executed if the condition is false
      }
      //

      // formData.append('username', vm.username)
      // formData.append('password', vm.password)
      // formData.append('email', vm.email)
      this.hide()
    },
    // following method is REQUIRED
    // (don't change its name --> "show")
    /* istanbul ignore next */
    show() {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    /* istanbul ignore next */
    hide() {
      this.$refs.dialog.hide()
    },
    /* istanbul ignore next */
    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },
    /* istanbul ignore next */
    onOKClick() {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      var vm = this.form
      let formData = new FormData()

      formData.append('dateTime', vm.dateTime)
      formData.append('title', vm.title)
      formData.append('notify', vm.notify)
      this.$emit('ok', { vm })
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick() {
      // we just need to hide dialog
      /* istanbul ignore next */
      this.hide()
    }
  }
}
</script>