import SchemaForm, {
  ArrayField,
  FormSelect,
  NumberField,
  StringField,
} from '@/lib'
import { mount } from '@vue/test-utils'
import TestComponent from './utils/TestComponent'

describe('ArrayField', () => {
  // 测试多表单项渲染 >npm run test:unit -- --t=multiple
  it('should single item by value render', () => {
    let value: any = []
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
        },
        value,

        onChange(v: any) {
          value = v
        },
      },
    })

    const arrayField = wrapper.findComponent(ArrayField)
    const numberField = arrayField.findComponent(NumberField)
    const stringField = arrayField.findComponent(StringField)

    expect(numberField.exists()).toBeTruthy()
    expect(stringField.exists()).toBeTruthy()
  })
  // 测试单表单项，根据value数据渲染 >npm run test:unit -- --t=single
  it('should multiple item render', () => {
    let value: any = ['zh', 'llm']
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        value,

        onChange(v: any) {
          value = v
        },
      },
    })

    const arrayField = wrapper.findComponent(ArrayField)
    const stringFields = arrayField.findAllComponents(StringField)

    expect(stringFields.length).toEqual(2)
  })

  // 测试多选表单，根据value数据渲染 >npm run test:unit -- --t=single
  it('should single item to render by options', () => {
    let value: any = []
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: [1, 2, 3],
          },
        },
        value,

        onChange(v: any) {
          value = v
        },
      },
    })

    const arrayField = wrapper.findComponent(ArrayField)
    const formSelect = arrayField.findComponent(FormSelect)

    expect(formSelect.exists()).toBeTruthy()
  })
})
