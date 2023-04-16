import FormPassword from '@/components/FormPassword'

// 定义数据
export default {
  name: 'Test',
  // schema: {
  //   type: 'object',
  //   properties: {
  //     array: {
  //       type: 'array',
  //       items: {
  //         type: 'string',
  //         enum: ['1', '2', '3'],
  //       },
  //       uniqueItems: true,
  //     },
  //     color: {
  //       type: 'string',
  //       format: 'color',
  //     },
  //   },
  // },
  // uiSchema: {
  //   widget: 'checkboxes',
  // },
  // default: {},
  // customValidate: (data: any, errors: any) => {
  //   if (!data.array || data.array.length < 2) {
  //     errors.array.addError('数组不能少于两个')
  //   }
  // },
  schema: {
    // title: '姓名',
    // type: 'string',
    // minLength: 10,
    type: 'object',
    properties: {
      pass1: {
        title: 'pass1',
        type: 'string',
        minLength: 10,
      },
      pass2: {
        title: 'pass2',
        type: 'string',
        minLength: 10,
      },
    },
  },
  async customValidate(data: any, errors: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.pass1 !== data.pass2) {
          errors.pass2.addError('密码必须相同')
        }
        resolve('')
      }, 2000)
    })
  },
  uiSchema: {
    properties: {
      pass1: {
        widget: FormPassword,
      },
      pass2: {
        style: {
          color: 'red',
        },
      },
    },
  },
  default: {},
}
