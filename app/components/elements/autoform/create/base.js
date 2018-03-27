import {map} from 'wasmuth'
import toCamelCase from 'to-camel-case'
import {Form, Input, SubmitButton, Field} from '/components/elements/form'

const IGNORE_TYPES = [
  'tomany-table',
  'manytomany-lists',
  'checkbox',
  'datetime'
]

const FIELD_FOR_TYPE = {
  text: ({formName, schema}) =>
    <Field>
      <Input name={toCamelCase(schema.key)} formName={formName} />
    </Field>
}

const getField = ({type}) => {
  const field = FIELD_FOR_TYPE[type]
  if (!IGNORE_TYPES.includes(type)) {
    return
  }
  if (!field) {
    console.warn(`No field for type ${type}`)
    return
  }
  return field
}

export const Create = ({schema, form}) =>
  !!form &&
    <Form {...form} >
      {map(
        f => {
          const field = getField(f)
          if (field) return field({schema: f, formName: form.name})
        },
        schema
      )}
      <SubmitButton>create</SubmitButton>
    </Form>

export default Create
