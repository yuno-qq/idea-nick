import { type Idea } from '@prisma/client'
import { type AppContext } from '../lib/ctx'

export const notifyAboutMostLikedIdeas = async (ctx: AppContext) => {
  const mostLikedIdeas = await ctx.prisma.$queryRaw<
    Array<Pick<Idea, 'id' | 'name' | 'nick'> & { thisMonthLikesCount: number }>
  >`
    with "topIdeas" as (
      select id, nick, name, (
        select count(*)::int from "IdeaLike" il
        where il."ideaId" = i."id"
        and il."createdAt" > now() - interval '1 month'
      ) as "thisMonthLikesCount"
    from "Idea" i
    where i."blockedAt" is null
    order by "thisMonthLikesCount" desc
    limit 10
    )
    select *
    from "topIdeas"
    where "thisMonthLikesCount" > 0
  `

  console.info(mostLikedIdeas)
}
