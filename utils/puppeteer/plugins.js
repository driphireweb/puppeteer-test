import Stealthplugin from 'puppeteer-extra-plugin-stealth'
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha'

export const loadPlugins = puppeteer =>
  new Promise(resolve => {
    puppeteer.use(Stealthplugin())
    puppeteer.use(
      RecaptchaPlugin({
        provider: { id: '2captcha', token: process.env.RECAPTCHA_API_KEY },
        visualFeedback: true,
      }),
    )
    resolve()
  })
