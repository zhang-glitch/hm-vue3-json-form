import { mount, shallowMount } from '@vue/test-utils'
import SchemaForm, { NumberField } from '@/lib'
import theme from '@/lib/theme-default'

// 针对某一方面的单元测试
describe('NumberField', () => {
  // 一些功能的测试
  it('should render number field', () => {
    let value = ''
    const wrapper = mount(SchemaForm, {
      props: {
        value,
        schema: {
          type: 'number',
        },
        rootSchema: {
          type: 'number',
        },
        onChange(v: any) {
          value = v
        },
        theme: theme as any,
      },
    })

    const numberField = wrapper.findComponent(NumberField)
    const input = numberField.find('input')
    input.element.value = '123'
    input.trigger('input')

    expect(numberField.exists()).toBeTruthy()
    expect(value).toBe(123)
  })
})
