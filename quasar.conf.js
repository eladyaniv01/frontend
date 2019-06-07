// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/boot)

    boot: ['i18n', 'axios', 'vuelidate', 'Ftitle', 'lodash', 'noConsole', 'notify-defaults', 'vtooltip'],
    css: ['app.styl'],
    extras: [
      'material-icons',
      'ionicons-v4',
      'mdi-v3',
      'fontawesome-v5'
    ],
    supportIE: true,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,


      publicPath: '/',


      // extendWebpack(cfg) {
      //   cfg.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js)$/,
      //     loader: 'eslint-loader',
      //     exclude: /node_modules/
      //   })
      // }
      extendWebpack(cfg) {
        cfg.module.rules.push({
          resourceQuery: /blockType=i18n/,
          use: [
            { loader: '@kazupon/vue-i18n-loader' },
            { loader: 'yaml-loader' }
          ]
        })
      }
    },
    devServer: {
      open: true,
      port: 8080
    },
    // framework: 'all', // --- includes everything; for dev only!
    framework: {

      components: [
        // layout
        'QLayout',
        'QPageContainer',
        'QPage',
        'QHeader',
        'QFooter',
        'QDrawer',
        'QPageSticky',
        'QPageScroller',

        // scroll
        'QScrollArea',

        //icon , badge, avatar
        'QIcon',
        'QBadge',
        'QAvatar',
        'QTooltip',

        //separator
        'QSeparator',

        // card 

        'QCard',
        'QCardSection',
        'QCardActions',

        // toolbar

        'QToolbar',
        'QToolbarTitle',

        // forms, buttons
        'QForm',
        'QBtn',
        'QBtnDropdown',
        'QInput',
        'QField',
        'QSelect',
        'QStepper',
        'QStep',
        'QStepperNavigation',
        'QPopupEdit',
        'QEditor',
        'QOptionGroup',


        // lists
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QExpansionItem',

        // tabs
        'QTabs',
        'QTab',
        'QRouteTab',
        'QTabPanels',
        'QTabPanel',

        //tables
        'QMarkupTable',
        'QTable',
        'QTh',
        'QTr',
        'QTd',


        // tree
        'QTree',

        //dialog / notifications
        'QDialog',

        // pagination
        'QPagination',


        'QToggle',

        'QRange',
        'QRadio',
        'QSlider',
        'QColor',
        'QDate',
        'QTime',
        'QPopupProxy'

      ],
      directives: [
        'ClosePopup',
        'Ripple',
        'TouchSwipe'

      ],
      // Quasar plugins
      plugins: [
        'BottomSheet',
        'Dialog',
        'Loading',
        'LoadingBar',
        'Meta',
        'Notify'

      ],
      iconSet: [

        'fontawesome-v5'
      ]
      // lang: 'de' // Quasar language
    },
    // animations: 'all' --- includes all animations

    animations: 'all',
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },

      bundler: 'packager',
      packager: {
        platform: 'win32',
        buildPath: '/home/electron/'
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'quasar-app'
      }
    }
  }
}


// vZK3ERDCjyJ2zUOBxcQ2