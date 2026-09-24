

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"anonymity":{"a":true,"h":"Anonymity","n":"anonymity","r":false,"sh":"The anonymity level of the proxy","t":"`$STRING`","key$":"anonymity","index$":0},"asn":{"a":true,"h":"Asn","n":"asn","r":false,"sh":"Autonomous System Number information","t":"`$OBJECT`","key$":"asn","index$":1},"geo":{"a":true,"h":"Geo","n":"geo","r":false,"sh":"Geographic location information","t":"`$OBJECT`","key$":"geo","index$":2},"ip":{"a":true,"h":"Ip","n":"ip","r":false,"sh":"The IP address of the proxy","t":"`$STRING`","key$":"ip","index$":3},"isp":{"a":true,"h":"Isp","n":"isp","r":false,"sh":"Internet Service Provider name","t":"`$STRING`","key$":"isp","index$":4},"port":{"a":true,"h":"Port","n":"port","r":false,"sh":"The port number of the proxy","t":"`$INTEGER`","key$":"port","index$":5},"protocol":{"a":true,"h":"Protocol","n":"protocol","r":false,"sh":"The protocol type of the proxy","t":"`$STRING`","key$":"protocol","index$":6},"proxy":{"a":true,"h":"Proxy","n":"proxy","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The proxy address that was checked","t":"`$STRING`","key$":"proxy","index$":7},"response_time":{"a":true,"h":"Response Time","n":"response_time","r":false,"sh":"Response time in milliseconds","t":"`$INTEGER`","key$":"response_time","index$":8},"rotation":{"a":true,"h":"Rotation","n":"rotation","r":false,"sh":"Whether the proxy is static or rotating","t":"`$STRING`","key$":"rotation","index$":9},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"The type of proxy infrastructure","t":"`$STRING`","key$":"type","index$":10},"working":{"a":true,"h":"Working","n":"working","r":false,"sh":"Whether the proxy is working","t":"`$BOOLEAN`","key$":"working","index$":11}},"name":"check","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /check","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/check","q":{},"r":{},"s":[{"lit":"check"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /check","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"1.1.1.1:443","k":"query","n":"proxy","or":"proxy","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/check","q":{"exist":["proxy"]},"r":{},"s":[{"lit":"check"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"check","name__orig":"check","Name":"Check","name_":"check","name-":"check","NAME":"CHECK","index$":0}, {"active":true,"entity":"check","key$":"BasicCheckFlow","kind":"basic","name":"BasicCheckFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"check_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"check_ref01","srcdatavar":"check_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-check_ref01"}}],"index$":1}]}, 'Check', {"POST /check":{"protocol":"http","operationId":"checkProxyPost","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["proxy"],"properties":{"proxy":{"type":"string","description":"Proxy address in format IP:PORT","example":"1.1.1.1:443","key$":"proxy"}},"index$":1}}}},"responses":{"200":{"description":"Successfully checked proxy","content":{"application/json":{"schema":{"type":"object","description":"Status and properties of a checked proxy","properties":{"proxy":{"description":"The proxy address that was checked","example":"1.1.1.1:443","key$":"proxy","type":"string"},"working":{"description":"Whether the proxy is working","example":true,"key$":"working","type":"boolean"},"ip":{"description":"The IP address of the proxy","example":"1.1.1.1","key$":"ip","type":"string"},"port":{"description":"The port number of the proxy","example":443,"key$":"port","type":"integer"},"protocol":{"description":"The protocol type of the proxy","enum":["HTTP","HTTPS","SOCKS4","SOCKS5"],"example":"HTTPS","key$":"protocol","type":"string"},"anonymity":{"description":"The anonymity level of the proxy","enum":["transparent","anonymous","elite"],"example":"elite","key$":"anonymity","type":"string"},"type":{"description":"The type of proxy infrastructure","enum":["Datacenter","Residential","Mobile"],"example":"Datacenter","key$":"type","type":"string"},"rotation":{"description":"Whether the proxy is static or rotating","enum":["Static","Rotating"],"example":"Static","key$":"rotation","type":"string"},"geo":{"description":"Geographic location information","key$":"geo","properties":{"city":{"description":"City name","example":"Los Angeles","type":"string"},"country":{"description":"Country name","example":"United States","type":"string"},"country_code":{"description":"ISO country code","example":"US","type":"string"},"latitude":{"description":"Latitude coordinate","example":34.0522,"format":"float","type":"number"},"longitude":{"description":"Longitude coordinate","example":-118.2437,"format":"float","type":"number"},"region":{"description":"Region or state","example":"California","type":"string"}},"type":"object"},"asn":{"description":"Autonomous System Number information","key$":"asn","properties":{"number":{"description":"ASN number","example":"AS13335","type":"string"},"organization":{"description":"ASN organization name","example":"Cloudflare, Inc.","type":"string"}},"type":"object"},"isp":{"description":"Internet Service Provider name","example":"Cloudflare","key$":"isp","type":"string"},"response_time":{"description":"Response time in milliseconds","example":150,"key$":"response_time","type":"integer"}},"x-ref":"#/components/schemas/ProxyStatus","index$":0}}}},"400":{"description":"Bad request - invalid proxy format","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"error":{"type":"string","description":"Error message","example":"Invalid proxy format"},"message":{"type":"string","description":"Detailed error description","example":"Proxy must be in format IP:PORT"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"error":{"type":"string","description":"Error message","example":"Invalid proxy format"},"message":{"type":"string","description":"Detailed error description","example":"Proxy must be in format IP:PORT"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /check":{"protocol":"http","operationId":"checkProxy","responses":{"200":{"description":"Successfully checked proxy","content":{"application/json":{"schema":{"type":"object","description":"Status and properties of a checked proxy","properties":{"proxy":{"description":"The proxy address that was checked","example":"1.1.1.1:443","key$":"proxy","type":"string"},"working":{"description":"Whether the proxy is working","example":true,"key$":"working","type":"boolean"},"ip":{"description":"The IP address of the proxy","example":"1.1.1.1","key$":"ip","type":"string"},"port":{"description":"The port number of the proxy","example":443,"key$":"port","type":"integer"},"protocol":{"description":"The protocol type of the proxy","enum":["HTTP","HTTPS","SOCKS4","SOCKS5"],"example":"HTTPS","key$":"protocol","type":"string"},"anonymity":{"description":"The anonymity level of the proxy","enum":["transparent","anonymous","elite"],"example":"elite","key$":"anonymity","type":"string"},"type":{"description":"The type of proxy infrastructure","enum":["Datacenter","Residential","Mobile"],"example":"Datacenter","key$":"type","type":"string"},"rotation":{"description":"Whether the proxy is static or rotating","enum":["Static","Rotating"],"example":"Static","key$":"rotation","type":"string"},"geo":{"description":"Geographic location information","key$":"geo","properties":{"city":{"description":"City name","example":"Los Angeles","type":"string"},"country":{"description":"Country name","example":"United States","type":"string"},"country_code":{"description":"ISO country code","example":"US","type":"string"},"latitude":{"description":"Latitude coordinate","example":34.0522,"format":"float","type":"number"},"longitude":{"description":"Longitude coordinate","example":-118.2437,"format":"float","type":"number"},"region":{"description":"Region or state","example":"California","type":"string"}},"type":"object"},"asn":{"description":"Autonomous System Number information","key$":"asn","properties":{"number":{"description":"ASN number","example":"AS13335","type":"string"},"organization":{"description":"ASN organization name","example":"Cloudflare, Inc.","type":"string"}},"type":"object"},"isp":{"description":"Internet Service Provider name","example":"Cloudflare","key$":"isp","type":"string"},"response_time":{"description":"Response time in milliseconds","example":150,"key$":"response_time","type":"integer"}},"x-ref":"#/components/schemas/ProxyStatus","index$":0}}}},"400":{"description":"Bad request - invalid proxy format","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"error":{"type":"string","description":"Error message","example":"Invalid proxy format"},"message":{"type":"string","description":"Detailed error description","example":"Proxy must be in format IP:PORT"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"error":{"type":"string","description":"Error message","example":"Invalid proxy format"},"message":{"type":"string","description":"Detailed error description","example":"Proxy must be in format IP:PORT"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"proxy","in":"query","description":"Proxy address in format IP:PORT (e.g., 1.1.1.1:443)","required":true,"schema":{"type":"string","example":"1.1.1.1:443"},"index$":0}],"securitySource":"unspecified"}})
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
  
