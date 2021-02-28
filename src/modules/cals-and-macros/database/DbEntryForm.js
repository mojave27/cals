import React from 'react'
import { Formik, Field, Form } from 'formik'
import styles from './Form.module.css'

const fields = [
  { value: 'description', placeholder:'' },
  { value: 'quantity', placeholder:''},
  { value: 'unit', placeholder:''},
  { value: 'calories', placeholder:''},
  { value: 'proteinGrams', placeholder:''},
  { value: 'carbGrams', placeholder:''},
  { value: 'fatGrams', placeholder:''}
]

const DbEntryForm = props => {
  
  return (
    <div>
    <Formik
      initialValues={{
        description: '',
        quantity: 1,
        unit: 'grams',
        calories: 0,
        proteinGrams: 0,
        carbGrams: 0,
        fatGrams: 0,
      }}
      onSubmit={async values => {
        await new Promise(r => setTimeout(r, 500));
        props.onSubmit(values)
      }}
    >
      <Form className={styles.form}>
      {/* <Form > */}
        {fields.map( (field,index) => {
          return (
            <React.Fragment key={`${field}-${index}`}>
              <label htmlFor={field.value}>{field.value}</label>
              <Field id={field.value} name={field.value} placeholder={field.placeholder} />
            </React.Fragment>
          )
        })}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
    </div>
  )
}

export default DbEntryForm
