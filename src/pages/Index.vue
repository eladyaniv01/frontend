<template>
  <div>
    <div class="row content-stretch justify-center" id="Home">
      <DashboardCard head1="Clients" :head1count="cliCount" head2count="2"/>
      <DashboardCard head1="Meetings" head1count="7" head2count="3"/>
      <DashboardCard head1="Sales" head1count="1347.0$" head2count="234$"/>
      <DashboardCard head1="Payments" head1count="273$" head2count="26.43$"/>
      <DashboardCard head1="Revenue" head1count="12.3%" head2count="1.2%"/>
    </div>
    <div class="row justify-center">
      <div class="Chart">
        <line-example></line-example>
      </div>
    </div>
  </div>
</template>


<script>
import Models from 'src/store/ORM/models.js'
import Nutritionist from 'src/store/ORM/nutritionists.js'
import DashboardCard from 'src/components/DashboardCard'
import LineExample from 'src/components/LineChart.js'
import { mapGetters, mapActions, mapState } from 'vuex'
import { Platform } from 'quasar'

export default {
  name: 'PageIndex',
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
  components: { DashboardCard, LineExample },
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
    }
  },
  methods: {
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
.my-card {
  width: 100%;
  max-width: 250px;
}

.Chart {
  background: #FBFBFC;
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  margin: 25px 0;
  width: 80%;
}

.chartjs-render-monitor {
  width: 80%;
}

.Chart h2 {
  margin-top: 0;
  padding: 15px 0;
  color: rgba(255, 0, 0, 0.5);
  border-bottom: 1px solid #323d54;
}
</style>