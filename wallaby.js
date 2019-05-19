
module.exports = (wallaby) => {
  process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true

  const compiler = wallaby.compilers.babel({ presets: [['@quasar/app', { modules: 'commonjs' }]] })

  return {
    files: [
      'src/**/*',
      // 'jest.config.js',
      'package.json',
      'test/jest/*',
      'test/jest/utils/*',
      '__test__/**/*.spec.js',
      '!test/**/*.spec.js',
      '!src/**/*.spec.js'
    ],
    hints: {
      // or /istanbul ignore next/, or any RegExp
      ignoreCoverage: /istanbul ignore next/
    },
    filesWithNoCoverageCalculated: ['src/boot/*', 'src/helpers/*', 'src/services/*', 'src/utils/*', './test'],

    tests: ['src/**/*.spec.js', 'src/*.spec.js'],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.js': compiler,
      '**/*.vue': require('wallaby-vue-compiler')(compiler)
    },

    preprocessors: {
      '**/*.vue': file => require('vue-jest').process(file.content, file.path)
    },


    setup: function (wallaby) {
      const jestConfig = {
        globals: {
          __DEV__: true
        },
        setupFilesAfterEnv: [
          '<rootDir>/test/jest/jest.setup.js'
        ],
        // noStackTrace: true,
        // bail: true,
        // cache: false,
        // verbose: true,
        // watch: true,
        collectCoverage: true,
        coverageDirectory: '<rootDir>/test/jest/coverage',
        collectCoverageFrom: [
          '<rootDir>/src/**/*.vue',
          '<rootDir>/src/**/*.js',
          '<rootDir>/src/**/*.ts',
          '<rootDir>/src/**/*.jsx'
        ],
        coverageThreshold: {
          global: {
            //  branches: 50,
            //  functions: 50,
            //  lines: 50,
            //  statements: 50
          }
        },
        testMatch: [
          // '<rootDir>/test/jest/__tests__/**/*.spec.js',
          // '<rootDir>/test/jest/__tests__/**/*.test.js',
          '<rootDir>/src/**/__tests__/*_jest.spec.js'
        ],
        moduleFileExtensions: [
          'vue',
          'js',
          'jsx',
          'json',
          'ts',
          'tsx'
        ],
        moduleNameMapper: {
          '^vue$': '<rootDir>/node_modules/vue/dist/vue.common.js',
          '^test-utils$': '<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.js',
          '^quasar$': '<rootDir>/node_modules/quasar/dist/quasar.common.js',
          // '^~/(.*)$': '<rootDir>/$1',
          '^~/(.*)$': '<rootDir>/node_modules/$1',
          '^src/(.*)$': '<rootDir>/src/$1',
          '.*css$': '<rootDir>/test/jest/utils/stub.css'
        },
        transform: {
          '.*\\.vue$': 'vue-jest',
          '.*\\.js$': 'babel-jest',
          '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
          // use these if NPM is being flaky
          // '.*\\.vue$': '<rootDir>/node_modules/@quasar/quasar-app-extension-testing-unit-jest/node_modules/vue-jest',
          // '.*\\.js$': '<rootDir>/node_modules/@quasar/quasar-app-extension-testing-unit-jest/node_modules/babel-jest'
        },
        transformIgnorePatterns: [
          '<rootDir>/node_modules/(?!quasar/lang)'
        ],
        snapshotSerializers: [
          '<rootDir>/node_modules/jest-serializer-vue'
        ]
      }
      jestConfig.transform = {}
      wallaby.testFramework.configure(jestConfig)
    },

    // setup: function (wallaby) {
    //   const config = require('./package.json').jest;
    //   Object.keys(config.moduleNameMapper).forEach(k => (config.moduleNameMapper[k] = config.moduleNameMapper[k].replace('<rootDir>', wallaby.localProjectDir)))
    //   wallaby.testFramework.configure(config);
    // },
    testFramework: 'jest',

    debug: true
  }
}
