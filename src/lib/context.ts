import { fieldPropTypes } from './types'
import { inject, defineComponent } from 'vue'
// import SchemaFormItem from './SchemaFormItem'
const typeHelperComponent = defineComponent({
  props: fieldPropTypes,
})
type SchemaFormItemType = typeof typeHelperComponent
// type SchemaFormItemType = InstanceType<typeof SchemaFormItem>

export const schemaFormItemSymbol = Symbol()

// 获取SchemaFormItem组件，防止循环引入
// const schemaFormItemContext:
//   | { schemaFormItem: SchemaFormItemType }
//   | undefined = inject(schemaFormItemSymbol)

// if (!schemaFormItemContext) {
//   throw new Error('SchemaForm is needed')
// }

// export const schemaFormItem = schemaFormItemContext

export function useSchemaFormItemContext() {
  const context: { SchemaFormItem: SchemaFormItemType } | undefined =
    inject(schemaFormItemSymbol)

  if (!context) {
    throw new Error('SchemaForm is needed')
  }

  return context
}
