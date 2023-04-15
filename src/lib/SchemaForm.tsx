import { PropType, Ref, defineComponent, provide, ref, watchEffect } from 'vue'
import Ajv, { Options } from 'ajv'
import i18n from 'ajv-i18n'
import ajvErrors from 'ajv-errors'

import { Schema, Theme, fieldPropTypes } from './types'
import SchemaFormItem from './SchemaFormItem'
import { schemaFormItemSymbol } from './context'

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
    const validatorRef: Ref<Ajv> = ref() as any
    // 当外界传入的ajvOptions改变时，让validatorRef可以监控到
    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...ajvDefaultOptions,
        ...props.ajvOptions,
      })
    })

    // i18n.zh(validate.errors)
    // 提供验证函数，暴露给外界
    const onValidate = () => {
      try {
        const isValidate = validatorRef.value.validate(
          props.schema,
          props.value,
        )
        return {
          // errors: validate.errors || [],
          errors: validatorRef.value.errors || [],
          isValidate: isValidate,
        }
      } catch (error) {
        console.log(error)
      }
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
        />
      )
    }
  },
})
