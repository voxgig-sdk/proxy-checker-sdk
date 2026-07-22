
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ProxyCheckerSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ProxyCheckerSDK.test()
    equal(null !== testsdk, true)
  })

})
