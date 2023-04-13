import { PropType, defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'FormSelect',
  props: {
    value: {
      required: true,
    },
    options: {
      type: Array as PropType<{ key: string; value: any }[]>,
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
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
