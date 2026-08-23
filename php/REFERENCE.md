# ProxyChecker PHP SDK Reference

Complete API reference for the ProxyChecker PHP SDK.


## ProxyCheckerSDK

### Constructor

```php
require_once __DIR__ . '/proxychecker_sdk.php';

$client = new ProxyCheckerSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ProxyCheckerSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = ProxyCheckerSDK::test();
```


### Instance Methods

#### `Check($data = null)`

Create a new `CheckEntity` instance. Pass `null` for no initial data.

#### `IpInformation($data = null)`

Create a new `IpInformationEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): ProxyCheckerUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## CheckEntity

```php
$check = $client->Check();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anonymity` | `string` | No | The anonymity level of the proxy |
| `asn` | `array` | No | Autonomous System Number information |
| `geo` | `array` | No | Geographic location information |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Check()->create([
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Check()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CheckEntity`

Create a new `CheckEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IpInformationEntity

```php
$ip_information = $client->IpInformation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | `string` | No | The IP address of the requesting client |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->IpInformation()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IpInformationEntity`

Create a new `IpInformationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new ProxyCheckerSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

