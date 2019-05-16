<script>
// import { required, email } from 'vuelidate/lib/validators'
// import LoginService from '../services/LoginService.js'
// import { mapGetters } from 'vuex'
// export default {
//   name: 'Login',
//   preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {
//     // fetch data, validate route and optionally redirect to some other route...

//     // ssrContext is available only server-side in SSR mode

//     // No access to "this" here as preFetch() is called before
//     // the component gets instantiated.

//     // Return a Promise if you are running an async job
//     // Example:
//     return store.dispatch('fetchItem', currentRoute.params.id)
//   },
//   data() {
//     return {
//       form: {
//         submitted: false,
//         loading: false,
//         Next: '',
//         error: '',
//         username: '',
//         password: ''
//       }
//     }
//   },

//   validations: {
//     form: {
//       username: { required },
//       password: { required }
//     }
//   },
//   computed: {
//     // display the item from store state.
//     item() {
//       return this.$store.state.items[this.$route.params.id]
//     }
//   },
//   methods: {
//     submit() {
//       this.$v.form.$touch()
//       this.submitted = true

//       if (this.$v.form.$error) {
//         this.$q.notify('Please review fields again.')
//         return
//       }
//       this.loading = true
//       console.log(payload)
//       LoginService.login(this.form.login).then(
//         user => router.push(this.Next),
//         error => {
//           this.error = error
//           this.loading = false
//         }
//       )

//       // ...
//     }
//   }
// }
//
</script>