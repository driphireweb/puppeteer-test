import { isDev } from '~/config'
import getBlockedHosts from './hosts'
import { getHostname } from './util'

import { USERAGENT, NORD_PROXY_SCRAPE_TYPES } from '~/constants'
import UserAgent from 'user-agents'

export default async (browser, newTab = false) => {
  if (!browser) {
    throw new Error('Browser not set.')
  }

  const blockedResources = [
    'image',
    'media',
    'font',
    'texttrack',
    'object',
    'beacon',
    'csp_report',
    'imageset',
  ]

  try {
    const page = await browser.newPage()

    if (!newTab) {
      const firstPage = (await browser.pages())[0]
      await firstPage.close()
    }

    const session = await page.target().createCDPSession()
    await page.setBypassCSP(true)
    await session.send('Page.enable')
    await session.send('Page.setWebLifecycleState', {
      state: 'active',
    })

    console.info(
      `Blocking the following resources: ${blockedResources.join(', ')}`,
    )

    const blockedHosts = getBlockedHosts()
    const blockedResourcesByHost = ['script', 'xhr', 'fetch', 'document']

    console.info(
      `Should block scripts from ${
        Object.keys(blockedHosts).length
      } unwanted hosts to speed up the crawling.`,
    )

    await page.setRequestInterception(true)

    page.on('request', req => {
      if (blockedResources.includes(req.resourceType())) {
        return req.abort()
      }

      const hostname = getHostname(req.url())

      if (
        blockedResourcesByHost.includes(req.resourceType()) &&
        hostname &&
        blockedHosts[hostname] === true
      ) {
        console.info(`${req.resourceType()}: ${hostname}: ${req.url()}`)
        return req.abort()
      }

      return req.continue()
    })

    if (isDev) {
      page.on('console', async msg => {
        const msgArgs = msg.args()

        await Promise.all([
          msgArgs.map(async arg => console.info(await arg.jsonValue())),
        ])
      })
    }

    let userAgent
    let viewportWidth, viewportHeight

    if (NORD_PROXY_SCRAPE_TYPES.includes(process.env.SCRAPE_TYPE)) {
      userAgent = USERAGENT
    } else {
      const randomUserAgent = new UserAgent({ deviceCategory: 'desktop' })
      viewportWidth = randomUserAgent.data.screenWidth
      viewportHeight = randomUserAgent.data.screenHeight

      userAgent = randomUserAgent.toString()
    }

    await page.setUserAgent(userAgent)

    console.log(userAgent)
    console.log(viewportWidth, viewportHeight)

    await page.setViewport({
      width: viewportWidth || 1200,
      height: viewportHeight || 720,
    })

    return page
  } catch (error) {
    console.info('An error occurred during page setup.')
    console.error(error.message)

    throw error
  }
}
