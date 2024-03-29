import StringField from './fields/StringField.vue'
import SchemaForm from './SchemaForm'
import NumberField from './fields/NumberField.vue'
import ObjectField from './fields/ObjectField'
import ArrayField from './fields/ArrayField'
import FormSelect from './components/FormSelect'
import ThemeProvider from './theme'

export * from './types'

export default SchemaForm

export {
  NumberField,
  ObjectField,
  ArrayField,
  StringField,
  FormSelect,
  ThemeProvider,
}
