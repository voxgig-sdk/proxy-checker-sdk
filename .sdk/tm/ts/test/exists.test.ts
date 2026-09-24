
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ProxyCheckerSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ProxyCheckerSDK.test()
    equal(testsdk instanceof ProxyCheckerSDK, true,
      'ProxyCheckerSDK.test() must return a client synchronously')
  })

})
