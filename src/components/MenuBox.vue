<template>
  <q-card style="width: 100%; max-width: 300px; height: 100%; max-height: 20px;">
    <q-list>
      <div v-for="field in fields" :key="field">
        <div class="q-pb-sm" v-if="field == 'id'">
          <div class="doc-card-title shadow-1 bg-green-1" style="margin-left: -20px">
            <q-btn flat class="bg-green-1" :to="getPath(model[field],modelName)">
              <q-icon left style="color:grey; font-size: 3.2em;" :name="ICON"/>
              <div class="text-h6 bg-green-1">{{singularize(modelName)}}</div>
              <div class="text-subtitle2 bg-green-1">{{model[field]}}</div>
              <q-tooltip>Click For Details</q-tooltip>
            </q-btn>
          </div>
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

        <div class="q-pb-sm" v-if="field == 'client'">
          <div class="doc-card-title shadow-1 bg-green-1">
            <div class="text-subtitle2 text-capitalize bg-green-1">
              {{_.replace(field, /_/gi, ' ')}}
              <q-icon left style="color:grey; font-size: 1.5em;" name="supervisor_account"/>
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

        <div v-else/>

        <div
          v-if="field != '$id' && field != 'events' && field != 'private_notes' && field != 'id' && field != 'menus' && field != 'client' && field != 'meals' && field != 'created_at' && field != 'nutritionist'"
        >
          <div>
            <div class="text-subtitle2 text-capitalize">{{_.replace(field, /_/gi, ' ')}}</div>
            <div>{{ _.replace(_.replace(model[field],'true',"✔"),'false',"✘") }}</div>
            <q-separator/>
          </div>
        </div>
      </div>
      <q-separator/>
    </q-list>
  </q-card>
</template>
<script>
import Client from 'src/store/ORM/client.js'
import Menu from 'src/store/ORM/menu.js'
import Nutritionist from 'src/store/ORM/nutritionists.js'
import Models from 'src/store/ORM/models.js'
import lodash from 'lodash'
import _ from 'lodash'
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

  computed: {
    /* istanbul ignore next */
    sortedFields() {
      let sorted = this.fields.sort()

      var filtered = sorted.filter(function(value, index, arr) {
        return value != 'id'
      })
      var filtered_ex = sorted.filter(function(value, index, arr) {
        return value != 'id' && value != 'client'
      })
      if (this.fields.includes('client')) {
        filtered_ex.unshift('id')
        filtered_ex.unshift('client')

        return filtered_ex
      }
      filtered.unshift('id')
      return filtered
    },

    /* istanbul ignore next */
    ...mapState('UserModules', {
      // model: state => state.currentClient
      // nutritionist: state => state.user.nutritionist,
    })
  },

  methods: {
    /* istanbul ignore next */
    clientId(id) {
      let client = Client.query()
        .where('menu', id)
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
  background: #ffcc80;
  line-height: 15pt;
  font-size: small;
  display: table;
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
} */
</style>
