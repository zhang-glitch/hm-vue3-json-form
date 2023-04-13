const Ajv = require('ajv')
const localize = require('ajv-i18n')
const ajvErrors = require('ajv-errors')
const ajv = new Ajv({ allErrors: true }) // options can be passed, e.g. {allErrors: true}
ajvErrors(ajv)
// ajv.addFormat('testCustomFormat', (data) => {
//   // data就是当前定义的属性值
//   console.log(data) // zhllm
//   return data == 'zhllm'
// })
// 自定义关键字
// - validate函数返回一个boolean值，表示验证是否通过
// - validate接受两个参数 关键字后面的值 该属性的值
// ajv.addKeyword('testCustomKeyword', {
//   validate(schema1, data) {
//     console.log(schema1, data) // hhh zhllm // 关键字后面的值 该属性的值
//     return true
//   },
// })
ajv.addKeyword('range', {
  macro: () => {
    return {
      minLength: 7,
    }
  },
})
const schema = {
  type: 'object',
  properties: {
    foo: {
      type: 'string',
      // format: 'testCustomFormat',
      // testCustomKeyword: 'hhh',
    },
    bar: {
      type: 'string',
      minLength: 10,
      errorMessage: {
        type: '这个是不对的',
      },
    },
  },
  // 如果不加required,属性都不是必须的。
  // required: ['foo'],
}

const validate = ajv.compile(schema)

const data = {
  foo: 'zhllm1111',
  bar: 111,
}

const valid = validate(data)
localize.zh(validate.errors)
if (!valid) console.log(validate.errors)
