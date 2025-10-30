import { zSignUpTrpcInput } from '@ideanick/backend/src/router/auth/signUp/input'
import { zPasswordsMustBeTheSame, zStringRequired } from '@ideanick/shared/src/zod'
import Cookies from 'js-cookie'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { useForm } from '../../../lib/form.tsx'
import { withPageWrapper } from '../../../lib/pageWrapper.tsx'
import { trpc } from '../../../lib/trpc.tsx'

export const SignUpPage = withPageWrapper({
  redirectAuthorized: true,
  title: 'Sign Up',
})(() => {
  const trpcUtils = trpc.useContext()
  const signUp = trpc.signUp.useMutation()

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: '',
      email: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput
      .extend({
        passwordAgain: zStringRequired,
      })
      .superRefine(zPasswordsMustBeTheSame('password', 'passwordAgain')),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values)
      Cookies.set('token', token, { expires: 99999 })
      void trpcUtils.invalidate()
    },
    resetOnSuccess: false,
  })

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="email" label="E-mail" formik={formik} />
          <Input name="password" label="Password" type="password" formik={formik} />
          <Input name="passwordAgain" label="Password again" type="password" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
