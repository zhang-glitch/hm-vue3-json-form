import {
  defineComponent,
  ref,
  Ref,
  reactive,
  watchEffect,
  onMounted,
} from 'vue'
import { createUseStyles } from 'vue-jss'

import MonacoEditor from './components/MonacoEditor'
import SchemaForm from './lib/SchemaForm'
import themeDefault from './lib/theme-default'
import { ThemeProvider } from './lib'

import demos from './demos'

import { Schema, UISchema } from './lib/types'
import theme from './lib/theme-default'

// 转换对象为字符串
function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}

// 定义样式
const useStyles = createUseStyles({
  '@global': {
    body: {
      margin: 0,
      padding: 0,
    },
    '*': {
      boxSizing: 'border-box',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '1200px',
    margin: '0 auto',
  },
  menu: {
    marginBottom: 20,
    backgroundColor: 'pink',
    paddingTop: 20,
    minWidth: 1200,
    '& > h1': {
      textAlign: 'center',
      color: '#fff',
      fontSize: 60,
    },
  },
  code: {
    width: 700,
    flexShrink: 0,
  },
  codePanel: {
    minHeight: 400,
    marginBottom: 20,
  },
  uiAndValue: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      width: '46%',
    },
  },
  content: {
    display: 'flex',
  },
  form: {
    padding: '0 20px',
    flexGrow: 1,
  },
  menuButton: {
    appearance: 'none',
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'inline-block',
    padding: 15,
    color: '#fff',
    borderRadius: 5,
    '& + &': {
      marginLeft: 15,
    },
    '&:hover': {
      background: '#fff',
      color: 'pink',
    },
  },
  menuSelected: {
    background: '#fff',
    color: 'pink',
    '&:hover': {
      background: '#fff',
      color: 'pink',
    },
  },
  menus: {
    width: 1200,
    padding: 20,
    margin: '0 auto',
  },
})

export default defineComponent({
  setup() {
    const selectedRef: Ref<number> = ref(0)

    const demo: {
      schema: Schema
      data: any
      uiSchema: UISchema
      schemaCode: string
      dataCode: string
      uiSchemaCode: string
      customValidate?: any
    } = reactive({
      schema: {},
      // 就是整个表单的data数据
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
      customValidate: undefined,
    })

    // 切换案列tabs
    watchEffect(() => {
      // 当案列切换
      const index = selectedRef.value
      // 我们每次切换demoschema时，我们都会将修改的值保存到demos中，因为demos是对象。更新了就会通过引用保存下来。
      const d: any = demos[index]
      demo.schema = d.schema
      // 表单默认值
      demo.data = d.default
      demo.uiSchema = d.uiSchema
      // 各个部分编辑器默认值
      demo.schemaCode = toJson(d.schema)
      demo.dataCode = toJson(d.default)
      demo.uiSchemaCode = toJson(d.uiSchema)
      // 参数验证函数
      demo.customValidate = d.customValidate
    })

    // vue-jss是基于vue3的，所以取值需要使用.value
    const classesRef = useStyles()

    // 获取表单组件data变化。不管哪个表单项变化，他都会被触发
    const handleChange = (v: any) => {
      demo.data = v
      // 更新dataSchema json编辑框
      demo.dataCode = toJson(v)
    }

    // 工厂函数，用于处理不同类型的编辑器。 这里和上面的handleChange不冲突了吗？？？ 不冲突
    function handleCodeChange(
      filed: 'schema' | 'data' | 'uiSchema',
      value: string,
    ) {
      // 防止输入的内容不符合json规范，报错
      try {
        const json = JSON.parse(value)
        // field的值是对象， fieldCode的值是一个json字符串
        demo[filed] = json
        ;(demo as any)[`${filed}Code`] = value
      } catch (err) {
        console.log('err', err)
      }
    }

    const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
    const handleDataChange = (v: string) => handleCodeChange('data', v)
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)

    // 提供SchemaFormRef
    const schemaFormRef = ref<InstanceType<typeof SchemaForm>>()
    // 验证，内部就是调用ajv.validate函数处理的。
    const handleValidate = async () => {
      if (!schemaFormRef.value) return
      const validateRes = await schemaFormRef.value.$.exposed!.onValidate()
      console.log('validateRes', validateRes)
    }

    return () => {
      const classes = classesRef.value
      const selected = selectedRef.value

      return (
        <>
          <div class={classes.menu}>
            <h1>HM Vue3 JsonSchema Form</h1>
            <div class={classes.menus}>
              {demos.map((demo, index) => (
                <button
                  class={{
                    [classes.menuButton]: true,
                    [classes.menuSelected]: index === selected,
                  }}
                  onClick={() => (selectedRef.value = index)}
                >
                  {demo.name}
                </button>
              ))}
            </div>
          </div>
          <div class={classes.container}>
            <div class={classes.content}>
              <div class={classes.code}>
                {/* schema编辑框 */}
                <MonacoEditor
                  code={demo.schemaCode}
                  class={classes.codePanel}
                  onChange={handleSchemaChange}
                  title="Schema"
                />
                <div class={classes.uiAndValue}>
                  {/* uischema编辑框 */}
                  <MonacoEditor
                    code={demo.uiSchemaCode}
                    class={classes.codePanel}
                    onChange={handleUISchemaChange}
                    title="UISchema"
                  />

                  {/* data编辑框 */}
                  <MonacoEditor
                    code={demo.dataCode}
                    class={classes.codePanel}
                    onChange={handleDataChange}
                    title="Value"
                  />
                </div>
              </div>
              <div class={classes.form}>
                <ThemeProvider theme={theme as any}>
                  <SchemaForm
                    schema={demo.schema!}
                    onChange={handleChange}
                    value={demo.data}
                    ref={schemaFormRef}
                    customValidate={demo.customValidate}
                    uiSchema={demo.uiSchema}
                  />
                </ThemeProvider>

                <div style={{ marginTop: '20px' }}>
                  <button onClick={handleValidate}>校验</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
  },
})
