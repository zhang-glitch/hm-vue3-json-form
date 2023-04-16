// 该组件主要是为了解耦theme和schemaform组件的。提供一个默认的widget组件
import {
  ComputedRef,
  ExtractPropTypes,
  PropType,
  computed,
  defineComponent,
  inject,
  provide,
  ref,
} from 'vue'
import {
  CommonComponentEnum,
  fieldPropTypes,
  FormSelectEnum,
  Theme,
} from './types'
import { isObject } from './utils'

export default defineComponent({
  name: 'ThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true,
    },
  },
  setup(props, { slots }) {
    // 处理theme
    const themeRef = computed(() => {
      return props.theme
    })
    // 这里直接传递themeRef,让外界传入props改变的时候，下层组件都可以获取到改变后的值，如果获取value，将没有响应式了
    provide('THEME_PROVIDER_KEY', themeRef)
    return () => {
      return slots.default && slots.default()
    }
  },
})

// 根据传入的叶子组件名，获取对应的组件
export function getWidget(
  name: FormSelectEnum | CommonComponentEnum,
  props?: ExtractPropTypes<typeof fieldPropTypes>,
) {
  // 如果外界传递额外的widget,将使用外界的
  if (props) {
    if (isObject(props.uiSchema.widget)) {
      return ref(props.uiSchema.widget)
    }
  }

  const themeRef: ComputedRef<Theme> | undefined =
    inject<ComputedRef<Theme>>('THEME_PROVIDER_KEY')

  // 如果未提供theme，将抛出错误
  if (!themeRef) {
    throw new Error('theme props is needed')
  }
  const widgetRef = computed(() => {
    return themeRef.value.widgets[name]
  })
  return widgetRef
}
