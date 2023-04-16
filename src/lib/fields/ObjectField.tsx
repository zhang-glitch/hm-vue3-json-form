import { defineComponent } from 'vue'
import { fieldPropTypes } from '../types'
import { useSchemaFormContext } from '../context'
import { isObject } from '../utils'
/**
*   type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      age: {
        type: 'number',
      },
      pets: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      isWorker: {
        type: 'boolean',
      },
    },
 */
export default defineComponent({
  name: 'ObjectField',
  props: fieldPropTypes,
  setup(props) {
    // 处理对象schema整体的value，会将value数据传递的最外层的组件中。让用户去处理
    const handleChange = (key: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}
      if (!v) {
        delete value[key]
      } else {
        value[key] = v
      }
      props.onChange(value)
    }
    return () => {
      // 取出所有的properties
      const { schema, value, errorSchema, uiSchema } = props
      // 如果未提供就给一个空对象
      const properties = schema.properties || {}
      const { SchemaFormItem } = useSchemaFormContext()
      // 处理value
      const currentValue: any = isObject(value) ? value : {}

      return (
        <div>
          {/* SchemaFormItem组件就是通过递归处理到叶子结点。所以每次传入的schema,value，errorSchema这些都是单独的。 */}
          {/* 这里的errorSchema我们只需要拿到该属性对应的errorSchema即可 */}
          {/* uiSchema是根据提供的schema中的每个对象单独提供一个的 */}
          {Object.keys(properties).map((schemaKey, index) => {
            return (
              <SchemaFormItem
                schema={properties[schemaKey]}
                rootSchema={schema}
                value={currentValue[schemaKey]}
                onChange={(v: any) => handleChange(schemaKey, v)}
                errorSchema={errorSchema[schemaKey] || {}}
                uiSchema={
                  (uiSchema.properties && uiSchema.properties[schemaKey]) || {}
                }
                key={index}
              ></SchemaFormItem>
            )
          })}
        </div>
      )
    }
  },
})
