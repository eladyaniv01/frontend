    <template>
  <div id="DashboardCard" class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card shadow-5 flex justify-center" style="width: 200%;background:#FBFBFC;">
      <q-card-section class="bg-green-1">
        <p class="text-green bg-green-1">{{head1}}</p>

        <font class size="3px">{{head1count}}</font>
      </q-card-section>
      <q-card-section class>
        <p style="color:rgba(28, 43, 56, 0.62);">{{head2}}</p>

        <q-icon
          v-if="head2count>0"
          class="q-pb-md"
          size="20px"
          right
          color="green"
          name="fas fa-arrow-up"
        ></q-icon>
        <q-icon v-else class="q-pb-md" size="20px" right color="grey" name="fas fa-window-minimize"></q-icon>
        <font size="5px">{{head2count}}</font>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import Models from 'src/store/ORM/models.js'
import Nutritionist from 'src/store/ORM/nutritionists.js'

import { mapGetters, mapActions, mapState } from 'vuex'
import { Platform } from 'quasar'

export default {
  name: 'DashboardCard',
  props: ['head1', 'head1count', 'head2', 'head2count'],
  data() {
    const vm = this
    vm.$forceUpdate()
    return {
      email: '',
      desktop: this.$q.platform.is.desktop,

      users: [],
      nut: null
    }
  },
  components: {},

  computed: {
    cliCount() {
      let clients = Models.Client.query().get()
      return clients.length
    },
    ...mapState({
      rightBlocks: state => state['CMS'].rightBlocks,
      leftBlocks: state => state['CMS'].leftBlocks,
      landingHeader: state => state['CMS'].landingHeader,
      landingCards: state => state['CMS'].landingCards
    }),
    /* istanbul ignore next */

    getUser() {
      return this.$store.getters['UserModules/getUser']
    }
  },
  methods: {}
}
</script>
<style lang="stylus" scoped>
.my-card {
  width: 100%;
}
</style>