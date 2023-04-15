import { Schema, ThemeProvider } from '@/lib'
import theme from '@/lib/theme-default'
import { PropType, defineComponent } from 'vue'
import SchemaForm from '@/lib'

export default defineComponent({
  name: 'TestComponent',
  props: {
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
  },
  setup(props) {
    return () => {
      return (
        <ThemeProvider theme={theme as any}>
          <SchemaForm {...props} />
        </ThemeProvider>
      )
    }
  },
})
