# ProxyChecker TypeScript SDK Reference

Complete API reference for the ProxyChecker TypeScript SDK.


## ProxyCheckerSDK

### Constructor

```ts
new ProxyCheckerSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ProxyCheckerSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = ProxyCheckerSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `ProxyCheckerSDK` instance in test mode.


### Instance Methods

#### `Check(data?: object)`

Create a new `Check` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CheckEntity` instance.

#### `IpInformation(data?: object)`

Create a new `IpInformation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IpInformationEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `ProxyCheckerSDK.test()`.

**Returns:** `ProxyCheckerSDK` instance in test mode.


---

## CheckEntity

```ts
const check = client.Check()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anonymity` | `string` | No | The anonymity level of the proxy |
| `asn` | `Record<string, any>` | No | Autonomous System Number information |
| `geo` | `Record<string, any>` | No | Geographic location information |
| `ip` | `string` | No | The IP address of the proxy |
| `isp` | `string` | No | Internet Service Provider name |
| `port` | `number` | No | The port number of the proxy |
| `protocol` | `string` | No | The protocol type of the proxy |
| `proxy` | `string` | No | The proxy address that was checked |
| `response_time` | `number` | No | Response time in milliseconds |
| `rotation` | `string` | No | Whether the proxy is static or rotating |
| `type` | `string` | No | The type of proxy infrastructure |
| `working` | `boolean` | No | Whether the proxy is working |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `anonymity` | - | - |
| `asn` | - | - |
| `geo` | - | - |
| `ip` | - | - |
| `isp` | - | - |
| `port` | - | - |
| `protocol` | - | - |
| `proxy` | - | Yes |
| `response_time` | - | - |
| `rotation` | - | - |
| `type` | - | - |
| `working` | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Check().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Check().load({ proxy: 'proxy' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CheckEntity` instance with the same client and
options.

#### `client()`

Return the parent `ProxyCheckerSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IpInformationEntity

```ts
const ip_information = client.IpInformation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | `string` | No | The IP address of the requesting client |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.IpInformation().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IpInformationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ProxyCheckerSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new ProxyCheckerSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

