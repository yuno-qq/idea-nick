import { zCreateIdeaTrpcInput } from '@ideanick/backend/src/router/createIdea/input'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { useForm } from '../../lib/form.tsx'
import { withPageWrapper } from '../../lib/pageWrapper.tsx'
import { trpc } from '../../lib/trpc'

export const NewIdeaPage = withPageWrapper({
  authorizedOnly: true,
})(() => {
  const createIdea = trpc.createIdea.useMutation()

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: zCreateIdeaTrpcInput,
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values)
    },
    successMessage: 'Idea created!',
    showValidationAlert: true,
  })

  return (
    <Segment title="New Idea">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="description" label="Description" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Create Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
