import blockedHostsList from './blocked-hosts'

export default () => {
  const blockedHostsArray = blockedHostsList.split('\n')

  let blockedHostsObject = blockedHostsArray.reduce((prev, curr) => {
    const frags = curr.split(' ')

    if (frags.length > 1 && frags[0] === '0.0.0.0') {
      prev[frags[1].trim()] = true
    }

    return prev
  }, {})

  blockedHostsObject = {
    ...blockedHostsObject,
    'static.chartbeat.com': true,
    'scdn.cxense.com': true,
    'api.cxense.com': true,
    'www.googletagmanager.com': true,
    'connect.facebook.net': true,
    'platform.twitter.com': true,
    'tags.tiqcdn.com': true,
    'dev.visualwebsiteoptimizer.com': true,
    'smartlock.google.com': true,
    'cdn.embedly.com': true,
  }

  return blockedHostsObject
}
