# ProxyChecker Ruby SDK Reference

Complete API reference for the ProxyChecker Ruby SDK.


## ProxyCheckerSDK

### Constructor

```ruby
require_relative 'ProxyChecker_sdk'

client = ProxyCheckerSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ProxyCheckerSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = ProxyCheckerSDK.test
```


### Instance Methods

#### `Check(data = nil)`

Create a new `Check` entity instance. Pass `nil` for no initial data.

#### `IpInformation(data = nil)`

Create a new `IpInformation` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## CheckEntity

```ruby
check = client.Check
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anonymity` | `String` | No | The anonymity level of the proxy |
| `asn` | `Hash` | No | Autonomous System Number information |
| `geo` | `Hash` | No | Geographic location information |
| `ip` | `String` | No | The IP address of the proxy |
| `isp` | `String` | No | Internet Service Provider name |
| `port` | `Integer` | No | The port number of the proxy |
| `protocol` | `String` | No | The protocol type of the proxy |
| `proxy` | `String` | No | The proxy address that was checked |
| `response_time` | `Integer` | No | Response time in milliseconds |
| `rotation` | `String` | No | Whether the proxy is static or rotating |
| `type` | `String` | No | The type of proxy infrastructure |
| `working` | `Boolean` | No | Whether the proxy is working |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Check.create({
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Check.load({ "proxy" => "proxy" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CheckEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IpInformationEntity

```ruby
ip_information = client.IpInformation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | `String` | No | The IP address of the requesting client |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.IpInformation.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IpInformationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = ProxyCheckerSDK.new({
  "feature" => {
    "test" => { "active" => true },
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

