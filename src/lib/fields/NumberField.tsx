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
    const FormNumberRef = getWidget(CommonComponentEnum.FormNumber, props)

    return () => {
      const { widget, properties, items, ...uiSchemaOptions } = props.uiSchema
      const FormNumber = FormNumberRef.value as CommonComponentType
      return (
        <FormNumber
          value={props.value}
          onChange={props.onChange}
          errors={props.errorSchema.__errors}
          schema={props.schema}
          uiSchemaOptions={uiSchemaOptions}
        />
      )
    }
  },
})
