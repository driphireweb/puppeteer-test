import config, { start, close } from '~/utils/puppeteer'
import createPage from '~/utils/puppeteer/page'

export default async (req, res) => {
  let browser

  try {
    browser = await start(await config())
    const page = await createPage(browser)

    await page.goto('https://google.com/', { waitUntil: 'domcontentloaded' })

    await page.screenshot({ path: './screenshot.png' })

    res.sendStatus(200)
  } catch (error) {
    res.status(500).send(`Failed to run puppeteer test: ${error}`)
  } finally {
    if (browser) {
      await close(browser)
    }
  }
}
