import { zNickRequired } from '@ideanick/shared/src/zod'
import { z } from 'zod'

export const zUpdateProfileTrpcInput = z.object({
  name: z.string().max(50).default(''),
  nick: zNickRequired,
})
