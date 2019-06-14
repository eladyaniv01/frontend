<template>
  <div>
    <div class="row content-stretch justify-center" id="Home">
      <DashboardCard
        head1="Clients"
        :head1count="cliCount"
        head2="Last 7 Days"
        :head2count="newClientCount"
      />
      <DashboardCard
        head1="Menus"
        :head1count="menuCount"
        head2="Last 7 Days"
        :head2count="newMenuCount"
      />
      <DashboardCard
        head1="Meetings"
        head1count="7"
        head2="Last 7 Days"
        :head2count="newEventCount"
      />
      <DashboardCard head1="Sales" head1count="1347.0$" head2="Last 7 Days" head2count="234$"/>
      <DashboardCard head1="Payments" head1count="273$" head2="Last 7 Days" head2count="26.43$"/>
    </div>

    <container class="row" group-name="row" @drop="onDrop">
      <div class="col q-pa-md justify-center" v-for="item in this.charts" :key="item.id">
        <div class="Chart">
          <component class="q-ma-xl" :is="item"></component>
        </div>
      </div>
    </container>
    <div class="row">
      <!-- <q-expansion-item
        expand-separator
        icon="email"
        label="Inbox"
        header-class="bg-secondary text-white"
      >
        <InboxView :msgs="msgs"/>
      </q-expansion-item>-->
    </div>
  </div>
</template>


<script>
var moment = require('moment')
import { Container, Draggable } from 'vue-smooth-dnd'
import applyDrag from 'src/utils/applyDrag.js'
import Models from 'src/store/ORM/models.js'
import Nutritionist from 'src/store/ORM/nutritionists.js'
import DashboardCard from 'src/components/DashboardCard'
import InboxView from 'src/components/InboxView'
import ClientChart from 'src/components/ClientLineChart.js'
import EventChart from 'src/components/EventLineChart.js'
import { mapGetters, mapActions, mapState } from 'vuex'
import { Platform } from 'quasar'

export default {
  name: 'PageIndex',
  data() {
    const vm = this
    vm.$forceUpdate()
    return {
      charts: ['client-chart', 'event-chart'],
      upperDropPlaceholderOptions: {
        className: 'cards-drop-preview',
        animationDuration: '150',
        showOnTop: true
      },
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true
      },
      email: '',
      desktop: this.$q.platform.is.desktop,

      users: [],
      nut: null
    }
  },
  components: {
    DashboardCard,
    ClientChart,
    EventChart,
    Container,
    Draggable,
    InboxView
  },
  computed: {
    newClientCount() {
      // int time interval (days) for a week it will be 7
      let now = moment(new Date())

      let count = 0

      let total = Models.Client.query().get()
      for (let i in total) {
        let ca = moment(Date.parse(total[i].created_at))
        if (now.diff(ca, 'days') <= 7) {
          count += 1
        }
      }
      return count
    },
    newMenuCount() {
      // int time interval (days) for a week it will be 7
      let now = moment(new Date())

      let count = 0

      let total = Models.Menu.query().get()
      for (let i in total) {
        let ca = moment(Date.parse(total[i].created_at))
        if (now.diff(ca, 'days') <= 7) {
          count += 1
        }
      }
      return count
    },
    newEventCount() {
      // int time interval (days) for a week it will be 7
      let now = moment(new Date())

      let count = 0

      let total = Models.Event.query().get()
      for (let i in total) {
        let ca = moment(Date.parse(total[i].start))
        if (now.diff(ca, 'days') <= 7) {
          count += 1
        }
      }
      return count
    },
    cliCount() {
      let clients = Models.Client.query().get()
      return clients.length
    },
    menuCount() {
      let menus = Models.Menu.query().get()
      return menus.length
    },

    ...mapState({
      rightBlocks: state => state['CMS'].rightBlocks,
      leftBlocks: state => state['CMS'].leftBlocks,
      landingHeader: state => state['CMS'].landingHeader,
      landingCards: state => state['CMS'].landingCards
    }),
    /* istanbul ignore next */
    ...mapState([
      'route' // vuex-router-sync
    ]),

    getUser() {
      return this.$store.getters['UserModules/getUser']
    },

    style() {
      if (this.$q.platform.is.desktop) {
        return {
          width: '350px',
          height: '220px',
          // backgroundImage: 'url(../statics/bgimg.jpg)',
          padding: '10px',
          border: '10px solid #fff',
          textAlign: 'center',
          boxShadow: '1px 1px 2px #e6e6e6'
        }
      }
      return {
        width: '250px',
        height: '150px',
        // backgroundImage: 'url(../statics/bgimg.jpg)',
        padding: '1px',
        border: '1px solid #fff',
        textAlign: 'center',
        boxShadow: '1px 1px 2px #e6e6e6'
      }
    },
    cardImgStyle() {
      if (this.$q.platform.is.desktop) {
        return {
          width: '300px',
          height: '200px'
        }
      }
      return {
        width: '220px',
        height: '150px'
      }
    },

    botstyle() {
      return {
        width: '250px',
        height: '220px',
        // backgroundImage: 'url(../statics/bgimg.jpg)',
        padding: '10px',
        border: '10px solid #fff',
        textAlign: 'center',
        boxShadow: '1px 1px 2px #e6e6e6'
      }
    },
    msgs() {
      let msgs = Models.InternalMessage.query().get()

      return msgs
    }
  },
  methods: {
    onDrop(dropResult) {
      this.charts = applyDrag(this.charts, dropResult)
    },
    getBody(payload) {
      let body = payload.replace(
        '<table class="table table-bordered">',
        '<div class="q-markup-table q-table__container bg-blue-grey-2 shadow-5 q-table--cell-separator q-table--bordered q-table--no-wrap"><table class="q-table">'
      )
      body = body.replace('/table>', '/table></div>')
      return body
    }
  },
  created() {
    this.$axios
      .get('api/cms/bundle')
      .then(result => {
        this.$store.dispatch(
          'CMS/UpdateRightBlocks',
          result.data.data.right_blocks
        )
        this.$store.dispatch(
          'CMS/UpdateSupplierCms',
          result.data.data.supplierscms
        )
        console.log(result.data.data.supplierscms)
        this.$store.dispatch(
          'CMS/UpdateLeftBlocks',
          result.data.data.left_blocks
        )
        this.$store.dispatch(
          'CMS/UpdateLandingHeader',
          result.data.data.main_page_heading[0].title
        )
        this.$store.dispatch(
          'CMS/UpdateLandingCards',
          result.data.data.main_card
        )
        this.$store.dispatch(
          'CMS/UpdateStickyHeader',
          result.data.data.header_sticky[0].title
        )
      })
      .catch(err => {})
    // this.$axios
    //   .get('api/cms/frontleft')
    //   .then(result => {
    //     this.$store.dispatch('CMS/UpdateLeftBlocks', result.data)
    //   })
    //   .catch(err => {})
    // this.$axios
    //   .get('api/cms/landingheader')
    //   .then(result => {
    //     this.landingHeader = result.data.results[0].title
    //   })
    //   .catch(err => {})
    // this.$axios
    //   .get('api/cms/landingcard')
    //   .then(result => {
    //     this.landingCards = result.data.results
    //   })
    //   .catch(err => {})
    // // console.log(Nutritionist.query().get())
    // // console.log(Nutritionist.find(103))
    this.nut = Nutritionist.query().get()
  }
}

// msg() {
//   return this.$store.state['userState'].msg
// },
// user() {
//   return this.$store.state['userState'].user
// }
</script>
<style lang="stylus" scoped>
.Chart {
  background: #FBFBFC;
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  margin: 25px 0;
}

.chartjs-render-monitor {
}

.Chart h2 {
  margin-top: 0;
  padding: 15px 0;
  color: rgba(255, 0, 0, 0.5);
  border-bottom: 1px solid #323d54;
}
</style>