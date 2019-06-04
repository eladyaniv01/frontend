<template>
  <q-layout view="hHr LpR lFf">
    <!-- Header -->

    <q-header elevated class="bg-header shadow-7" style="-webkit-app-region: drag">
      <q-toolbar class>
        <div v-if="loggedin">
          <q-btn @click="showLeft = !showLeft" icon="menu"/>

          <transition :enter-active-class="enterClass" :leave-active-class="enterClass">
            <q-btn v-if="showLeft" flat round @click="drawerActive()" icon="fas fa-lock-open"/>
            <!-- @mouseover="showLeft = !showLeft" -->
          </transition>
          <q-drawer v-model="showLeft" bordered content-class="bg-grey-8 shadow-2 text-white ">
            <!--      :mini="miniState"
      @mouseover="miniState = false"
            @mouseout="miniState = true"-->
            <!-- drawer content -->
            <q-scroll-area class="fit">
              <q-list v-for="(menuItem, index) in menuList" :key="index">
                <q-item :to="menuItem.to" clickable :active="menuItem.label === 'Outbox'" v-ripple>
                  <q-item-section avatar>
                    <q-icon :name="menuItem.icon"/>
                  </q-item-section>
                  <q-item-section>{{ menuItem.label }}</q-item-section>
                </q-item>

                <q-separator v-if="menuItem.separator"/>
              </q-list>
              <q-list>
                <q-item v-model="user" clickable @click="logItOut()">
                  <q-item-section avatar>
                    <q-icon name="fas fa-sign-out-alt"/>
                  </q-item-section>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-drawer>
        </div>

        <q-toolbar-title class="col-xs-12 col-sm-12 col-md-8" v-if="loggedin">
          <font class="q-pa-sm text-capitalize" size="xs">
            Logged in as
            <b>{{user.username|title}}</b>
          </font>

          <q-avatar>
            <img class="red" src="/statics/lotus.png">
          </q-avatar>NutHub
          <q-btn v-if="loggedin" glossy dense icon="mail">
            <q-badge color="green" floating>{{devnum}}</q-badge>
          </q-btn>
          <q-btn v-if="loggedin" glossy dense icon="alarm">
            <q-badge color="red" floating>{{devnum2}}</q-badge>
          </q-btn>
          <q-separator vertical/>
          <q-btn v-if="this.stickyHeader" v-html="this.stickyHeader"/>
          <q-separator vertical/>
        </q-toolbar-title>

        <div id="BaseHeader" class="col-auto">
          <!-- Second row of header is a QTabs -->
          <div v-if="loggedin">
            <q-tabs>
              <q-separator vertical/>

              <q-route-tab icon="home" to="/home" label="Home"/>
              <q-route-tab icon="calendar" to="/calendar" label="Calendar"/>
              <q-separator vertical/>
              <q-btn-dropdown color="bg-header" label="Account" align="right">
                <q-list link>
                  <q-item clickable v-close-popup to="/nutritionist/profile">
                    <q-item-section avatar>
                      <q-avatar icon="fas fa-id-card-alt" color="primary" text-color="white"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Account Settings</q-item-label>
                      <q-item-label caption>February 22, 2016</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon name="info" color="amber"/>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup to="/nutritionist/clients">
                    <q-item-section avatar>
                      <q-avatar icon="far fa-handshake" color="primary" text-color="white"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Your Clients</q-item-label>
                      <q-item-label caption>February 22, 2016</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon name="info" color="amber"/>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup to="/nutritionist/clients/add">
                    <q-item-section avatar>
                      <q-avatar icon="folder" color="primary" text-color="white"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Add a new Client</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon name="info" color="amber"/>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced/>
                  <q-item-label header>Personal</q-item-label>
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar icon="airport_shuttle" color="primary" text-color="white"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Vacation</q-item-label>
                      <q-item-label caption>February 22, 2016</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon name="info" color="amber"/>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-tabs>
          </div>
          <div v-else>
            <q-tabs align="right">
              <q-route-tab to="/login" label="Login"/>
            </q-tabs>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="right" side="right" overlay bordered> -->
    <!-- drawer content -->
    <!-- </q-drawer> -->

    <q-page-container>
      <transition name="bounce" mode="out-in">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-11 justify-center">
            <router-view/>
          </div>
        </div>
      </transition>
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="primary"/>
      </q-page-scroller>
    </q-page-container>

    <q-footer elevated bordered class="bg-secondary text-h5" style=" height:3%">
      <div class="row flex justify-around">
        <div
          class="col flex justify-between text-black text-right text-caption text-bold"
        >© Copyright NutHub Corp. 2019</div>
        <div class="col flex justify-end text-black text-left text-overline">
          <q-icon size="25px" color="primary" class="q-pa-md" name="fas fa-envelope"/>
          <q-icon size="25px" color="primary" class="q-pa-md" name="ion-logo-facebook"/>
          <q-icon size="25px" color="primary" class="q-pa-md" name="ion-logo-twitter"/>
          <q-icon size="25px" color="primary" class="q-pa-md" name="ion-logo-linkedin"/>
          <q-icon size="25px" color="primary" class="q-pa-md" name="ion-logo-pinterest"/>
          <q-icon size="25px" color="primary" class="q-pa-md" name="ion-logo-instagram"/>
        </div>
      </div>
    </q-footer>
    <div v-if="loggedin && this.$q.platform.is.desktop">
      <q-page-sticky
        v-if="this.$route.path != '/nutritionist/clients/add'"
        position="top-right"
        class="col-xs-12 col-sm-6 col-md-4"
        :offset="[7, 10]"
      >
        <div class="text-subtitle2" align="center">
          <q-btn
            rounded
            glossy
            class="shadow-4 text-black"
            color="secondary"
            @click="clientAdd()"
            label="+"
          />
        </div>
      </q-page-sticky>
    </div>
  </q-layout>
</template>

<script>
const menuList = [
  {
    icon: 'account_box',
    label: 'Account Settings',
    separator: true,
    to: '/nutritionist/profile'
  },
  // {
  //   icon: 'update',
  //   label: 'Update Account information',
  //   separator: true,
  //   to: '/nutritionist/profile/update'
  // },
  {
    icon: 'supervisor_account',
    label: 'Client List',
    separator: true,
    to: '/nutritionist/clients'
  },
  {
    icon: 'person_add',
    label: 'Add a Client',
    separator: true,
    to: '/nutritionist/clients/add'
  },
  {
    icon: 'mdi-food',
    label: 'Menus',
    separator: true,
    to: '/nutritionist/menus'
  },
  {
    icon: 'attach_money',
    label: 'Sales',
    separator: true,
    to: '/sales'
  },

  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: true
  }
]
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import { openURL, Platform } from 'quasar'
import LeftSideDrawer from './LeftSideDrawer'
import RightSideDrawer from './RightSideDrawer'
import {
  myRep,
  sentenceCase,
  doNotify,
  prettyStringJson
} from 'src/utils/stringutils.js'

export default {
  name: 'BaseLayout',

  props: {},
  created() {
    if (Platform.is.mobile) {
      console.log('MOBILE')
    }
    if (Platform.is) {
      console.log('platform is : ', Platform.is)
    }
  },

  data() {
    return {
      transitionName: 'bounce',
      leftDrawerOpen: this.$q.platform.is.desktop,
      company_name: '<span style="color:red">NutritionistHub</span>',
      showLeft: false,
      showRight: false,
      active: false,
      enter: 'flip',
      leave: 'rotate',
      // stickyHeader,
      menuList
    }
  },
  computed: {
    enterClass() {
      return `animated ${this.enter}`
    },
    leaveClass() {
      return `animated ${this.leave}`
    },
    ...mapState({
      user: state => state['UserModules'].user,
      msg: state => state['UserModules'].msg,
      loggedin: state => state['UserModules'].loggedin,
      // cms
      stickyHeader: state => state['CMS'].stickyHeader
    }),
    devnum: function() {
      var min = 1
      var max = 5
      var random = Math.floor(Math.random() * (+max - +min)) + +min
      return random
    },
    devnum2: function() {
      var min = 1
      var max = 2
      var random = Math.floor(Math.random() * (+max - +min)) + +min
      return random
    }
  },
  components: {
    LeftSideDrawer,
    // BaseHeader,
    RightSideDrawer
  },
  methods: {
    openURL,
    logit(event) {
      console.log(event)
    },
    logItOut() {
      localStorage.clear()
      this.$store.dispatch('UserModules/UpdateUser', null)
      this.$store.dispatch('UserModules/UpdateToken', null)

      this.$router.push('/home')
    },
    drawerActive() {
      this.showLeft = !this.showLeft
    },
    clientAdd() {
      this.$router.push('/nutritionist/clients/add')
    }
  }
}
</script>
<style>
.menu {
  content: '';
  display: inline-block;
  position: relative;
  opacity: 1;
  height: 3px;
  width: 30px;
  background-color: white;
  transition: transform 400ms ease;
}
.menu.active {
  transform: rotate(45deg) translateY(12px);
}
.menu.active:before {
  opacity: 0;
}
.menu.active:after {
  transform: rotate(-450deg) translateX(16px);
}
.menu:before,
.menu:after {
  content: '';
  display: block;
  position: absolute;
  opacity: 1;
  height: 3px;
  width: 30px;
  background-color: white;
}
.menu:before {
  top: 8px;
  transition: opacity 400ms ease;
}
.menu:after {
  top: 16px;
  transition: transform 400ms ease;
}
</style>
