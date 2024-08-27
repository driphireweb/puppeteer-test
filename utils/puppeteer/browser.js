import treeKill from 'tree-kill'

import puppeteer from 'puppeteer-extra'
import { loadPlugins } from './plugins'

process.setMaxListeners(Infinity)

export const start = async config => {
  await loadPlugins(puppeteer)

  try {
    const browser = await puppeteer.launch({
      ...config,
      ignoreHTTPSErrors: true,
    })
    return browser
  } catch (error) {
    throw new Error(error)
  }
}

export const close = async browser => {
  if (!browser) {
    return
  }

  const browserProcessPid = browser.process().pid

  if (!browserProcessPid) {
    return
  }

  try {
    await browser.close()

    console.info(`Killing browser process pid: ${browserProcessPid}...`)

    await new Promise((resolve, reject) => {
      treeKill(browserProcessPid, 'SIGKILL', error => {
        if (error) {
          reject(`Failed to kill browser process pid: ${browserProcessPid}`)
        } else {
          console.info(
            `Killed browser pid: ${browserProcessPid}. Closed browser.`,
          )
          resolve()
        }
      })
    })
  } catch (error) {
    throw new Error(error)
  }
}
