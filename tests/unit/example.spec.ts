import { mount, shallowMount } from '@vue/test-utils'
import SchemaForm, { NumberField } from '@/lib'
import TestComponent from './utils/TestComponent'

// 针对某一方面的单元测试
describe('NumberField', () => {
  // 一些功能的测试
  it('should render number field', () => {
    let value = ''
    const wrapper = mount(TestComponent, {
      props: {
        value,
        schema: {
          type: 'number',
        },

        onChange(v: any) {
          value = v
        },
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
