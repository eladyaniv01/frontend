<template>
  <div id="ModelRenderer">
    <q-markup-table class :separator="separator">
      <thead>
        <tr>
          <th class="center"></th>
        </tr>
      </thead>
      <tbody v-for="(field,key, index) in slicedModel(mapFields())" :key="index" bordered>
        <tr v-if="typeof field !== null">
          <td v-if="(getField(fields[index])) != '-1' && (getField(fields[index])) != 'FFG'">
            <div v-if="!is_updating">
              <q-field rounded :label="getField(fields[index])" stack-label items-aligned>
                <q-tooltip
                  :delay="500"
                  :anchor="getToolTipAnchor()"
                  :content-class="getToolTipColor() +' '+ getToolTipBG()"
                  outlined
                >
                  <font class="text-h5">{{getField(fields[index])}}</font>
                </q-tooltip>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    <div v-if="getField(fields[index]) === 'Created_at'">
                      <font class="absolute-center">{{getDate(model[fields[index]])}}</font>
                    </div>
                    <div v-else>
                      <font class="absolute-center">{{model[fields[index]]}}</font>

                      <q-icon right style="font-size: 32px;" :name="getIcon((fields[index]))"/>
                    </div>
                  </div>
                </template>
              </q-field>
            </div>
            <div v-else>
              <!--  -->
              <q-input
                :rules="[val => !!val || 'Field is required']"
                v-model="model[fields[index]]"
                class="standout"
                color="update-field-default"
                bg-color="update-field-default"
                rounded
                outlined
                :label="getField(fields[index])"
                stack-label
              >
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    <q-icon right style="font-size: 32px;" :name="getIcon((model[fields[index]]))"/>
                  </div>
                </template>
              </q-input>
              {{model.field}}
              <q-tooltip
                :anchor="getToolTipAnchor()"
                :content-class="getToolTipColor() +' '+ getToolTipBG()"
              >
                <font class="text-h5">{{getField(fields[index])}}</font>
              </q-tooltip>
            </div>
          </td>
        </tr>
      </tbody>
      <q-toolbar v-if="is_updating" class="bg-grey-5 text-white shadow-2">
        <br>

        <q-toolbar-title>
          <q-btn class="absolute-center" color="primary" @click="submitIt()" v-close-popup>Save</q-btn>
        </q-toolbar-title>
      </q-toolbar>
    </q-markup-table>
    <q-markup-table class="bg-blue-grey-5" :separator="separator" flat>
      <thead></thead>
      <!-- <p>{{slicedModel(mapFields())}}</p> -->
      <tbody v-for="(field,key, index) in slicedModel(mapFields())['fields']" :key="index" bordered>
        <tr>
          <!-- m2m/o2m field -->

          <td v-if="typeof field !== null && typeof model[field] === 'object' && !is_updating">
            <q-field
              color="field-o2m-default"
              bg-color="field-o2m-default"
              rounded
              outlined
              :label="getM2MField(field)"
              stack-label
            >
              <q-tooltip
                :anchor="getToolTipAnchor()"
                :content-class="getToolTipColor() +' '+ getToolTipBG()"
              >
                <font class="text-h5">{{getM2MField(field)}}</font>
              </q-tooltip>

              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">
                  <font class="absolute-center">Total - {{model[field].length}}</font>
                </div>
              </template>
            </q-field>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import {
  myRep,
  sentenceCase,
  doNotify,
  prettyStringJson,
  GetFormattedDate
} from 'src/utils/stringutils.js'
import IconMappers from 'src/pages/Views/IconMapper'
export default {
  name: 'ModelRenderer',
  // @vuese
  data() {
    return {
      data: '',
      separator: 'vertical',
      selected: 'Clients',
      ticked: [],
      tickStrategy: 'none',
      tickStrategies: [
        { value: 'none', label: 'None' },
        { value: 'strict', label: 'Strict' },
        { value: 'leaf', label: 'Leaf' },
        { value: 'leaf-filtered', label: 'Leaf Filtered' }
      ]
    }
  },
  // @vuese
  props: {
    model: {
      type: Object,
      required: true
    },
    is_updating: {
      type: Boolean,
      reuqired: true
    },
    successPath: {
      type: String,
      required: false
    },
    APIURL: {
      type: String,
      required: false
    }
  },
  // @vuese
  validations: {
    model: {
      email: { required, email }
    }
  },
  // computed
  computed: {
    /**
     * @vuese
     * Construct a Tree
     * @arg The label
     */
    constructTree(label) {
      let arr = []
      let children = []
      let m = this.model
      // console.log('M', m)
      Object.keys(m).forEach(function eachKey(key) {
        if (m[key]) {
          // detect m2m
          if (_.hasIn(IconMappers, `fields_m2m.${key}`)) {
            for (let ikey in m[key]) {
              children.push({
                label:
                  `[${m[key][ikey].id}]` +
                  ' ' +
                  [m[key][ikey].first_name] +
                  ' ' +
                  [m[key][ikey].last_name],
                to: '/home',
                icon: 'fas fa-credit-card'
              })
            }
            arr.push({ label: label, children: children })
          }
        }
      })

      return arr
    },
    // @vuese
    fields() {
      let f = Object.keys(this.model)

      if (this.is_updating === true) {
        delete f[_.indexOf(f, 'id')]
        delete f[_.indexOf(f, 'owner')]
        delete f[_.indexOf(f, 'clients')]
        delete f[_.indexOf(f, 'created_at')]
      }
      // console.log('FIELDS =', f)
      return f
    }
  },

  methods: {
    /**
     * @vuese
     * In case an UpdateForm was passed
     *
     */
    submitIt() {
      this.$emit('hide')
      this.$q.loading.show({
        delay: 200, // ms
        message: 'Processing ...'
      })

      this.$axios
        .put(`${this.APIURL}`, this.model)
        .then(result => {
          this.$q.notify({
            classes: 'text-bold text-h6',
            message: 'Success!',
            position: 'top-right',
            icon: 'fas fa-thumbs-up',
            closeBtn: true,
            color: 'blue'
          })

          this.$q.loading.hide()
          this.$router.push(`${this.successPath}`)
        })
        .catch(err => {})
    },

    /**
     * @vuese
     * field getter
     *
     */
    mapFields() {
      return this.fields
    },
    /**
     * @vuese
     * will remap the model with given `fields` param
     * @arg `fields` ( Computed )
     */
    slicedModel(fields) {
      let sl = Object.assign({ fields }, this.model)

      return sl
    },
    // @vuese
    openGroupModal($event) {
      // console.log($event.toElement.innerText[0])
      // console.log($event)
      // console.log(typeof QPopupProxy)
      // console.log(Object.keys(QPopupProxy))
      this.$q.dialog({
        title: $event.toElement.innerText,
        message: 'TBD MSG'
        // position: 'bottom'
      })
      // other codes for showing modal and etc...
    },
    // @vuese
    getIcon(name) {
      return IconMappers.icons[_.snakeCase(name)]
    },
    // @vuese
    getField(name) {
      return _.capitalize(IconMappers.fields[_.snakeCase(name)]) || '-1'
    },
    // @vuese
    getM2MField(name) {
      return _.capitalize(IconMappers.fields_m2m[_.snakeCase(name)])
    },
    // @vuese
    getToolTipColor() {
      return IconMappers.tooltip.color
    },
    // @vuese
    getToolTipBG() {
      return IconMappers.tooltip['background-color']
    },
    // @vuese
    getToolTipAnchor() {
      return IconMappers.tooltip.anchor
    },
    // @vuese
    getDate(string) {
      return GetFormattedDate(string)
    },
    // @vuese
    logIt(input) {
      console.log(input)
    }
  }
}
</script>

<style>
</style>