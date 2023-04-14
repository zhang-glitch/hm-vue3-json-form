import { Component, defineComponent, computed } from 'vue'
import { fieldPropTypes, SchemaTypes } from './types'
import NumberField from './fields/NumberField.vue'
import StringField from './fields/StringField.vue'
import { retrieveSchema } from './utils'
import ObjectField from './fields/ObjectField'
import ArrayField from './fields/ArrayField'

export default defineComponent({
  name: 'SchemaFormItem',
  props: fieldPropTypes,
  setup(props, { emit, slots, attrs }) {
    // TODO: 如果type没有指定，我们需要猜测type类型
    let componentValue: Component
    // 处理schema
    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props
      // 处理schema
      const retrievedSchema = retrieveSchema(schema, rootSchema, value)
      return retrievedSchema
    })
    return () => {
      const { schema } = props
      // 判断渲染什么类型的schema
      const type = schema.type
      switch (type) {
        case SchemaTypes.STRING:
          componentValue = StringField
          break
        case SchemaTypes.NUMBER:
          componentValue = NumberField
          break
        case SchemaTypes.OBJECT:
          componentValue = ObjectField
          break
        case SchemaTypes.ARRAY:
          componentValue = ArrayField
          break
        default:
          console.warn(`${type}类型不存在`)
          break
      }
      return <componentValue {...props} schema={retrievedSchemaRef.value} />
    }
  },
})
