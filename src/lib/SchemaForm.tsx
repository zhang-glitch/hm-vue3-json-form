import { PropType, defineComponent, provide } from 'vue'
import { Schema, Theme, fieldPropTypes } from './types'
import SchemaFormItem from './SchemaFormItem'
import { schemaFormItemSymbol } from './context'

export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    // value没有类型限制，只限制必传
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    // 提供theme组件结合
    theme: {
      type: Object as PropType<Theme>,
      required: true,
    },
  },
  setup(props, { emit, slots, attrs }) {
    // 这里改变的就是整体的value属性
    const handleChange = function (v: any) {
      props.onChange(v)
    }
    // 向下提供SchemaFormItem组件
    provide(schemaFormItemSymbol, { SchemaFormItem, theme: props.theme })
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
