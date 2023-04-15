import { defineComponent } from 'vue'
import { getWidget } from '../theme'
import {
  CommonComponentEnum,
  fieldPropTypes,
  CommonComponentType,
} from '../types'

export default defineComponent({
  name: 'StringField',
  props: fieldPropTypes,
  setup(props) {
    const FormText = getWidget(CommonComponentEnum.FormText)
      .value as CommonComponentType

    return () => {
      return <FormText value={props.value} onChange={props.onChange} />
    }
  },
})
