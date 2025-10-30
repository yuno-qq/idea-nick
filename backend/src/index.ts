import cors from 'cors'
import { debug } from 'debug'
import express from 'express'
import { applyCron } from './lib/cron'
import { type AppContext, createAppContext } from './lib/ctx'
import { env } from './lib/env'
import { logger } from './lib/logger'
import { applyPassportToExpressApp } from './lib/passport'
import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'
import { presetDb } from './scripts/presetDb'

let ctx: AppContext | null = null

void (async () => {
  try {
    debug.enable(env.DEBUG)
    ctx = createAppContext()
    await presetDb(ctx)
    const expressApp = express()
    expressApp.use(cors())

    applyPassportToExpressApp(expressApp, ctx)
    applyTrpcToExpressApp(expressApp, ctx, trpcRouter)
    applyCron(ctx)

    expressApp.listen(env.PORT, () => {
      logger.info('express', `Listening at http://localhost:${env.PORT}`)
    })
  } catch (error) {
    logger.error('express', error)
    await ctx?.stop()
  }
})()
