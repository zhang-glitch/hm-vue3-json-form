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
      const { schema, value } = props
      // 如果未提供就给一个空对象
      const properties = schema.properties || {}
      const { SchemaFormItem } = useSchemaFormContext()
      // 处理value
      const currentValue: any = isObject(value) ? value : {}

      return (
        <div>
          {Object.keys(properties).map((schemaKey, index) => {
            return (
              <SchemaFormItem
                schema={properties[schemaKey]}
                rootSchema={schema}
                value={currentValue[schemaKey]}
                onChange={(v: any) => handleChange(schemaKey, v)}
                key={index}
              ></SchemaFormItem>
            )
          })}
        </div>
      )
    }
  },
})
