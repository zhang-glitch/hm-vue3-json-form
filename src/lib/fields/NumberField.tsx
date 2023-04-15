import { defineComponent } from 'vue'
import { getWidget } from '../theme'
import {
  CommonComponentEnum,
  fieldPropTypes,
  CommonComponentType,
} from '../types'

export default defineComponent({
  name: 'NumberField',
  props: fieldPropTypes,
  setup(props) {
    const FormNumber = getWidget(CommonComponentEnum.FormNumber)
      .value as CommonComponentType
    return () => {
      return <FormNumber value={props.value} onChange={props.onChange} />
    }
  },
})
