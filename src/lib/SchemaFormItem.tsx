import { Component, defineComponent } from 'vue'
import { propTypes, SchemaTypes } from './types'
import NumberField from './fields/NumberField.vue'
import StringField from './fields/StringField.vue'

export default defineComponent({
  name: 'SchemaFormItem',
  props: propTypes,
  setup(props, { emit, slots, attrs }) {
    let componentValue: Component
    console.log('=====', props)
    return () => {
      // 判断渲染什么类型的schema
      switch (props.schema.type) {
        case SchemaTypes.STRING:
          componentValue = StringField
          break
        case SchemaTypes.NUMBER:
          componentValue = NumberField
          break
        default:
          break
      }
      return <componentValue {...props} />
    }
  },
})
