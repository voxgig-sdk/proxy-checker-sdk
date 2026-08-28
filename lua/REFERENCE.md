# ProxyChecker Lua SDK Reference

Complete API reference for the ProxyChecker Lua SDK.


## ProxyCheckerSDK

### Constructor

```lua
local sdk = require("proxy-checker_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Check(data)`

Create a new `Check` entity instance. Pass `nil` for no initial data.

#### `IpInformation(data)`

Create a new `IpInformation` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## CheckEntity

```lua
local check = client:Check(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anonymity` | `string` | No | The anonymity level of the proxy |
| `asn` | `table` | No | Autonomous System Number information |
| `geo` | `table` | No | Geographic location information |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Check():create({
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Check():load({ proxy = "proxy" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CheckEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## IpInformationEntity

```lua
local ip_information = client:IpInformation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | `string` | No | The IP address of the requesting client |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:IpInformation():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IpInformationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
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

