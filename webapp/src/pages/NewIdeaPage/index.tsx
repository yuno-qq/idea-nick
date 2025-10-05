import { zCreateIdeaTrpcInput } from '@ideanick/backend/src/router/createIdea/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
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
      try {
        await createIdea.mutateAsync(values)
        formik.resetForm()
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
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="description" label="Description" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Text" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {!!submitingError && <Alert color="red">{submitingError}</Alert>}
          {successMessageTimeout && <Alert color="green">Idea created!</Alert>}
          <Button
            onClick={() => {
              setSubmittingError(null)
              setSuccessMessageTimeout(undefined)
              clearTimeout(successMessageTimeout)
            }}
            loading={formik.isSubmitting}
          >
            Create Idea
          </Button>
        </FormItems>
      </form>
    </Segment>
  )
}
