import SchemaForm, { ObjectField, StringField, NumberField } from '@/lib'
import { mount } from '@vue/test-utils'
import theme from '@/lib/theme-default'

describe('ObjectField', () => {
  let schema = {}
  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        age: {
          type: 'number',
        },
      },
    }
  })

  // 测试渲染
  it('should render properties to schema item', async () => {
    let value = {}
    const wrapper = mount(SchemaForm, {
      props: {
        value,
        schema,
        rootSchema: schema,
        onChange(v: any) {
          value = v
        },
        theme: theme as any,
      },
    })

    const stringField = wrapper.findComponent(StringField)
    const numberField = wrapper.findComponent(NumberField)

    expect(stringField.exists()).toBeTruthy()
    expect(numberField.exists()).toBeTruthy()
  })
  // 测试修改参数
  it('should correct change value', async () => {
    let value: any = {
      name: 'zh',
    }
    const wrapper = mount(SchemaForm, {
      props: {
        value,
        schema,
        rootSchema: schema,
        onChange(v: any) {
          value = v
        },
        theme: theme as any,
      },
    })

    const stringField = wrapper.findComponent(StringField)

    await stringField.props('onChange')('123')
    expect(value.name).toEqual('123')
  })

  // 测试修改值为undefined时
  it('should correct change value equal undefined', async () => {
    let value: any = { age: 123 }
    const wrapper = mount(SchemaForm, {
      props: {
        value,
        schema,
        rootSchema: schema,
        onChange(v: any) {
          value = v
        },
        theme: theme as any,
      },
    })

    const numberField = wrapper.findComponent(NumberField)
    // 内部代码，如果是undefined, null就会被删除掉，所以value.age就为undefined
    await numberField.props('onChange')(undefined)
    expect(value.age).toBeUndefined()
  })

  // it('undefined equal null', async () => {
  //   expect(null).toBeUndefined()
  // })
})
