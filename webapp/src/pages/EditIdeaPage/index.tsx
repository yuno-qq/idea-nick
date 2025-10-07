import type { TrpcRouterOutput } from '@ideanick/backend/src/router'
import { zUpdateIdeaTrpcInput } from '@ideanick/backend/src/router/updateIdea/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import _ from 'lodash'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { type EditIdeaRouteParams, getViewIdeaRoute } from '../../lib/routes.ts'
import { trpc } from '../../lib/trpc.tsx'

const EditIdeaComponent = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const updateIdea = trpc.updateIdea.useMutation()
  const formik = useFormik({
    initialValues: _.pick(idea, ['name', 'description', 'text', 'nick']),
    validate: withZodSchema(zUpdateIdeaTrpcInput.omit({ ideaId: true })),
    onSubmit: async (values) => {
      try {
        await updateIdea.mutateAsync({ ideaId: idea.id, ...values })
        navigate(getViewIdeaRoute({ ideaNick: values.nick }))
      } catch (error: any) {
        setSubmittingError(error.message)
      }
    },
  })

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="description" label="Description" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Text" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button
            onClick={() => {
              setSubmittingError(null)
            }}
            loading={formik.isSubmitting}
          >
            Update Idea
          </Button>
        </FormItems>
      </form>
    </Segment>
  )
}

export const EditIdeaPage = () => {
  const { ideaNick } = useParams() as EditIdeaRouteParams

  const getIdeaResult = trpc.getIdea.useQuery({
    ideaNick,
  })

  const getMeResult = trpc.getMe.useQuery()

  if (getIdeaResult.isLoading || getIdeaResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  const idea = getIdeaResult.data.idea
  const me = getMeResult.data.me

  if (!idea) {
    return <span>Idea not found</span>
  }

  if (!me) {
    return <span>Only for authorized</span>
  }

  if (me.id !== idea.authorId) {
    return <span>An idea can only be edited by the author</span>
  }

  return <EditIdeaComponent idea={idea} />
}
