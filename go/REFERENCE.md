# ProxyChecker Golang SDK Reference

Complete API reference for the ProxyChecker Golang SDK.


## ProxyCheckerSDK

### Constructor

```go
func NewProxyCheckerSDK(options map[string]any) *ProxyCheckerSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *ProxyCheckerSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *ProxyCheckerSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Check(data map[string]any) ProxyCheckerEntity`

Create a new `Check` entity instance. Pass `nil` for no initial data.

#### `IpInformation(data map[string]any) ProxyCheckerEntity`

Create a new `IpInformation` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## CheckEntity

```go
check := client.Check(nil)
fmt.Println(check.GetName()) // "check"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anonymity` | `string` | No | The anonymity level of the proxy |
| `asn` | `map[string]any` | No | Autonomous System Number information |
| `geo` | `map[string]any` | No | Geographic location information |
| `ip` | `string` | No | The IP address of the proxy |
| `isp` | `string` | No | Internet Service Provider name |
| `port` | `int` | No | The port number of the proxy |
| `protocol` | `string` | No | The protocol type of the proxy |
| `proxy` | `string` | No | The proxy address that was checked |
| `response_time` | `int` | No | Response time in milliseconds |
| `rotation` | `string` | No | Whether the proxy is static or rotating |
| `type` | `string` | No | The type of proxy infrastructure |
| `working` | `bool` | No | Whether the proxy is working |

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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Check(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Check(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CheckEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IpInformationEntity

```go
ipInformation := client.IpInformation(nil)
fmt.Println(ipInformation.GetName()) // "ip_information"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | `string` | No | The IP address of the requesting client |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.IpInformation(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IpInformationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewProxyCheckerSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

