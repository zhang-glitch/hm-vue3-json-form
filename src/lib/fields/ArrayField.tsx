import { PropType, defineComponent } from 'vue'
import {
  FormSelectEnum,
  FormSelectType,
  Schema,
  fieldPropTypes,
} from '../types'
import { useSchemaFormContext } from '../context'
import { createUseStyles } from 'vue-jss'
import { getWidget } from '../theme'
// import FormSelect from '../components/FormSelect'

/**
 * 方式一: 单类型数组渲染
 * type: array,
 * items: {type: string}
 *
 * 方式二
 * type: array,
 * items: [
 *  {type: string},
 *  {type: number}
 * ]
 *
 * value=["zh", 123]
 *
 * 方式三
 * type: array,
 * items:{type: string, enum: [1,2]}
 */

// 定义一个表单处理组件
const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
  },
  content: {
    padding: 10,
  },
  actions: {
    background: '#eee',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 10,
  },
  action: {
    marginLeft: 10,
  },
})
const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    actionAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    actionDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    actionUp: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    actionDown: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classes = useStyles().value
    return () => {
      return (
        <div class={classes.container}>
          {/* 定义操作栏 */}
          <div class={classes.actions}>
            <button
              class={classes.action}
              onClick={() => {
                props.actionAdd(props.index)
              }}
            >
              添加
            </button>
            <button
              class={classes.action}
              onClick={() => {
                props.actionDelete(props.index)
              }}
            >
              删除
            </button>
            <button
              class={classes.action}
              onClick={() => {
                props.actionUp(props.index)
              }}
            >
              上移
            </button>
            <button
              class={classes.action}
              onClick={() => {
                props.actionDown(props.index)
              }}
            >
              下移
            </button>
          </div>
          {/* 表单内容 */}
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      )
    }
  },
})
export default defineComponent({
  name: 'ArrayField',
  props: fieldPropTypes,
  setup(props) {
    // 处理onChange
    const handleChange = (v: any, index: number) => {
      const value = Array.isArray(props.value) ? props.value : []
      value[index] = v
      props.onChange(value)
    }

    return () => {
      // const { SchemaFormItem, theme } = useSchemaFormContext()
      const { SchemaFormItem } = useSchemaFormContext()
      const { schema, value, rootSchema, errorSchema, uiSchema } = props

      // 处理items是一个数组的case, 循环获取schema
      const schemaItems = schema.items
      let schemas: Schema[] = []
      const isMultiType = Array.isArray(schemaItems)
      const isSelect = schemaItems && (schemaItems as any).enum

      // 处理uiSchema其他内容
      const { widget, properties, items, ...uiSchemaOptions } = props.uiSchema

      if (isMultiType) {
        schemas = schemaItems
        // 处理value
        const currentValue = Array.isArray(value) ? value : []
        return (
          <div>
            {schemas.map((key, index) => {
              return (
                <SchemaFormItem
                  schema={key}
                  value={currentValue[index]}
                  rootSchema={rootSchema}
                  onChange={(v: any) => handleChange(v, index)}
                  errorSchema={errorSchema[index] || {}}
                  uiSchema={
                    (uiSchema.items &&
                      Array.isArray(uiSchema.items) &&
                      uiSchema.items[index]) ||
                    {}
                  }
                  key={index}
                ></SchemaFormItem>
              )
            })}
          </div>
        )
      } else if (!isSelect) {
        // 个根据value值来渲染节点数
        const currentValue = Array.isArray(value) ? value : []
        const actionAdd = (index: number) => {
          // 添加的值为undefined
          currentValue.splice(index + 1, 0, undefined)
        }
        const actionDelete = (index: number) => {
          currentValue.splice(index, 1)
          // 删除时将value也更新一下。
          props.onChange(currentValue)
        }
        const actionDown = (index: number) => {
          if (index >= currentValue.length - 1) return
          const item = currentValue.splice(index, 1)
          currentValue.splice(index + 1, 0, item[0])
          //下移时将value也更新一下。
          props.onChange(currentValue)
        }
        const actionUp = (index: number) => {
          if (index <= 0) return
          const item = currentValue.splice(index, 1)
          currentValue.splice(index - 1, 0, item[0])
          // 上移时将value也更新一下。
          props.onChange(currentValue)
        }
        return (
          <div>
            {currentValue.map((val, index) => {
              return (
                <ArrayItemWrapper
                  actionAdd={actionAdd}
                  actionDelete={actionDelete}
                  actionDown={actionDown}
                  actionUp={actionUp}
                  index={index}
                >
                  <SchemaFormItem
                    schema={schemaItems as Schema}
                    value={val}
                    rootSchema={rootSchema}
                    onChange={(v: any) => handleChange(v, index)}
                    errorSchema={errorSchema[index] || {}}
                    uiSchema={
                      (!Array.isArray(uiSchema.items) && uiSchema.items) || {}
                    }
                    key={index}
                  ></SchemaFormItem>
                </ArrayItemWrapper>
              )
            })}
          </div>
        )
      } else {
        // 选择表单，根据enum属性。这里提供的value就是表单值
        const enumOptions = (schemaItems as any).enum
        const options = enumOptions.map((item: any) => ({
          key: item,
          value: item,
        }))
        // 获取选择组件
        // const FormSelect = theme.widgets.FormSelect
        // 处理叶子组件
        const FormSelect = getWidget(FormSelectEnum.FormSelect, props)
          .value as FormSelectType
        return (
          <div>
            <FormSelect
              value={value}
              onChange={props.onChange}
              options={options}
              errors={props.errorSchema.__errors}
              schema={props.schema}
              uiSchemaOptions={uiSchemaOptions}
            />
          </div>
        )
      }
    }
  },
})
