<template>
  <q-select
    :dark="$dark"
    :style="`${expand ? 'margin: 0 -16px;': ''}`"
    :dense="dense"
    :outlined="outlined"
    :borderless="borderless"
    :label="label"
    :multiple="multiple"
    :use-chips="useChips"
    use-input
    fill-input
    clearable
    input-debounce="0"
    @new-value="createValue"
    @blur="blur"
    @filter="filterFn"
    :options="filteredOptions"
    v-model="model"
    ref="autoComplete"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
        <q-item-section>
          <q-item-label v-html="scope.opt"/>
        </q-item-section>
        <q-item-section avatar @click.native.stop="removeFromSelect(scope.opt)" v-if="newValue">
          <q-btn icon="fas fa-times" size="sm" round flat/>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
export default {
  created() {
    this.filteredOptions = this.opts
  },
  data() {
    return {
      inputModel: '',
      opts: this.options,
      model: Array.isArray(this.value) ? [] : null,
      filteredOptions: []
    }
  },
  methods: {
    blur() {
      this.$nextTick(() => {
        this.$refs.autoComplete.updateInputValue('')
      })
      if (!this.inputModel || !this.newValue) return
      this.$refs.autoComplete.add(this.inputModel)
      this.opts.push(this.inputModel)
    },
    createValue(val, done) {
      if (val.length > 0 && this.newValue) {
        if (!this.opts.includes(val)) {
          this.opts.push(val)
        }
        done(val, 'toggle')
      }
    },
    filterFn(val, update, abort) {
      this.inputModel = val
      update(() => {
        const needle = val.toLowerCase()
        this.filteredOptions = this.opts.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    removeFromSelect(opt) {
      var index = this.opts.indexOf(opt)
      if (index > -1) {
        this.opts.splice(index, 1)
      }
      this.$refs.autoComplete.filter(this.inputModel)
    }
  },
  props: {
    newValue: {
      type: Boolean,
      default: () => false
    },
    borderless: {
      type: Boolean,
      default: () => false
    },
    expand: {
      type: Boolean,
      default: () => false
    },
    dense: {
      type: Boolean,
      default: () => false
    },
    outlined: {
      type: Boolean,
      default: () => false
    },
    label: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      default: () => true
    },
    useChips: {
      type: Boolean,
      default: () => true
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      required: true
    }
  },
  watch: {
    model(val) {
      this.$nextTick(() => {
        this.$refs.autoComplete.updateInputValue('')
      })
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="stylus" scoped></style>