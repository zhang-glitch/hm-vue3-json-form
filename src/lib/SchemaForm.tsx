import { defineComponent, provide } from 'vue'
import { fieldPropTypes } from './types'
import SchemaFormItem from './SchemaFormItem'
import { schemaFormItemSymbol } from './context'

export default defineComponent({
  name: 'SchemaForm',
  props: fieldPropTypes,
  setup(props, { emit, slots, attrs }) {
    // 这里改变的就是整体的value属性
    const handleChange = function (v: any) {
      props.onChange(v)
    }
    // 向下提供SchemaFormItem组件
    provide(schemaFormItemSymbol, { SchemaFormItem })
    return () => {
      return (
        <SchemaFormItem
          schema={props.schema}
          value={props.value}
          onChange={handleChange}
          rootSchema={props.schema}
        />
      )
    }
  },
})
