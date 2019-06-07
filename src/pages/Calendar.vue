<template>
  <div>
    <vue-cal
      class="vuecal--blue-theme"
      xsmall
      :selected-date="selectedDate"
      :time-from="5 * 60"
      :time-step="30"
      :time-cell-height="15"
      :disable-views="['years', 'year', 'day']"
      :events="events"
      :on-event-click="onEventClick"
      :no-event-overlaps="true"
      today-button
    >
      <!-- <div slot="no-event">Nothing here 👌</div> -->

      <!-- Will be added if a title is set -->
      <div slot="event-renderer" slot-scope="{ event, view }">
        <small class="vuecal__event-time">
          <div style="font-size:1.1rem;" class="text-weight-bold">{{getClient(event)}}</div>
          <q-icon style="color:orange; font-size:2rem;" :name="event.icon"/>

          <div
            style="color:orange font-size:15px;"
            class="vuecal__event-title text-weight-bold text-underline"
          >{{event.title}}</div>
          <strong class="text-blue">Start:</strong>
          <span style="font-size:15px;">{{ event.startTime }}</span>
          <br>
          <strong class="text-green">End:</strong>
          <span style="font-size:15px;">{{ event.endTime }}</span>
        </small>
      </div>
      <!-- or if title is set and `editable-events` option is set to `true` -->
      <!-- <div class="vuecal__event-title vuecal__event-title--edit" contenteditable/> -->

      <!-- Will be added if `time` option is set to `true` -->
      <div class="vuecal__event-time"/>

      <!-- Will be added if a content is set -->
      <div class="vuecal__event-content">hihihihihi</div>
    </vue-cal>
    <!-- Alternatively to custom cells if you just want custom no-event text: -->

    <q-btn push color="secondary" label="Create a New Event">
      <q-popup-proxy :breakpoint="1000">
        <q-card class="even-form" style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h4 text-info">Create a New Calendar Event</div>
            <q-btn
              v-close-popup
              push
              color="info"
              class="float-right"
              label="Submit"
              @click="add(form)"
            />
          </q-card-section>
          <!-- <div v-for="(item ,head) in event" :key="item.id">{{head }} : {{ item }}</div> -->

          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-icon :name="form.icon" class="shadow-1"/>
              </q-avatar>

              <!-- <q-input v-model="event.start" type="text"/> -->

              <q-input
                color="brown-8"
                v-model="form.start"
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
                        v-model="form.start"
                        @close="() => { showDateTimeScroller = false }"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                color="brown-8"
                v-model="form.end"
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
                        v-model="form.end"
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
                v-model="form.client"
                :options="clients"
                label="Client"
                emit-value
                map-options
              />
              {{form.client.id}} {{form.client.first_name}} {{form.client.last_name}}
            </q-item-section>
          </q-item>
          <q-item>
            <q-input v-model="form.title" label="Title" type="text"/>

            <q-input v-model="form.content" label="Short Description" type="text"/>
          </q-item>
          <q-item>
            <q-item-section>
              <q-editor v-model="form.contentFull" label="Long Description" type="html"/>
              <q-item-label v-html="form.contentFull"/>
            </q-item-section>
          </q-item>
        </q-card>
      </q-popup-proxy>
    </q-btn>
  </div>
</template>

<style>
</style>

<script>
var moment = require('moment')
import { mapGetters } from 'vuex'
import { isCssColor } from 'src/utils/color'
import events from 'src/utils/events'
import Event from 'src/components/Event'
import { padTime } from 'src/utils/time'
import { date, colors, Platform } from 'quasar'
import Models from 'src/store/ORM/models.js'
let Client = Models.Client
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import {
  myRep,
  sentenceCase,
  doNotify,
  prettyStringJson
} from 'src/utils/stringutils.js'
// import toJson from '@vuex-orm/core'
const formDefault = {
  title: '',
  details: '',
  allDay: false,
  dateTimeStart: '',
  dateTimeEnd: '',
  icon: '',
  bgcolor: '#0000FF'
}

export default {
  name: 'CalendarPage',
  components: { VueCal, Event },

  data() {
    let tmp = new Date()
    let today = moment(tmp).format('YYYY-MM-DD HH:mm')
    console.log(today)
    return {
      overlapEvents: true,
      selectedEvent: {},
      showDateTimeScroller: false,
      showDateTimeScroller2: false,
      dateTime1: '2019-05-10 06:30',
      showDialog: false,
      form: {
        start: today,
        end: today,
        client: '',
        nutritionist: '',
        title: '',
        content: '',
        contentFull: '',
        accept: false
      }
    }
  },
  mounted() {},

  computed: {
    events: () => {
      let evs = []
      let ev = Models.Event.query()
        .get()
        .map(model => model.$toJson())
      // console.log(ev)
      for (let i = 0; i < ev.length; i += 1) {
        // console.log('ev[i]', ev[i])
        let e = ev[i]
        evs.push(e)
      }

      console.log(evs)
      return evs
    },
    clients() {
      let cli = Models.Client.query().get()
      let options = []
      for (let i in cli) {
        // console.log(cli[i])
        // console.log(i)
        let repr = cli[i].id + ' ' + cli[i].first_name + ' ' + cli[i].last_name
        var d = new Object()
        d.label = repr
        d.value = cli[i].id
        options.push(d)
      }

      return options
    },

    selectedDate() {
      let today = new Date()
      return today
    }
  },
  watch: {},
  methods: {
    getClient(event) {
      let cid = event.client
      let cli = Models.Client.find(cid)
      return cli.id + ' ' + cli.first_name
    },
    add(form) {
      let nut_id = Models.Nutritionist.query().get()[0].id
      console.log(nut_id)
      form.nutritionist = nut_id
      console.log(form)

      this.$axios
        .post(`api/calendarevents/`, form)
        .then(result => {
          console.log('RESULT ', result)
          this.$q.notify({
            classes: 'text-bold text-h6',
            message: 'Success!',
            position: 'right',
            icon: 'fas fa-thumbs-up',

            type: 'info'
          })
          this.$q.loading.hide()
          this.$store.dispatch('UserModules/AddEvent', result.data)

          this.form = {
            start: '',
            end: '',
            client: '',
            nutritionist: '',
            title: '',
            content: '',
            contentFull: '',
            accept: false
          }
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
            this.$q.notify({
              message: 'Network Error, Server might be Offline',
              position: 'center',

              color: 'negative'
            })
          }
        })
    },
    onEventClick(event, e) {
      this.showDialog = true
      this.selectedEvent = event
      e.stopPropagation()
      this.$q
        .dialog({
          component: Event,
          dark: true,

          cancel: true,
          persistent: true,
          event: event
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
    }
  }
}
</script>

<style lang="stylus">
// calendar overrides
.q-calendar-daily__day-interval:hover {
  background-color: rgba(0, 0, 255, 0.1);
}

.q-calendar-weekly__workweek:hover {
  background-color: rgba(0, 0, 255, 0.1);
}

.q-calendar-weekly__day:hover {
  background-color: rgba(0, 0, 255, 0.1);
}

.q-calendar-weekly__head-weekday:hover {
  background-color: rgba(0, 0, 255, 0.1);
}

// this page
.calendar-container {
  position: relative;
}

.my-event {
  width: 100%;
  position: absolute;
  font-size: 12px;
}

.full-width {
  left: 0;
  width: 100%;
}

.left-side {
  left: 0;
  width: 49.75%;
}

.right-side {
  left: 50.25%;
  width: 49.75%;
}
</style>