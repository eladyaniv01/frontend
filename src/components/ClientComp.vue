<template>
  <div>
    <q-markup-table>
      <thead>
        <th
          v-for="field in sortedFields"
          :key="field"
        >{{_.capitalize(_.replace(field, /_/gi, ' '))}}</th>
      </thead>
      <tbody>
        <td v-for="field in sortedFields" :key="field">
          <div v-if="field == 'weight_height_sets'">
            <!-- {{getWeightHeightSetsArray(model)}} -->
            <ul v-for="(set) in getWeightHeightSetsArray" :key="set.id">
              <!-- {{set}} -->
              <li class="text-bold text-purple">Date: {{ getDate(set.time_stamp) }}</li>
              <li class="text-bold text-purple">Client: {{ set.client }}</li>
              <li class="text-bold text-purple-10">Height: {{ set.height }}</li>
              <li class="text-bold text-purple-10">Weight: {{ set.weight }}</li>
              <q-separator />
            </ul>
          </div>
          <div v-else-if="field == 'bmi'">
            <p :class="bmi(model[field])">{{model[field]}}</p>
          </div>
          <div v-else>{{model[field]}}</div>
        </td>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
import _ from 'lodash'
import Client from 'src/store/ORM/client.js'
import Menu from 'src/store/ORM/menu.js'
import Nutritionist from 'src/store/ORM/nutritionists.js'
import Models from 'src/store/ORM/models.js'
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import {
  myRep,
  sentenceCase,
  doNotify,
  prettyStringJson,
  GetFormattedDate
} from 'src/utils/stringutils.js'
export default {
  name: 'Box',
  props: ['model', 'fields', 'modelName', 'ICON'],
  data() {
    return {}
  },
  created() {
    // this.pullImage()
  },
  watch: {},
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
    singularize(name) {
      if (_.endsWith(name, 's') || _.endsWith(name, 'S')) {
        return name.substring(0, name.length - 1)
      }
      return name
    },
    eventCount(model) {
      let id = model.id
      let count = Models.Event.query()
        .where('client', id)
        .get()

      return count.length
    },
    menuCount(model) {
      let id = model.id
      let count = Menu.query()
        .where('client', id)
        .get()

      return count.length
    },
    noteCount(model) {
      let id = model.id
      let count = Models.PrivateNote.query()
        .where('client', id)
        .get()

      return count.length
    },
    clientName(value) {
      let client = Client.find(value)

      return '(' + client.id + ')' + ' ' + client.first_name
    },
    nutritionistName(value) {
      let nutritionist = Nutritionist.find(value)

      return '(' + nutritionist.id + ')' + ' ' + nutritionist.first_name
    },

    getPath(id, field) {
      if (field == 'menus' && this.modelName == 'menus') {
        return { name: 'MenuDetail', params: { mid: id } }
      }

      return { name: 'ClientDetail', params: { id: id } }
    },
    getDate(string) {
      return GetFormattedDate(string)
    }
    // async pullImage() {
    //   const response = await fetch(
    //     `http://api.duckduckgo.com/?q=${encodeURIComponent(
    //       this.model.name
    //     )}&format=json&pretty=1`
    //   )
    //   const json = await response.json()
    //   if (json.Image) {
    //     this.image = json.Image
    //   }
    // }
  },
  computed: {
    getWeightHeightSetsArray() {
      let id = this.model.id
      console.log('this.model.id = ', this.model.id)
      let sets = Models.WeightHeightSet.query()
        .where('client', id)
        .get()
      console.log('SETS', sets)
      return sets
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

    ...mapState('UserModules', {
      // model: state => state.currentClient
      // nutritionist: state => state.user.nutritionist,
    })
  }
}
</script>
<style scoped>
div {
  /* $amber-1 */
  line-height: 15pt;
  font-size: small;
  display: table;
  color: rgba(28, 43, 56, 0.62);
}
eventBtn {
  background: red;
}
q-item {
  line-height: 11pt;
  font-size: small;
}
q-card {
  line-height: 11pt;
  font-size: small;
  color: rgba(28, 43, 56, 0.62);
}
q-item-section {
  line-height: 11pt;
  font-size: small;
}
</style>
