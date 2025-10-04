import { initTRPC } from '@trpc/server'

const ideas = [
  {
    nick: 'cool-idia-nick-1',
    name: 'Idea 1',
    description: 'Idea 1 description...',
  },
  {
    nick: 'cool-idia-nick-2',
    name: 'Idea 2',
    description: 'Idea 2 description...',
  },
  {
    nick: 'cool-idia-nick-3',
    name: 'Idea 3',
    description: 'Idea 3 description...',
  },
]

const trpc = initTRPC.create()
const x: string = 'asdad'
console.info(x)

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return { ideas }
  }),
})

export type TrpcRouter = typeof trpcRouter
