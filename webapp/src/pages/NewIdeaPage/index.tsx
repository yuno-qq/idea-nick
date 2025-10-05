import { zCreateIdeaTrpcInput } from '@ideanick/backend/src/lib/router/createIdea/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { trpc } from '../../lib/trpc'

export const NewIdeaPage = () => {
  const [successMessageTimeout, setSuccessMessageTimeout] = useState<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )
  const [submitingError, setSubmittingError] = useState<string | null>(null)
  const createIdea = trpc.createIdea.useMutation()

  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(zCreateIdeaTrpcInput),
    onSubmit: async (values) => {
      setSubmittingError(null)
      try {
        await createIdea.mutateAsync(values)
        // formik.resetForm();
        clearTimeout(successMessageTimeout)
        setSuccessMessageTimeout(
          setTimeout(() => {
            setSuccessMessageTimeout(undefined)
          }, 3000)
        )
      } catch (error: any) {
        setSubmittingError(error.message)
      }
    },
  })

  return (
    <Segment title="New Idea">
      <form onSubmit={formik.handleSubmit}>
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        {!!submitingError && <div style={{ color: 'red' }}>{submitingError}</div>}
        {successMessageTimeout && <div style={{ color: 'green' }}>Idea created!</div>}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Create Idea'}
        </button>
      </form>
    </Segment>
  )
}
