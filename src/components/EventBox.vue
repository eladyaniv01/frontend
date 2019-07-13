<template >
  <div>
    <q-card class="q-pa-md q-ma-md" style=" max-width: 300px;  max-height: 20px; ">
      <q-list>
        <div v-for="field in sortedFields" :key="field">
          <div v-if="field == 'id'">
            <q-btn flat class="eventBtn" to="../../../calendar">
              <q-icon left style="color:grey; font-size: 3.2em;" :name="ICON"/>
              <div class="text-subtitle2 text-capitalize">{{singularize(modelName)}}</div>
              <div class="text-subtitle2 text-capitalize">{{model[field]}}</div>
              <q-tooltip>{{tt}}</q-tooltip>
            </q-btn>
            <q-separator/>
          </div>
          <div v-if="field == 'menus'">
            <div class="text-subtitle2 text-capitalize">{{_.replace(field, /_/gi, ' ')}}</div>
            <div>{{menuCount(model[field], model)}}</div>
            <q-separator/>
          </div>
          <div v-if="field == 'events'">
            <div class="text-subtitle2 text-capitalize">Calendar {{_.replace(field, /_/gi, ' ')}}</div>
            <div>{{eventCount(model[field], model)}}</div>
            <q-separator/>
          </div>
          <div v-if="field == 'private_notes'">
            <div class="text-subtitle2 text-capitalize">{{_.replace(field, /_/gi, ' ')}}</div>
            <div>{{menuCount(model[field], model)}}</div>
            <q-separator/>
          </div>
          <div v-if="field =='created_at'">
            <div class="text-subtitle2 text-capitalize">{{_.replace(field, /_/gi, ' ')}}</div>
            <div>{{ getDate(model[field]) }}</div>
            <q-separator/>
          </div>

          <div class="q-pt-sm" v-if="field == 'client'">
            <div class="text-subtitle2 text-capitalize">
              <div class="text-subtitle2 text-capitalize">
                {{_.replace(field, /_/gi, ' ')}}
                <q-icon onright style="color:grey; font-size: 1.5em;" name="supervisor_account"/>
              </div>
            </div>
            <p class="text-h6">{{clientName(model[field])}}</p>
            <q-separator/>
          </div>
          <div v-if="field == 'nutritionist'">
            <div class="text-subtitle2 text-capitalize">{{_.replace(field, /_/gi, ' ')}}</div>

            <q-icon left style="color:grey; font-size: 1.5em;" name="supervisor_account"/>
            <u>{{nutritionistName(model[field])}}</u>
            <q-separator/>
          </div>

          <div v-if="field == 'meals'">
            <div class="text-subtitle2 text-capitalize">{{_.replace(field, /_/gi, ' ')}}</div>
            <div>{{Object.keys(model[field]).length}}</div>
            <q-separator/>
          </div>
          <div v-if="field == 'title'">
            <div class="title text-weight-bold text-capitalize">{{_.replace(field, /_/gi, ' ')}}</div>
            <div
              class
              style="font-size:18px;"
            >{{ _.replace(_.replace(model[field],'true',"✔"),'false',"✘") }}</div>
            <q-separator/>
          </div>
          <div v-else/>

          <div
            v-if="field != '$id' && field != 'title' && field != 'events' && field != 'private_notes' && field != 'id' && field != 'menus' && field != 'client' && field != 'meals' && field != 'created_at' && field != 'nutritionist'"
          >
            <div>
              <div class="text-subtitle2 text-capitalize">{{_.replace(field, /_/gi, ' ')}}</div>
              <div>{{ _.replace(_.replace(model[field],'true',"✔"),'false',"✘") }}</div>
            </div>
            <q-separator/>
          </div>
        </div>
        <q-separator/>
      </q-list>
    </q-card>
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
import { date } from 'quasar'
export default {
  name: 'Box',
  props: ['model', 'fields', 'modelName', 'ICON'],
  data() {
    return {}
  },
  created() {
    // this.pullImage()
  },
  watch: {
    model() {}
  },
  computed: {
    /* istanbul ignore next */

    sortedFields() {
      let sorted = this.fields.sort()

      var filtered = sorted.filter(function(value, index, arr) {
        return value != 'id'
      })
      var filtered_ex = sorted.filter(function(value, index, arr) {
        return (
          value != 'id' &&
          value != 'client' &&
          value != 'title' &&
          value != 'start' &&
          value != 'end'
        )
      })
      if (this.fields.includes('client')) {
        filtered_ex.unshift('id')
        filtered_ex.unshift('end')
        filtered_ex.unshift('start')
        filtered_ex.unshift('title')
        filtered_ex.unshift('client')

        return filtered_ex
      }
      if (this.fields.includes('client')) {
        filtered_ex.unshift('id')
        filtered_ex.unshift('client')

        return filtered_ex
      }
      filtered.unshift('id')
      return filtered
    },

    ...mapState('UserModules', {
      // model: state => state.currentClient
      // nutritionist: state => state.user.nutritionist,
    }),
    cardStyle() {
      return {
        background: 'red',
        lineHeight: '15pt',
        fontSize: 'small',
        display: 'table'
      }
    },
    bg() {
      let today = Date.now()
      let end = new Date(this.$props.model.end)

      if (end - today < 0) {
        return 'bg-yellow-1'
      }
      return 'bg-green-1'
    },
    st() {
      let today = Date.now()
      let end = new Date(this.$props.model.end)

      if (end - today < 0) {
        return 'text-decoration: line-through;'
      }
      return ''
    },
    tt() {
      let today = Date.now()
      let end = new Date(this.$props.model.end)

      if (end - today < 0) {
        return 'This Event has Ended'
      }
      return 'Click For Details'
    }
  },
  methods: {
    clientId(id) {
      let client = Client.query()
        .where('event', id)
        .get()

      return client.id
    },
    /* istanbul ignore next */
    singularize(name) {
      if (_.endsWith(name, 's') || _.endsWith(name, 'S')) {
        return name.substring(0, name.length - 1)
      }
      return name
    },
    /* istanbul ignore next */
    eventCount(value, model) {
      let id = model.id
      let count = Models.Event.query()
        .where('client', id)
        .get()

      return count.length
    },
    /* istanbul ignore next */
    menuCount(value, model) {
      let id = model.id
      let count = Menu.query()
        .where('client', id)
        .get()

      return count.length
    },
    /* istanbul ignore next */
    clientName(value) {
      let client = Client.find(value)

      return '(' + client.id + ')' + ' ' + client.first_name
    },
    /* istanbul ignore next */
    nutritionistName(value) {
      let nutritionist = Nutritionist.find(value)

      return '(' + nutritionist.id + ')' + ' ' + nutritionist.first_name
    },
    /* istanbul ignore next */
    getPath(id, field) {
      if (field == 'menus' && this.modelName == 'menus') {
        return { name: 'MenuDetail', params: { mid: id } }
      }
      if (field == 'id') {
        return { name: 'ClientDetail', params: { id: id } }
      }

      return { name: 'ClientDetail', params: { id: id } }
    },
    /* istanbul ignore next */
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
/* div {
  background: #e6fce6;
  line-height: 15pt;
  font-size: small;
  display: table;
}
div.title {
  color: #01579b;
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
}
q-item-section {
  line-height: 11pt;
  font-size: small;
}
bg-red {
  background: red;
} */
</style>
