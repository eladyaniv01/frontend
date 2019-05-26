<template>
  <div class="MenuDetailView">
    <div class="row inline content-stretch q-gutter-sm">
      <q-markup-table
        dense
        bordered
        class="bg-blue-grey-2 shadow-5"
        :separator="separator"
        title="Menu"
        no-data-label="null"
        v-for="(MEAL,key, index) in (menu['meals'])"
        :key="index"
      >
        <thead>
          <tr>
            <th class="self-center">
              <div
                class="text-blue-grey-9 text-h5 bg-blue-grey-4 shadow-5"
              >{{_.capitalize(_.lowerCase((MEAL['meal_type_name'])))}}</div>
            </th>
          </tr>
          <tr>
            <th class="bg-blue-grey-3">#</th>
            <th class="bg-blue-grey-3">Name</th>
            <th class="bg-blue-grey-3">Serving Units</th>
            <th class="bg-blue-grey-3">Total Grams</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(obj,key2, index2) in MEAL['foods']" :key="index2">
            <td>{{obj['food'].id}}</td>
            <td>{{obj['food'].hebrew_name}}</td>
            <td>{{obj['food'].serving_size}}</td>
            <td>{{obj.total_gram}}</td>

            <!-- <td>{{field[1]}}</td>
              <td>{{field[2]}}</td>
            <td>{{field[3]}}</td>-->
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <q-page-sticky position="bottom-right" class="width 50 shadow-1" :offset="[10, 118]">
      <q-btn class="bg-green-5" no-caps push color="primary" label="Back" @click="back()"/>
    </q-page-sticky>
    <q-page-sticky position="bottom-right" class="width 50 shadow-10" :offset="[10, 18]">
      <q-btn
        class="bg-red"
        no-caps
        push
        color="primary"
        label="Problems Detector"
        @click="showProbs()"
      >
        <q-badge color="red-14" floating transparent>{{probCount}}</q-badge>
      </q-btn>
    </q-page-sticky>
    <q-page-sticky position="bottom-right" class="width 50 shadow-10" :offset="[10, 68]">
      <q-btn
        class="bg-blue-grey-8"
        no-caps
        push
        color="primary"
        label="Daily Stats"
        @click="showStats()"
      ></q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
import Menu from 'src/store/ORM/menu.js'
import { mapState } from 'vuex'
import {
  myRep,
  sentenceCase,
  doNotify,
  prettyStringJson
} from 'src/utils/stringutils.js'

export default {
  name: 'MenuDetailView',

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
      ],
      problems: []
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
      let menu = Menu.find(this.$route.params.mid)

      return menu
    },
    probCount() {
      console.log('this.problems.length = ', this.Problems.length)
      return this.Problems.length
    },
    Problems() {
      let problems = this.problems
      let index
      let menu = Menu.find(this.$route.params.mid)
      let PROBS = menu['problems']
        .replace('[', '')
        .replace(']', '')
        .replace(/"/g, '')
        .split(',')

      for (index in PROBS) {
        let problem = {
          label: _.capitalize(PROBS[index]),
          icon: 'fas fa-exclamation-circle',
          color: 'red',
          id: index
        }
        problems.push(problem)
      }
      return problems
    }
  },

  methods: {
    back() {
      this.$router.go(-1)
    },
    showProbs(grid) {
      this.$q
        .bottomSheet({
          message: 'Problems Detected',
          grid,
          actions: this.Problems
        })
        .onOk(action => {})
        .onCancel(() => {})
        .onDismiss(() => {})
    },
    showStats(grid) {
      let stats = []
      let index
      let menu = Menu.find(this.$route.params.mid)
      let STATS = menu['stats']
        .replace('[', '')
        .replace(']', '')
        .replace(/"/g, '')
        .split(',')
      for (index in STATS) {
        let stat = {
          label: STATS[index],
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
 

 
