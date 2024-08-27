import express from 'express'
import cors from 'cors'
import timeout from 'connect-timeout'

import puppeteerTest from './scrapers/test/handler'

const onTimeout = (req, res, next) => {
  if (!req.timedout) next()
}

const app = express()
app.use(timeout(28800000))
app.use(onTimeout)

app.use(cors({ origin: true }))
app.use(express.json({ strict: false, limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))

app.post('/', puppeteerTest)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.info(`Server listening on port ${PORT}`)
})

export default app
