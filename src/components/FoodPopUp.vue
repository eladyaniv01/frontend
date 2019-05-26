<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="width: 700px; max-width: 80vw;">
      <q-card-actions align="around">
        <q-btn color="primary" label="Save" icon="fas fa-edit" @click="save(food)" v-close-popup/>
      </q-card-actions>
      <q-item>Options to replace {{food.id}} {{food.hebrew_name}}</q-item>
      <q-select v-model="choice" :options="OPTS" label="Replacements"/>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import Models from 'src/store/ORM/models.js'
import {
  myRep,
  sentenceCase,
  doNotify,
  prettyStringJson
} from 'src/utils/stringutils.js'
export default {
  name: 'FoodPopUp',
  props: ['food', 'options', 'menu_id', 'meal_name'],
  data() {
    return {
      choice: '',

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
    ...mapState('UserModules', {
      user: state => state.user,
      // clients: state => state.user.nutritionist.clients,
      // nutritionist: state => state.user.nutritionist,
      nutid: state => state.user.nutritionist['id']
    }),
    OPTS() {
      let arr = []
      for (let i in this.$props.options) {
        let op = this.$props.options[i]
        let item = ''
        item += op.id
        item += ' ' + op.hebrew_name
        arr.push(item)
      }
      return arr
    },
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
    save(food) {
      let oldf = food
      let newf = this.choice
      let nid = newf.split(' ')[0]
      let mid = this.menu_id
      let name = String(this.meal_name)
      console.log(name)
      this.$axios.post('api/foodswitch/', {
        meal_n: name,
        menu_id: mid,
        old_fid: oldf.id,
        new_fid: nid
      })

      // GRAB MENU SET AFTER SAVE
      this.$axios
        .get(`api/menus/?nutritionist=${this.nutid}`)
        .then(result => {
          Menu.deleteAll()
          console.log(result.data.results)
          Menu.create({ data: result.data.results })
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
            // this.$q.notify({
            //   message: 'Network Error, Please Check your internet Connection',
            //   position: 'center',
            //   closeBtn: true,
            //   color: 'negative'
            // })
          }
          // alert(error)
        })

      // this.$axios
      //   .put(`api/calendarevents/${id}/`, event)
      //   .then(result => {
      //     console.log('RESULT ', result)

      //     this.$q.notify({
      //       classes: 'text-bold text-h6',
      //       message: 'Success!',
      //       position: 'right',
      //       icon: 'fas fa-thumbs-up',

      //       type: 'info'
      //     })
      //     Models.Event.update({ where: event.id, data: event })
      //     this.$q.loading.hide()
      //   })
      //   .catch(err => {
      //     this.$q.loading.hide()
      //     if (err.response) {
      //       let errors = prettyStringJson(err.response.data)
      //       for (let index in errors) {
      //         if (errors[index]) {
      //           this.$q.notify({
      //             message: errors[index] + '.',
      //             position: 'center',

      //             color: 'negative'
      //           })
      //         }
      //       }
      //     } else {
      //       alert('last error in the edit case')
      //       this.$q.notify({
      //         message: 'Network Error, Server might be Offline',
      //         position: 'center',

      //         color: 'negative'
      //       })
      //     }
      //   })

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