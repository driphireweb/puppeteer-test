/* eslint-disable */

export const delayWithTimeout = async ms =>
  new Promise(resolve => setTimeout(resolve, ms))

export const isElementVisible = async (page, selector) => {
  let visible = true

  try {
    await page.waitForXPath(selector, { visible: true, timeout: 1000 })
  } catch (error) {
    visible = false
  }

  return visible
}

export const setViewport = page =>
  page.setViewport({
    width: 1440,
    height: 680,
    deviceScaleFactor: 1,
  })

export const autoScroll = async page =>
  await page.evaluate(
    async () =>
      await new Promise(resolve => {
        let totalHeight = 0
        let distance = 100

        const timer = setInterval(() => {
          let scrollHeight = document.body.scrollHeight

          window.scrollBy(0, distance)
          totalHeight += distance

          if (totalHeight >= scrollHeight - window.innerHeight) {
            clearInterval(timer)
            resolve(totalHeight)
          }
        }, 100)
      }),
  )

export const waitForAttributeChange = async (
  page,
  selector,
  attr,
  opts = { polling: 'mutation', timeout: 3000 },
) => {
  const el = await page.waitForSelector(selector)
  const originalAttr = await el.evaluate((el, attr) => el[attr], attr)

  return page.waitForFunction(
    (el, originalAttr) => el[attr] !== originalAttr,
    opts,
    el,
    originalAttr,
  )
}