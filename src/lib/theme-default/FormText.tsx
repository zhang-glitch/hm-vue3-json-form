import { defineComponent } from 'vue'
import { commonComponentProps } from '../types'
import { widthWidget } from './FormItemWrapper'

const FormText = widthWidget(
  defineComponent({
    name: 'FormText',
    props: commonComponentProps,
    setup(props) {
      const handleChange = (e: any) => {
        props.onChange(e.target.value)
      }
      return () => {
        const { uiSchemaOptions } = props
        return (
          <input
            type="text"
            value={props.value}
            onInput={handleChange}
            style={uiSchemaOptions!.style}
          />
        )
      }
    },
  }),
)

export default FormText
