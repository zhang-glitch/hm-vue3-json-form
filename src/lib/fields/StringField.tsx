import { computed, defineComponent } from 'vue'
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
    const FormTextRef = getWidget(CommonComponentEnum.FormText, props)

    return () => {
      // const UISchema = props.uiSchema.widget
      const { widget, properties, items, ...uiSchemaOptions } = props.uiSchema
      const FormText = FormTextRef.value as CommonComponentType
      return (
        <FormText
          value={props.value}
          onChange={props.onChange}
          errors={props.errorSchema.__errors}
          schema={props.schema}
          uiSchemaOptions={uiSchemaOptions}
        />
      )
    }
    // return () => {
    //   const UISchema = props.uiSchema.widget
    //   const { widget, properties, items, ...uiSchemaOptions } = props.uiSchema
    //   return UISchema ? (
    //     <UISchema
    //       value={props.value}
    //       onChange={props.onChange}
    //       errors={props.errorSchema.__errors}
    //       schema={props.schema}
    //       uiSchemaOptions={uiSchemaOptions}
    //     />
    //   ) : (
    //     <FormText
    //       value={props.value}
    //       onChange={props.onChange}
    //       errors={props.errorSchema.__errors}
    //       schema={props.schema}
    //       uiSchemaOptions={uiSchemaOptions}
    //     />
    //   )
    // }
  },
})
