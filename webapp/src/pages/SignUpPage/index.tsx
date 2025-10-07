import { zSignUpTrpcInput } from '@ideanick/backend/src/router/signUp/input'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { useForm } from '../../lib/form.tsx'
import { getAllIdeasRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useContext()
  const signUp = trpc.signUp.useMutation()

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput
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
      }),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values)
      Cookies.set('token', token, { expires: 99999 })
      void trpcUtils.invalidate()
      navigate(getAllIdeasRoute())
    },
    resetOnSuccess: false,
  })

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="password" label="Password" type="password" formik={formik} />
          <Input name="passwordAgain" label="Password again" type="password" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
