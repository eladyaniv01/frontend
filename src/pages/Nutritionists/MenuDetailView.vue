<template>
  <div class="MenuDetailView">
    <!-- <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div> -->
    <q-option-group
      v-model="separator"
      inline
      class="q-mb-md"
      :options="[
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
        { label: 'Cell', value: 'cell' },
        { label: 'None', value: 'none' },
      ]"
    />
    <div
      v-for="(MEAL,key, index) in (menu.meals)"
      :key="index"
      class="row inline content-stretch q-pa-sm"
    >
      <q-table
        :id="_.capitalize(_.lowerCase((MEAL.meal_type_name)))"
        class="bg-blue-grey-2 shadow-5"
        flat
        dense
        bordered
        :title="_.capitalize(_.lowerCase((MEAL.meal_type_name)))"
        :data="getData(MEAL.foods)"
        :columns="columns(MEAL)"
        row-key="id"
        :separator="separator"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        :selected.sync="selected"
      />
      <p></p>
    </div>
    <!-- {{menu}} -->
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
  prettyStringJson,
  getUnique
} from 'src/utils/stringutils.js'

export default {
  name: 'MenuDetailView',

  data() {
    return {
      separator: 'vertical',
      selected: [],
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
      // console.log('this.problems.length = ', this.Problems.length)
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
    getSelectedString() {
      let len = 0
      for (let i in this.menu.meals) {
        len += this.menu.meals[i].foods.length
      }
      console.log(len)
      let stri =
        this.selected.length === 0
          ? ''
          : `${this.selected.length} record${
              this.selected.length > 1 ? 's' : ''
            } selected of ${len}`

      console.log(stri)
      return stri
    },
    getData(inputFoods) {
      let outputFoods = []

      for (let i in inputFoods) {
        let flattenFood = {}
        let inner = inputFoods[i]
        for (let j in inner) {
          if (typeof inner[j] !== 'object' && j !== '__index') {
            flattenFood[j] = inner[j]
          }
          if (typeof inner[j] === 'object') {
            let food = inner[j]
            for (let k in food) {
              flattenFood[k] = food[k]
            }
          }
        }
        outputFoods.push(flattenFood)
      }
      // console.log(inputFoods)
      // console.log(outputFoods)
      return outputFoods
    },
    columns(payload) {
      let MEAL = payload
      // console.log(MEAL)
      let cols = []

      // console.log(MEAL)
      for (let index in MEAL.foods) {
        let keys = Object.keys(MEAL.foods[index])
        for (let i in keys) {
          let col = {}
          // console.log(keys[i])
          // console.log(keys[i])
          if (keys[i] !== '__index' && keys[i] !== 'food') {
            col.name = keys[i]
            col.label = _.capitalize(_.lowerCase(keys[i]))
            col.field = keys[i]

            col.sortable = true
            cols.push(col)
          }

          if (keys[i] === 'food') {
            let food = Object.keys(MEAL.foods[index].food)

            for (let j in food) {
              let col2 = {}
              col2.name = food[j]
              col2.label = _.capitalize(_.lowerCase(food[j]))
              col2.field = food[j]

              col2.sortable = true
              cols.push(col2)
              // console.log(food[j])
            }
          }
        }
        // col.name = MEAL.foods[index].hebrew_name
        // col.required = true
        // col.
      }
      // console.log(cols)

      let final = getUnique(cols, 'name')
      var filtered = final.filter(function(el) {
        return el != 'undefined'
      })

      return filtered
    },
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
<style scoped lang="stylus">
.sticky-header-table {
  /* max height is important */
  .q-table__middle {
    max-height: 200px;
  }

  .q-table__top, .q-table__bottom, thead tr:first-child th {
    background-color: #c1f4cd;
  }

  thead tr:first-child th {
    position: sticky;
    top: 0;
    opacity: 1;
    z-index: 1;
  }
}
</style>
 
