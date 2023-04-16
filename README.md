# hm-vue3-json-form

## project catalogue

- `components` 通用组件库

- `demos` schema 测试测试

- `lib` 项目代码

  - `fields` 根据schema type分类的field组件
  - `theme-default` 默认主题
    - `FormItemWrapper` 提供一个组件，合并label, error，并提供一个HOC统一处理不同的Widget叶子组件。
  - `context` 全局context,为下文组件提供SchemaFormItem等，防止循环引用。
  - `SchemaForm` 暴露的组件，入口组件
  - `SchemaFormItem` 过度组件，主要是整合 fields 定义的组件
  - `theme` 提供ThemeProvider组件，分发不同得默认widget叶子组件, 并提供一个getWidget函数获取不同的widget叶子组件供field组件使用
  - `types` 类型定义 （props, interface schema）
  - `utils` 工具函数
  - `validator` ajv的schema校验

- `App` demo 测试封装组件
- `tests` 单元测试

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# 项目总结
## 项目初始化
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b9f6a5183ec497aa0ee30064df81c4c~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acaa43c775254ccf94013dc6b89005df~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f791acf2ff0431d9afeaf622ba0587e~tplv-k3u1fbpfcp-watermark.image?)

**typescript本身可以编译jsx语法，但是是基于react的jsx编译的。对于vue中，我们需要使用babel的插件来处理。**
## 前置知识
- 提取props时，我们只有将该对象设置为只读的，ts中的props才可以被识别为必须的。通过`as const`实现。
```js
    // field组件的props类型
    export const fieldPropTypes = {
      schema: {
        type: Object as PropType<Schema>,
        required: true,
      },
      // value没有类型限制，只限制必传
      value: {
        required: true,
      },
      onChange: {
        type: Function as PropType<(v: any) => void>,
        required: true,
      },
      rootSchema: {
        type: Object as PropType<Schema>,
        required: true,
      },
      errorSchema: {
        type: Object as PropType<ErrorSchema>,
        required: true,
      },
      uiSchema: {
        type: Object as PropType<UISchema>,
        required: true,
      },
    } as const
```
- h函数就是对createVNode简单封装。参数传递的判断。

- [vue中使用jsx，安装`babel-plugin-jsx`插件](https://github.com/vuejs/babel-plugin-jsx)
```js
npm install @vue/babel-plugin-jsx -D
```
- provide中提供的内容会被继承，通过`Object.create`来创建原型对象，然后再添加。
- `ExtractPropTypes<typeof props>`该泛型类型可以根据传入的props对象，返回指定的类型别名。
```js
    props?: ExtractPropTypes<typeof fieldPropTypes>
```
- 获取一个组件类型，通过`DefineComponent`去解决。或者[直接通过`InstanceType<typeof 组件>`获取](https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-template-refs)，这个方式返回的类型定义过于详细，不方便我们对组件的赋值。如果是获取组件中的内容，可以使用，如果是对于组件赋值，我们还是需要使用`DefineComponent`去解决。
```js
// components通用props类型
export const commonComponentProps = {
  value: {
    required: true,
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  errors: {
    type: Array as PropType<string[]>,
  },
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  uiSchemaOptions: {
    type: Object as PropType<{ [key: string]: any }>,
  },
} as const

export type CommonComponentType = DefineComponent<typeof commonComponentProps>
```
获取组件内容，可以使用`InstanceType`去定义。
```js
// 提供SchemaFormRef
    const schemaFormRef = ref<InstanceType<typeof SchemaForm>>()
    // 验证，内部就是调用ajv.validate函数处理的。
    const handleValidate = async () => {
      if (!schemaFormRef.value) return
      const validateRes = await schemaFormRef.value.$.exposed!.onValidate()
      console.log('validateRes', validateRes)
    }
```
- 判断循环引用

让项目中的循环应用可以做出提示，我们可以使用`circular-dependency-plugin`插件实现。
```js
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  chainWebpack(config) {
    config.plugin('circular').use(new CircularDependencyPlugin())
  },
}
```
- 给props规定具体的类型.`PropType<>`泛型别名。
```js
    actionAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
```
- ts获取值报错时，我们可以给他断言成`any`，再取值。
```js
    options={(schemaItems as any).enum}
```
- 通过ref引用组件中setup中内容，我们需要先暴露出引用的内容。
   - [vue sfc中直接通过`defineExpose`](https://cn.vuejs.org/api/sfc-script-setup.html#defineexpose)
   ```js
   <script setup> 
       import { ref } from 'vue' 
       const a = 1 
       const b = ref(2) 
       defineExpose({ a, b }) 
   </script>
   ```
   - [vue中的jsx，通过export暴露](https://blog.csdn.net/qq_18470967/article/details/127906391?ydreferer=aHR0cHM6Ly9jbi5iaW5nLmNvbS8%3D)
   ```js
   // 子组件，name = Test
    async setup(props, { expose }) {
      const onValidate = () => {
        console.log('我是子组件暴露给父组件的方法')
      }
      // 核心
      expose({ onValidate })
      return () => (
        <>
          <div>我是子组件</div>
        </>
      )
    }
    
    // 父组件获取
    const schemaFormRef = ref()
    schemaFormRef.value.$.exposed!.onValidate()
   ```
## 前置技术
### json-schema
[json-schema介绍](http://json-schema.org/), json-schema定义规范。

### ajv
[ajv校验json数据格式](https://ajv.js.org/),主要是校验传入的数据是否符合定义的json-schema。
```js
    const Ajv = require('ajv')
    const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

    const schema = {
      type: 'object',
      properties: {
        foo: { type: 'string', minLength: 2 },
        bar: { type: 'string' },
      },
      // 如果不加required,属性都不是必须的。
      // required: ['foo'],
      additionalProperties: false,
    }

    const validate = ajv.compile(schema)

    const data = {
      foo: '11',
      // bar: 'abc',
    }

    const valid = validate(data)
    if (!valid) console.log(validate.errors)
```
format只针对string，number类型。如果想要自定义format，ajv也提供了[`addFormat`api](https://ajv.js.org/guide/formats.html#user-defined-formats)。
```js
    const Ajv = require('ajv')
    const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
    // 自定义format
    ajv.addFormat('testCustomFormat', (data) => {
      // data就是当前定义的属性值
      console.log(data) // zhllm
      return data == 'zhllm'
    })
    const schema = {
      type: 'object',
      properties: {
        foo: { type: 'string', minLength: 2, format: 'testCustomFormat' },
        bar: { type: 'string' },
      },
      // 如果不加required,属性都不是必须的。
      // required: ['foo'],
      additionalProperties: false,
    }

    const validate = ajv.compile(schema)

    const data = {
      foo: 'zhllm',
      // bar: 'abc',
    }

    const valid = validate(data)
    if (!valid) console.log(validate.errors)
```
规范中定义的只是那些普遍的关键字，如果我们需要定制，我们也可以使用ajv提供的[`addKeyword`api](https://ajv.js.org/keywords.html#common-attributes-of-keyword-definitions)来自定义关键字。

定义关键字的方法有很多种，这里我们介绍两种有用的。
- validate
```js
    const Ajv = require('ajv')
    const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
    ajv.addFormat('testCustomFormat', (data) => {
      // data就是当前定义的属性值
      console.log(data) // zhllm
      return data == 'zhllm'
    })
    // 自定义关键字
    // - validate函数返回一个boolean值，表示验证是否通过
    // - validate接受两个参数 关键字后面的值 该属性的值
    ajv.addKeyword('testCustomKeyword', {
      validate(schema1, data) {
        console.log(schema1, data) // hhh zhllm // 关键字后面的值 该属性的值
        return true
      },
    })
    const schema = {
      type: 'object',
      properties: {
        foo: {
          type: 'string',
          format: 'testCustomFormat',
          testCustomKeyword: 'hhh',
        },
        bar: { type: 'string' },
      },
      // 如果不加required,属性都不是必须的。
      // required: ['foo'],
    }

    const validate = ajv.compile(schema)

    const data = {
      foo: 'zhllm',
      // bar: 'abc',
    }

    const valid = validate(data)
    if (!valid) console.log(validate.errors)
```
- macro,这个函数返回的内容，都会被加入到使用这个关键字的schema中。
```js
    ajv.addKeyword('range', {
      macro: () => {
        return {
          minLength: 7,
        }
      },
    })
```
### ajv-i18n
[ajv-i18n](https://ajv.js.org/packages/ajv-i18n.html) 该库的作用是错误提示语言转化的。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6eb5d9b90dca46d0a54f2c42eee661ca~tplv-k3u1fbpfcp-watermark.image?)
### ajv-errors
[ajv-errors](https://ajv.js.org/packages/ajv-errors.html) 该库的作用是自定义错误信息。
## 组件编写
### 定义props
- schema
- value
- onChange
- uiSchema
- locale
- errorSchema

### schema

json schema 对象，用来定义数据，同时也是我们定义表单的依据

### value

表单的数据结果，你可以从外部改变这个 value，在表单被编辑的时候，会通过`onChange`透出 value

需要注意的是，因为 vue 使用的是可变数据，如果每次数据变化我们都去改变`value`的对象地址，那么会导致整个表单都需要重新渲染，这会导致性能降低。 从实践中来看，我们传入的对象，在内部修改其 field 的值基本不会有什么副作用，所以我们会使用这种方式来进行实现。也就是说，如果`value`是一个对象， 那么从`JsonSchemaForm`内部修改的值，并不会改变`value`对象本身。我们仍然会触发`onChange`，因为可能在表单变化之后，使用者需要进行一些操作。

### onChange

在表单值有任何变化的时候会触发该回调方法，并把新的值进行返回

### locale

语言，使用`ajv-i18n`指定错误信息使用的语言

### uiSchema

对表单的展现进行一些定制，其类型如下：

```
export type UISchema = {
  widget?: string | CommonComponentType
  properties?: {
    [key: string]: UISchema
  }
  items?: UISchema | UISchema[]
} & {
  [key: string]: string
}
```
## errorSchema
做schema和data校验的，在SchemaForm中提个全部的校验错误对象，向下传递。每个data属性，如果有错误，他将在该属性中加入一个`__error`属性，让其在叶子组件中展示错误。
```js
    interface ErrorSchemaObject {
      [level: string]: ErrorSchema
    }
    /**
     * 就是根据valueForm数据，如果该项有错误，就在内部加上__errors
     * {
     *  obj: {
     *    a: {
     *      ...,
     *      __errors: []
     *    }
     *  }
     * }
     */
    export type ErrorSchema = ErrorSchemaObject & {
      __errors?: string[]
    }
```
## 安装依赖
```js
    vue-jss jss jss-preset-default // 基于vue3的css in js
    ajv ajv-errors ajv ajv-i18n // 基于jsonschema的库
    @vue/babel-plugin-jsx // 在vue3中使用jsx
    monaco-editor // vscode同款编辑器
    
    vue upgrade // 升级版本
```
## 难点理解
- 每个组件onChange触发，对于string, number这种单类型的schema，他们更新的都是单独的data属性，对于Object,Array schema来说，他们onChange更新的都是完整的data。
- 当我们未指定组件类型的时候，可能传入的组件类型会不匹配，我们可以手动通过`DefineComponent`来定义组件类型。让推断的组件类型和自定义的组件类型相同。
- 当我们传递props时，vue会进行合并，将相同的属性合并为一起。
```js
    <FormText {props} onChange={handleChange} /> // props中的onChange将会变成一个数组，存放两个onChange函数
```
这样就会使我们得到意想不到的props结果，我们可以通过babel插件去关闭它。**注意这是在使用jsx语法的前提下，使用sfc单文件时不行的。**
```js
// babel.config.js
    module.exports = {
      presets: ['@vue/cli-plugin-babel/preset'],
      plugins: [['@vue/babel-plugin-jsx', { mergeProps: false }]],
    }
```
- 对于多组件共同使用一个父组件，我们可以将其抽离，写成HOC形式，来达到解耦。
## 单元测试
vue-test-utils
- describe 套件
- test, it 单元测试方法
- 断言 expect
- beforeEach,afterEach,beforeAll,afterAll都有作用域，在describe中单独作用于每个套件的测试方法。该钩子的作用主要是重置一些变量，让每次测试都是初始化后的。
- 异步测试。
    - 调用done方法
    - 返回一个promise

```js
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
```
## 校验
我们是点击校验按钮进行校验的。在SchemaForm中进行schema与data的校验，然后会去到没有schema的校验错误向下传递。最后到达叶子节点进行展示。
## 大致设计流程

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/618e6115cfdc4583abc46f6f7825bcf9~tplv-k3u1fbpfcp-watermark.image?)
## 最后
[github地址](https://github.com/zhang-glitch/hm-vue3-json-form/tree/master)

[完整版1](https://github.com/Jokcy/vjsf-imooc)

[完整版2](https://github.com/cwy007/vue3-json-schema-form)

作者：Spirited_Away
链接：https://juejin.cn/post/7222499585036681272