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
