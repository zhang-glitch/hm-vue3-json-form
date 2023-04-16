import FormPassword from '@/components/FormPassword'
import FormSelect from '@/components/FormSelect'

export default {
  name: 'ObjectTest',
  schema: {
    type: 'object',
    properties: {
      objectName: {
        title: 'objectName',
        type: 'string',
        minLength: 10,
      },
      objectAge: {
        title: 'objectAge',
        type: 'number',
      },
      multipleType: {
        type: 'array',
        items: [
          {
            title: 'multipleTypeSchllo1',
            type: 'string',
          },
          {
            title: 'multipleTypeSchllo2',
            type: 'string',
          },
        ],
      },
      pets: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            arrayMultipleName: {
              type: 'string',
              minLength: 5,
              title: 'arrayMultipleName',
            },
            arrayMultipleAge: {
              type: 'number',
              title: 'arrayMultipleAge',
            },
          },
        },
      },
      friends: {
        type: 'array',
        items: {
          type: 'number',
          title: 'arrayMultipleEnum',
          enum: ['llm', 'jcl', 'ly', 'zxh'],
        },
      },
      isWorker: {
        type: 'boolean',
      },
    },
    required: ['name', 'age'],
  },
  uiSchema: {
    properties: {
      // 多选表单，自定义widget component
      friends: {
        widget: FormSelect,
      },
      // 单类型渲染
      pets: {
        items: {
          properties: {
            arrayMultipleName: {
              widget: FormPassword,
            },
          },
        },
      },
      // 多类型渲染
      multipleType: {
        items: [
          {
            widget: FormPassword,
          },
          {
            widget: FormSelect,
          },
        ],
      },
    },
    // properties: {
    //   pass1: {
    //     widget: FormPassword,
    //   },
    //   pass2: {
    //     style: {
    //       color: 'red',
    //     },
    //   },
    // },
  },
  default: {
    pets: [{ name: 'zh', age: 20 }],
  },
}
