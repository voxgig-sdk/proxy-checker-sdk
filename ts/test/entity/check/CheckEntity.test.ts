

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ProxyCheckerSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('CheckEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PROXY_CHECKER_TEST_LIVE=TRUE.
  afterEach(liveDelay('PROXY_CHECKER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ProxyCheckerSDK.test()
    const ent = testsdk.Check()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PROXY_CHECKER_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'check.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"anonymity","req":false,"short":"The anonymity level of the proxy","type":"`$STRING`","index$":0},{"active":true,"name":"asn","req":false,"short":"Autonomous System Number information","type":"`$OBJECT`","index$":1},{"active":true,"name":"geo","req":false,"short":"Geographic location information","type":"`$OBJECT`","index$":2},{"active":true,"name":"ip","req":false,"short":"The IP address of the proxy","type":"`$STRING`","index$":3},{"active":true,"name":"isp","req":false,"short":"Internet Service Provider name","type":"`$STRING`","index$":4},{"active":true,"name":"port","req":false,"short":"The port number of the proxy","type":"`$INTEGER`","index$":5},{"active":true,"name":"protocol","req":false,"short":"The protocol type of the proxy","type":"`$STRING`","index$":6},{"active":true,"name":"proxy","op":{"create":{"req":true,"type":"`$STRING`"}},"req":false,"short":"The proxy address that was checked","type":"`$STRING`","index$":7},{"active":true,"name":"response_time","req":false,"short":"Response time in milliseconds","type":"`$INTEGER`","index$":8},{"active":true,"name":"rotation","req":false,"short":"Whether the proxy is static or rotating","type":"`$STRING`","index$":9},{"active":true,"name":"type","req":false,"short":"The type of proxy infrastructure","type":"`$STRING`","index$":10},{"active":true,"name":"working","req":false,"short":"Whether the proxy is working","type":"`$BOOLEAN`","index$":11}],"name":"check","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /check","json":"{\"operationId\":\"checkProxyPost\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"proxy\":{\"description\":\"Proxy address in format IP:PORT\",\"example\":\"1.1.1.1:443\",\"type\":\"string\"}},\"required\":[\"proxy\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Status and properties of a checked proxy\",\"properties\":{\"anonymity\":{\"description\":\"The anonymity level of the proxy\",\"enum\":[\"transparent\",\"anonymous\",\"elite\"],\"example\":\"elite\",\"type\":\"string\"},\"asn\":{\"description\":\"Autonomous System Number information\",\"properties\":{\"number\":{\"description\":\"ASN number\",\"example\":\"AS13335\",\"type\":\"string\"},\"organization\":{\"description\":\"ASN organization name\",\"example\":\"Cloudflare, Inc.\",\"type\":\"string\"}},\"type\":\"object\"},\"geo\":{\"description\":\"Geographic location information\",\"properties\":{\"city\":{\"description\":\"City name\",\"example\":\"Los Angeles\",\"type\":\"string\"},\"country\":{\"description\":\"Country name\",\"example\":\"United States\",\"type\":\"string\"},\"country_code\":{\"description\":\"ISO country code\",\"example\":\"US\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":34.0522,\"format\":\"float\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":-118.2437,\"format\":\"float\",\"type\":\"number\"},\"region\":{\"description\":\"Region or state\",\"example\":\"California\",\"type\":\"string\"}},\"type\":\"object\"},\"ip\":{\"description\":\"The IP address of the proxy\",\"example\":\"1.1.1.1\",\"type\":\"string\"},\"isp\":{\"description\":\"Internet Service Provider name\",\"example\":\"Cloudflare\",\"type\":\"string\"},\"port\":{\"description\":\"The port number of the proxy\",\"example\":443,\"type\":\"integer\"},\"protocol\":{\"description\":\"The protocol type of the proxy\",\"enum\":[\"HTTP\",\"HTTPS\",\"SOCKS4\",\"SOCKS5\"],\"example\":\"HTTPS\",\"type\":\"string\"},\"proxy\":{\"description\":\"The proxy address that was checked\",\"example\":\"1.1.1.1:443\",\"type\":\"string\"},\"response_time\":{\"description\":\"Response time in milliseconds\",\"example\":150,\"type\":\"integer\"},\"rotation\":{\"description\":\"Whether the proxy is static or rotating\",\"enum\":[\"Static\",\"Rotating\"],\"example\":\"Static\",\"type\":\"string\"},\"type\":{\"description\":\"The type of proxy infrastructure\",\"enum\":[\"Datacenter\",\"Residential\",\"Mobile\"],\"example\":\"Datacenter\",\"type\":\"string\"},\"working\":{\"description\":\"Whether the proxy is working\",\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successfully checked proxy\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Invalid proxy format\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"example\":\"Proxy must be in format IP:PORT\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid proxy format\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Invalid proxy format\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"example\":\"Proxy must be in format IP:PORT\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/check","segments":[{"lit":"check"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"1.1.1.1:443","kind":"query","name":"proxy","orig":"proxy","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /check","json":"{\"operationId\":\"checkProxy\",\"parameters\":[{\"description\":\"Proxy address in format IP:PORT (e.g., 1.1.1.1:443)\",\"in\":\"query\",\"name\":\"proxy\",\"required\":true,\"schema\":{\"example\":\"1.1.1.1:443\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Status and properties of a checked proxy\",\"properties\":{\"anonymity\":{\"description\":\"The anonymity level of the proxy\",\"enum\":[\"transparent\",\"anonymous\",\"elite\"],\"example\":\"elite\",\"type\":\"string\"},\"asn\":{\"description\":\"Autonomous System Number information\",\"properties\":{\"number\":{\"description\":\"ASN number\",\"example\":\"AS13335\",\"type\":\"string\"},\"organization\":{\"description\":\"ASN organization name\",\"example\":\"Cloudflare, Inc.\",\"type\":\"string\"}},\"type\":\"object\"},\"geo\":{\"description\":\"Geographic location information\",\"properties\":{\"city\":{\"description\":\"City name\",\"example\":\"Los Angeles\",\"type\":\"string\"},\"country\":{\"description\":\"Country name\",\"example\":\"United States\",\"type\":\"string\"},\"country_code\":{\"description\":\"ISO country code\",\"example\":\"US\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":34.0522,\"format\":\"float\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":-118.2437,\"format\":\"float\",\"type\":\"number\"},\"region\":{\"description\":\"Region or state\",\"example\":\"California\",\"type\":\"string\"}},\"type\":\"object\"},\"ip\":{\"description\":\"The IP address of the proxy\",\"example\":\"1.1.1.1\",\"type\":\"string\"},\"isp\":{\"description\":\"Internet Service Provider name\",\"example\":\"Cloudflare\",\"type\":\"string\"},\"port\":{\"description\":\"The port number of the proxy\",\"example\":443,\"type\":\"integer\"},\"protocol\":{\"description\":\"The protocol type of the proxy\",\"enum\":[\"HTTP\",\"HTTPS\",\"SOCKS4\",\"SOCKS5\"],\"example\":\"HTTPS\",\"type\":\"string\"},\"proxy\":{\"description\":\"The proxy address that was checked\",\"example\":\"1.1.1.1:443\",\"type\":\"string\"},\"response_time\":{\"description\":\"Response time in milliseconds\",\"example\":150,\"type\":\"integer\"},\"rotation\":{\"description\":\"Whether the proxy is static or rotating\",\"enum\":[\"Static\",\"Rotating\"],\"example\":\"Static\",\"type\":\"string\"},\"type\":{\"description\":\"The type of proxy infrastructure\",\"enum\":[\"Datacenter\",\"Residential\",\"Mobile\"],\"example\":\"Datacenter\",\"type\":\"string\"},\"working\":{\"description\":\"Whether the proxy is working\",\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successfully checked proxy\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Invalid proxy format\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"example\":\"Proxy must be in format IP:PORT\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid proxy format\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Invalid proxy format\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"example\":\"Proxy must be in format IP:PORT\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/check","segments":[{"lit":"check"}],"select":{"exist":["proxy"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"check","name__orig":"check","Name":"Check","name_":"check","name-":"check","NAME":"CHECK","index$":0}, {"active":true,"entity":"check","key$":"BasicCheckFlow","kind":"basic","name":"BasicCheckFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"check_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"check_ref01","srcdatavar":"check_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-check_ref01"}}],"index$":1}]}, 'Check')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const check_ref01_ent = client.Check()
    let check_ref01_data = setup.data.new.check['check_ref01']

    check_ref01_data = (await check_ref01_ent.create(check_ref01_data)).data()
    assert(null != check_ref01_data)


    // LOAD
    const check_ref01_match_dt0: any = {}
    const check_ref01_data_dt0 = (await check_ref01_ent.load(check_ref01_match_dt0)).data()
    assert(null != check_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/check/CheckTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ProxyCheckerSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['check01','check02','check03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PROXY_CHECKER_TEST_CHECK_ENTID': idmap,
    'PROXY_CHECKER_TEST_LIVE': 'FALSE',
    'PROXY_CHECKER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PROXY_CHECKER_TEST_CHECK_ENTID']

  const live = 'TRUE' === env.PROXY_CHECKER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PROXY_CHECKER_TEST_CHECK_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ProxyCheckerSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.PROXY_CHECKER_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
