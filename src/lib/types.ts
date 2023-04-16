// 定义一些类型
import { DefineComponent, PropType } from 'vue'
import { ErrorSchema } from './validator'
// import FormSelect from './components/FormSelect'

// 定义枚举，外部也能用到
export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean',
}

// type Schema = any
type SchemaRef = {
  $refs: string
}

export interface Schema {
  // 方便后续使用，直接传入一个类型字符串也行
  type?: SchemaTypes | string
  const?: any
  format?: string

  title?: string
  default?: any
  //  | { $ref: string }
  properties?: {
    [key: string]: Schema
  }
  items?: Schema | Schema[] | SchemaRef
  uniqueItems?: any
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef
  }
  oneOf?: Schema[]
  anyOf?: Schema[]
  allOf?: Schema[]
  // vjsf?: VueJsonSchemaConfig
  required?: string[]
  enum?: any[]
  enumNames?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  additionalItems?: Schema

  minLength?: number
  maxLength?: number
  minimun?: number
  maximum?: number
  multipleOf?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
}

// export interface UISchemaNest {
//   [property: string]: UISchema
// }

export type UISchema = {
  widget?: string | CommonComponentType
  properties?: {
    [key: string]: UISchema
  }
  // 如果是 {type: "array", items: [{type: "string"}, {type: "number"}]}怎么办
  items?: UISchema | UISchema[]
} & {
  [key: string]: string
}

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

export const formSelectProps = {
  ...commonComponentProps,
  options: {
    type: Array as PropType<{ key: string; value: any }[]>,
    required: true,
  },
} as const

// type FormSelectType = InstanceType<typeof FormSelect>
export type FormSelectType = DefineComponent<typeof formSelectProps>
export type CommonComponentType = DefineComponent<typeof commonComponentProps>

export enum FormSelectEnum {
  FormSelect = 'FormSelect',
}

export enum CommonComponentEnum {
  FormText = 'FormText',
  FormNumber = 'FormNumber',
}
export interface Theme {
  // 定义的一些叶子节点组件
  widgets: {
    [FormSelectEnum.FormSelect]: FormSelectType
    [CommonComponentEnum.FormText]: CommonComponentType
    [CommonComponentEnum.FormNumber]: CommonComponentType
  }
}
