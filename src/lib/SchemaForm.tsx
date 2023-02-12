import { defineComponent } from 'vue'
import { propTypes } from './types'
import SchemaFormItem from './SchemaFormItem'

export default defineComponent({
  name: 'SchemaForm',
  props: propTypes,
  setup(props, { emit, slots, attrs }) {
    const handleChange = function (v: any) {
      console.log('qweqeq', v)
      props.onChange(v)
    }
    return () => {
      return (
        <SchemaFormItem
          schema={props.schema}
          value={props.value}
          onChange={handleChange}
        />
      )
    }
  },
})
