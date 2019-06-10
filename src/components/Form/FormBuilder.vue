<script>
import { FormDirector, FormBuilder } from './FormBuilders.js'
export default {
  props: ['formMethod'],
  render(h) {
    const director = new FormDirector()
    const builder = new FormBuilder(h)
    director[this.formMethod](builder)
    return builder.getForm()
  }
}
</script>