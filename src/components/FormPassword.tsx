import { defineComponent } from 'vue'
import { widthWidget } from '@/lib/theme-default/FormItemWrapper'
import { commonComponentProps } from '@/lib'

const FormPassword = widthWidget(
  defineComponent({
    name: 'FormPassword',
    props: commonComponentProps,
    setup(props) {
      const handleChange = (e: any) => {
        props.onChange(e.target.value)
      }
      return () => {
        return (
          <input type="password" value={props.value} onInput={handleChange} />
        )
      }
    },
  }),
)

export default FormPassword
