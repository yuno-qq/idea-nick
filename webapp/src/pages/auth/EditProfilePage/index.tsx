import type { TrpcRouterOutput } from '@ideanick/backend/src/router'
import { zUpdatePasswordTrpcInput } from '@ideanick/backend/src/router/auth/updatePassword/input'
import { zUpdateProfileTrpcInput } from '@ideanick/backend/src/router/auth/updateProfile/input'
import { z } from 'zod'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { useForm } from '../../../lib/form.tsx'
import { withPageWrapper } from '../../../lib/pageWrapper.tsx'
import { trpc } from '../../../lib/trpc.tsx'

const General = ({ me }: { me: NonNullable<TrpcRouterOutput['getMe']['me']> }) => {
  const trpcUtils = trpc.useContext()
  const updateProfile = trpc.updateProfile.useMutation()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      name: me.name,
      nick: me.nick,
    },
    validationSchema: zUpdateProfileTrpcInput,
    onSubmit: async (values) => {
      const updatedMe = await updateProfile.mutateAsync(values)
      trpcUtils.getMe.setData(undefined, { me: updatedMe })
    },
    successMessage: 'Profile updated',
    resetOnSuccess: false,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="name" label="Name" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Profile</Button>
      </FormItems>
    </form>
  )
}

const Password = () => {
  const updatePassword = trpc.updatePassword.useMutation()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: zUpdatePasswordTrpcInput
      .extend({
        newPasswordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.newPassword !== val.newPasswordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password must be the same',
            path: ['newPasswordAgain'],
          })
        }
      }),
    onSubmit: async ({ oldPassword, newPassword }) => {
      await updatePassword.mutateAsync({ newPassword, oldPassword })
    },
    successMessage: 'Password updated',
    resetOnSuccess: true,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input name="oldPassword" label="Old password" type="password" formik={formik} />
        <Input name="newPassword" label="New password" type="password" formik={formik} />
        <Input name="newPasswordAgain" label="New password again" type="password" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Profile</Button>
      </FormItems>
    </form>
  )
}

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ getAuthorizedMe }) => ({
    me: getAuthorizedMe(),
  }),
  title: 'Edit Profile',
})(({ me }) => {
  return (
    <Segment title="Edit Profile">
      <Segment title="General" size={2}>
        <General me={me} />
      </Segment>
      <Segment title="Password" size={2}>
        <Password />
      </Segment>
    </Segment>
  )
})
