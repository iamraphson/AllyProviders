/*
 * Adonis Ally Provider - Bitbucket
 *
 * (c) Ayeni Olusegun <nsegun5@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const test = require('japa')
const qs = require('querystring')
const Bitbucket = require('../src/Bitbucket/provider')

test.group('Bitbucket Drivers', function () {
  test('should throw an exception when config has not been defined', function (assert) {
    const bitbucket = () => new Bitbucket({get: function () { return null }})
    assert.throw(bitbucket, 'E_MISSING_CONFIG: bitbucket is not defined inside config/services.js file')
  })

  test('should throw an exception when clientid is missing', function (assert) {
    const bitbucket = () => new Bitbucket({get: function () { return {clientSecret: '1', redirectUri: '2'} }})
    assert.throw(bitbucket, 'E_MISSING_CONFIG: bitbucket is not defined inside config/services.js file')
  })

  test('should throw an exception when clientSecret is missing', function (assert) {
    const bitbucket = () => new Bitbucket({get: function () { return {clientId: '1', redirectUri: '2'} }})
    assert.throw(bitbucket, 'E_MISSING_CONFIG: bitbucket is not defined inside config/services.js file')
  })

  test('should throw an exception when redirectUri is missing', function (assert) {
    const bitbucket = () => new Bitbucket({get: function () { return {clientId: '1', clientSecret: '2'} }})
    assert.throw(bitbucket, 'E_MISSING_CONFIG: bitbucket is not defined inside config/services.js file')
  })

  test('should generate the redirect_uri with correct signature', async function (assert) {
    const config = {
      get: function () {
        return {
          clientId: 123456789,
          clientSecret: 'sjkhdjhjhJhjwhjwhjJjejhieKJ',
          redirectUri: 'http://localhost'
        }
      }
    }
    const bitbucket = new Bitbucket(config)
    const redirectUrl = qs.escape(config.get().redirectUri)
    const providerUrl = `https://bitbucket.org/site/oauth2/authorize?redirect_uri=${redirectUrl}&scope=${encodeURIComponent('account email')}&response_type=code&client_id=${config.get().clientId}`
    const redirectToUrl = await bitbucket.getRedirectUrl()
    assert.equal(redirectToUrl, providerUrl)
  })
})
