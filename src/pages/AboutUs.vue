<template>
  <div id="Home">
    <div class="flex justify-center" id="Header">
      <center>
        <p class="text-h4">Hello {{getUser|title}}</p>
        <p v-if="this.landingHeader" class="text-center" v-html="this.landingHeader"/>
        <!-- <p>{{this.nut}}</p> -->
      </center>
      <div class></div>
    </div>
    <q-separator spaced/>

    <div class="flex justify-center">
      <div :style="style" v-for="(card, Cindex)  in this.landingCards" :key="Cindex">
        <img :style="style" :src="card.img_url"></img><br/>
        <p :style="cardStyle" class="flex items-center" v-html="card.heading.title"/>
        <div :style="cardStyle" class="ellipsis" v-html="card.body.content"/>
        <!-- <h6>{{card}}</h6> -->
      </div>
      
    </div>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>




    <q-separator spaced/>

    <div v-if="this.desktop" class="row flex wrap items-start">
      <div class="col-1 bg-blue-grey-5"></div>
      <div class="col-5 bg-blue-grey-2 shadow-5">
        <p class="text-h2 text-bold text-center bg-secondary"></p>
        <div v-for="(block, bindex)  in this.leftBlocks" :key="bindex">
          <div v-for="(item,value, iindex) in block" :key="iindex">
            <div v-if="value == 'left_block_heading'">
              <p v-html="block[value].title" class="bg-secondary"></p>
            </div>
            <div v-if="value == 'left_block_body'">
              <p v-html="getBody(block[value].content)" class="text-justify"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1"></div>
      <div class="col-5">
        <p class="text-h2 text-bold text-center"></p>
        <div v-for="(block, bindex)  in this.rightBlocks" :key="bindex">
          <div v-for="(item,value,iindex) in block" :key="iindex">
            <!-- {{value}} -->
            <div v-if="value == 'right_block_heading'">
              <p v-html="block[value].title"></p>
            </div>
            <div v-if="value == 'right_block_body'">
              <!-- {{value.body.replace("table class\=\"table table-bordered\"", "q-table")}} -->
              <p v-html="getBody(block[value].content)"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row inline q-pa-sm justify-start">
      <div class="col-sm bg-blue-grey-2 shadow-5">
        <p class="text-h2 text-bold bg-secondary"></p>
        <div v-for="(block, bindex)  in this.leftBlocks" :key="bindex">
          <div v-for="(item,value, iindex) in block" :key="iindex">
            <div v-if="value == 'left_block_heading'">
              <p v-html="block[value].title" class="bg-secondary"></p>
            </div>
            <div v-if="value == 'left_block_body'">
              <p v-html="getBody(block[value].content)" class="text-justify"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="row inline q-pa-sm justify-start">
        <div class="col-sm wrap">
          <p class="text-h2 text-bold text-center wrap"></p>
          <div v-for="(block, bindex)  in this.rightBlocks" :key="bindex">
            <div v-for="(item,value,iindex) in block" :key="iindex">
              <!-- {{value}} -->
              <div v-if="value == 'right_block_heading'">
                <p v-html="block[value].title"></p>
              </div>
              <div v-if="value == 'right_block_body'">
                <!-- {{value.body.replace("table class\=\"table table-bordered\"", "q-table")}} -->
                <p v-html="getBody(block[value].content)"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import Models from 'src/store/ORM/models.js'
import Nutritionist from 'src/store/ORM/nutritionists.js'
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
  components: {},
  computed: {
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
          boxShadow: '1px 1px 2px #ffffff'
        }
      }
      return {
        width: '250px',
        height: '150px',
        // backgroundImage: 'url(../statics/bgimg.jpg)',
        padding: '1px',
        border: '1px solid #fff',
        textAlign: 'center',
        boxShadow: '1px 1px 2px #ffffff'
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
    cardStyle() {
      return 'background-color: rgba(238, 230, 230,0.5)'
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

// <q-flashcard-section transition="nudge-in">
//   <img :src="card.img_url" :style="cardImgStyle">
// </q-flashcard-section>
// <q-flashcard-section transition="fade-in" class="fit">
//   <div class="fit" style="background-color: rgba(64, 231, 231, 0.1);"/>
//   <q-flashcard-section transition="slide-down" class="q-px-xl fit flex items-start">
//     <p :style="cardStyle" class="flex items-center" v-html="card.heading.title"/>
//   </q-flashcard-section>
//   <q-flashcard-section transition="nudge-in" class="q-px-xl fit flex items-end">
//     <div :style="cardStyle" class="ellipsis" v-html="card.body.content"/>
//   </q-flashcard-section>
//   <q-flashcard-section transition="fade-in" class="q-px-xl fit flex items-end">
//     <!-- <a href="#" class="my-button">Learn More</a> -->
//   </q-flashcard-section>
// </q-flashcard-section>
</script>
<style lang="stylus" scoped>
.q-flashcard {
}
</style>