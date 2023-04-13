export default {
  name: 'ObjectTest',
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      age: {
        type: 'number',
      },
      pets: {
        type: 'array',
        // items: [
        //   {
        //     type: 'string',
        //   },
        //   {
        //     type: 'number',
        //   },
        // ],

        // items: {
        //   type: 'string',
        // },

        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            age: {
              type: 'number',
            },
          },
        },
      },
      friends: {
        type: 'array',
        items: {
          type: 'object',
          enum: ['llm', 'jcl', 'ly', 'zxh'],
        },
      },
      isWorker: {
        type: 'boolean',
      },
    },
    required: ['name', 'age'],
  },
  uiSchema: {},
  default: {
    pets: [{ name: 'zh', age: 20 }],
  },
}
