import { defineComponent } from 'vue'
import { commonComponentProps } from '../types'

const FormText = defineComponent({
  name: 'FormText',
  props: commonComponentProps,
  setup(props) {
    const handleChange = (e: any) => {
      props.onChange(e.target.value)
    }
    return () => {
      return <input type="text" value={props.value} onInput={handleChange} />
    }
  },
})

export default FormText
