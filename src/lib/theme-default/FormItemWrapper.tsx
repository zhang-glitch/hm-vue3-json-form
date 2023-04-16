import { defineComponent, markRaw } from 'vue'
import { createUseStyles } from 'vue-jss'
import { commonComponentProps } from '../types'

const useStyles = createUseStyles({
  container: {},
  label: {
    display: 'block',
    margin: 5,
  },
  errorTip: {
    color: 'red',
  },
})

// 该组件主要是包裹widget做一些label,error提示。
const FormItemWrapper = defineComponent({
  name: 'FormItemWrapper',
  props: commonComponentProps,
  setup(props, { slots }) {
    const classRef = useStyles()
    return () => {
      const { schema, errors } = props
      const classes = classRef.value
      return (
        <div class={classes.container}>
          <label class={classes.label}>{schema.title}</label>
          {slots.default && slots.default()}
          <ul>
            {errors?.map((error) => {
              return (
                <li key={error} class={classes.errorTip}>
                  {error}
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
  },
})

export default FormItemWrapper

// 提供一个HOC,解耦 CommonComponentType | FormSelectType
export function widthWidget(Widget: any) {
  return defineComponent({
    name: 'WidgetWrapper',
    props: commonComponentProps,
    // 这里widget可以传递的props不一样，所以我们需要使用attrs
    setup(props, { attrs }) {
      return () => {
        return (
          <FormItemWrapper {...props}>
            <Widget {...props} {...attrs} />
          </FormItemWrapper>
        )
      }
    },
  })
}
