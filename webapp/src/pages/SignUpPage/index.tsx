import { zSignUpTrpcInput } from '@ideanick/backend/src/router/signUp/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { z } from 'zod'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { trpc } from '../../lib/trpc'

export const SignUpPage = () => {
  const [successMessageTimeout, setSuccessMessageTimeout] = useState<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signUp = trpc.signUp.useMutation()

  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(
      zSignUpTrpcInput
        .extend({
          passwordAgain: z.string().min(1),
        })
        .superRefine((values, ctx) => {
          if (values.password !== values.passwordAgain) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Password must be a same',
              path: ['passwordAgain'],
            })
          }
        })
    ),
    onSubmit: async (values) => {
      try {
        await signUp.mutateAsync(values)
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
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="password" label="Password" type="password" formik={formik} />
          <Input name="passwordAgain" label="Password again" type="password" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMessageTimeout && <Alert color="green">Thanks for sign up!</Alert>}
          <Button
            onClick={() => {
              setSubmittingError(null)
              setSuccessMessageTimeout(undefined)
              clearTimeout(successMessageTimeout)
            }}
            loading={formik.isSubmitting}
          >
            Sign Up
          </Button>
        </FormItems>
      </form>
    </Segment>
  )
}
