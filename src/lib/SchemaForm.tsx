import {
  PropType,
  Ref,
  defineComponent,
  provide,
  ref,
  shallowRef,
  watchEffect,
} from 'vue'
import Ajv, { Options } from 'ajv'

import { Schema, Theme, UISchema, fieldPropTypes } from './types'
import SchemaFormItem from './SchemaFormItem'
import { schemaFormItemSymbol } from './context'
import { ErrorSchema, validateFormData } from './validator'

// 默认的ajv配置
const ajvDefaultOptions = { allErrors: true }

export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    // value没有类型限制，只限制必传
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    // 提供theme组件结合
    // theme: {
    //   type: Object as PropType<Theme>,
    //   required: true,
    // },
    // 外界传入ajv配置
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    locale: {
      type: String,
      default: 'zh',
    },
    // 自定义验证函数
    customValidate: {
      type: Function as PropType<(data: any, error: any) => void>,
    },
    uiSchema: {
      type: Object as PropType<UISchema>,
    },
  },
  setup(props, { expose }) {
    // 这里改变的就是整体的value属性
    const handleChange = function (v: any) {
      props.onChange(v)
    }
    // 向下提供SchemaFormItem组件
    // provide(schemaFormItemSymbol, { SchemaFormItem, theme: props.theme })
    provide(schemaFormItemSymbol, { SchemaFormItem })

    // 在最开始可能为空，所以断言成any
    const validatorRef: Ref<Ajv> = shallowRef() as any
    // 当外界传入的ajvOptions改变时，让validatorRef可以监控到
    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...ajvDefaultOptions,
        ...props.ajvOptions,
      })
    })
    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})

    // i18n.zh(validate.errors)
    // 提供验证函数，暴露给外界
    const onValidate = async () => {
      const validateRes = await validateFormData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale,
        props.customValidate,
      )
      errorSchemaRef.value = validateRes.errorSchema
      return validateRes
    }
    expose({
      onValidate,
    })
    return () => {
      return (
        <SchemaFormItem
          schema={props.schema}
          value={props.value}
          onChange={handleChange}
          rootSchema={props.schema}
          errorSchema={errorSchemaRef.value || {}}
          uiSchema={props.uiSchema || {}}
        />
      )
    }
  },
})
