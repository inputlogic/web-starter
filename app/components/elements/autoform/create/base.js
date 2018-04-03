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
  number: ({formName, schema}) => {
    return <Field>
      <Input name={toCamelCase(schema.key)} formName={formName} type='number' />
    </Field>
  },
  email: ({formName, schema}) => {
    return <Field>
      <Input name={toCamelCase(schema.key)} formName={formName} type='email' />
    </Field>
  },
  text: ({formName, schema}) => {
    const type = schema.key.toLowerCase().includes('password') ? 'password' : 'text'
    return <Field>
      <Input name={toCamelCase(schema.key)} formName={formName} type={type} />
    </Field>
  }
}

const getField = ({type}) => {
  const field = FIELD_FOR_TYPE[type]
  if (IGNORE_TYPES.includes(type)) {
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
          if (!f.readOnly) {
            const field = getField(f)
            if (field) return field({schema: f, formName: form.name})
          }
        },
        schema
      )}
      <SubmitButton>create</SubmitButton>
    </Form>

export default Create
