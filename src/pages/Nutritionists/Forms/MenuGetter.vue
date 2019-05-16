<template>
  <div class="MenuGetter"></div>
</template>

<script>
import { mapState } from 'vuex'
import Models from 'src/store/ORM/models.js'
import {
  myRep,
  sentenceCase,
  doNotify,
  prettyStringJson
} from 'src/utils/stringutils.js'

export default {
  name: 'MenuGetter',

  data() {
    return {
      separator: 'vertical',
      meals: [
        'breakfast',
        'brunch',
        'lunch',
        'afternoon',
        'dinner',
        'goodnight'
      ]
    }
  },
  computed: {
    ...mapState('UserModules', {
      user: state => state.user,
      userName: state => state.user.username,
      nutritionist: state => state.user.nutritionist,
      currentClient: state => state.currentClient
    }),
    heading() {
      return 'Account Information'
    },
    updatePath() {
      return '/nutritionist/profile/update'
    },
    menu() {
      console.log('THIS MENU ', this.menu)
      return this.menu
    }
  },
  mounted() {
    this.loadMenu()
  },

  methods: {
    loadMenu() {
      this.$q.loading.show({
        delay: 200, // ms
        message: 'Processing ...'
      })

      let formData = new FormData()

      formData.append('nutritionist', this.nutritionist.id)
      formData.append('client', this.currentClient.id)
      formData.append('user', this.user.id)

      this.$axios
        .post(`api/menu`, formData)
        .then(result => {
          if (result.data.includes('Error')) {
            this.$q.loading.hide()
            this.$q.notify({
              message: result.data,
              position: 'center',
              closeBtn: true,
              color: 'negative'
            })
            this.$router.push('/nutritionist/clients')
          }
          // this.menu = result.data.menuDict
          // console.log('RESULT.DATA.MENUDICT')
          // console.log(result.data.menuDict)
          // this.result = result.data
          console.log(results.data)
          console.log(Models.Menu.insert({ data: result.data }))
          Models.Menu.insert({ data: result.data })
          this.$q.loading.hide()
          this.$router.push('/nutritionist/clients')
        })
        .catch(error => {
          this.$q.loading.hide()
          this.$router.push('/nutritionist/clients')
          // let err = prettyStringJson(error.response.data)
          // for (let index in err) {
          //   if (err[index]) {
          //     this.$q.notify({
          //       message: err[index] + '.',
          //       position: 'center',
          //       closeBtn: true,
          //       color: 'negative'
          //     })
          //   }
          // }
        })
    },
    showProbs(grid) {
      let problems = []
      let index
      for (index in this.menu['stats']['problems']) {
        let problem = {
          label: _.capitalize(this.menu['stats']['problems'][index]),
          icon: 'fas fa-exclamation-circle',
          color: 'red',
          id: index
        }
        problems.push(problem)
      }
      this.$q
        .bottomSheet({
          message: 'Problems Detected',
          grid,
          actions: problems
        })
        .onOk(action => {})
        .onCancel(() => {})
        .onDismiss(() => {})
    },
    showStats(grid) {
      let stats = []
      let index
      for (index in this.menu['stats']['stats']) {
        let stat = {
          label: this.menu['stats']['stats'][index],
          icon: 'fas fa-calendar-alt',
          color: 'blue',
          id: index
        }
        stats.push(stat)
      }
      this.$q
        .bottomSheet({
          message: 'Daily Nutritional Stats',
          grid,
          actions: stats
        })
        .onOk(action => {})
        .onCancel(() => {})
        .onDismiss(() => {})
    }
  }
}
</script>
<style scoped>
</style>
 
