import { z } from 'zod'

export const zUpdateProfileTrpcInput = z.object({
  name: z.string().max(50).default(''),
  nick: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
})
