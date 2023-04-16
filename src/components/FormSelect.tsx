import { PropType, defineComponent, ref, watch } from 'vue'

import { widthWidget } from '@/lib/theme-default/FormItemWrapper'
import { formSelectProps } from '@/lib'

// 显示指定组件类型，推断的类型会有问题，在赋值的时候
const FormSelect = widthWidget(
  defineComponent({
    name: 'FormSelect',
    props: formSelectProps,
    setup(props) {
      return () => {
        return <div>aaaaa</div>
      }
    },
  }),
)

export default FormSelect
