import { PropType, defineComponent, ref, watch } from 'vue'
import { FormSelectType, formSelectProps } from '../types'

// 显示指定组件类型，推断的类型会有问题，在赋值的时候
const FormSelect = defineComponent({
  name: 'FormSelect',
  props: formSelectProps,
  setup(props) {
    const currentValueRef = ref(props.value)
    // 让props.value做到双向绑定
    watch(currentValueRef, (newVal: any) => {
      props.onChange(newVal)
    })

    watch(
      () => props.value,
      (newVal) => {
        currentValueRef.value = newVal
      },
    )

    return () => {
      return (
        <select multiple={true} v-model={currentValueRef.value}>
          {props.options.map((item) => {
            return (
              <option value={item.value} key={item.key}>
                {item.key}
              </option>
            )
          })}
        </select>
      )
    }
  },
})

export default FormSelect
