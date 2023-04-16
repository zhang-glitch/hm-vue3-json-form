import { defineComponent } from 'vue'
import { commonComponentProps } from '../types'
import { widthWidget } from './FormItemWrapper'

const FormNumber = widthWidget(
  defineComponent({
    name: 'FormNumber',
    props: commonComponentProps,
    setup(props) {
      const handleChange = (e: any) => {
        let value: number | null = Number(e.target.value)
        if (isNaN(value)) {
          value = null
        }
        props.onChange(value)
      }
      return () => {
        return (
          <input type="number" value={props.value} onInput={handleChange} />
        )
      }
    },
  }),
)

export default FormNumber
