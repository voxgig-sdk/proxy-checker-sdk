package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "ProxyChecker",
			"slug": "proxy-checker",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://proxylab.live/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"check": map[string]any{},
				"ip_information": map[string]any{},
			},
		},
		"entity": map[string]any{
			"check": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "anonymity",
						"title": "Anonymity",
						"type": "`$STRING`",
						"short": "The anonymity level of the proxy",
					},
					map[string]any{
						"name": "asn",
						"title": "Asn",
						"type": "`$OBJECT`",
						"short": "Autonomous System Number information",
					},
					map[string]any{
						"name": "geo",
						"title": "Geo",
						"type": "`$OBJECT`",
						"short": "Geographic location information",
					},
					map[string]any{
						"name": "ip",
						"title": "Ip",
						"type": "`$STRING`",
						"short": "The IP address of the proxy",
					},
					map[string]any{
						"name": "isp",
						"title": "Isp",
						"type": "`$STRING`",
						"short": "Internet Service Provider name",
					},
					map[string]any{
						"name": "port",
						"title": "Port",
						"type": "`$INTEGER`",
						"short": "The port number of the proxy",
					},
					map[string]any{
						"name": "protocol",
						"title": "Protocol",
						"type": "`$STRING`",
						"short": "The protocol type of the proxy",
					},
					map[string]any{
						"name": "proxy",
						"title": "Proxy",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The proxy address that was checked",
					},
					map[string]any{
						"name": "response_time",
						"title": "Response Time",
						"type": "`$INTEGER`",
						"short": "Response time in milliseconds",
					},
					map[string]any{
						"name": "rotation",
						"title": "Rotation",
						"type": "`$STRING`",
						"short": "Whether the proxy is static or rotating",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "The type of proxy infrastructure",
					},
					map[string]any{
						"name": "working",
						"title": "Working",
						"type": "`$BOOLEAN`",
						"short": "Whether the proxy is working",
					},
				},
				"name": "check",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/check",
								"segments": []any{
									map[string]any{
										"lit": "check",
									},
								},
								"parts": []any{
									"check",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/check",
								"segments": []any{
									map[string]any{
										"lit": "check",
									},
								},
								"parts": []any{
									"check",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "proxy",
											"orig": "proxy",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "1.1.1.1:443",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"proxy",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ip_information": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ip",
						"title": "Ip",
						"type": "`$STRING`",
						"short": "The IP address of the requesting client",
					},
				},
				"name": "ip_information",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/myip",
								"segments": []any{
									map[string]any{
										"lit": "myip",
									},
								},
								"parts": []any{
									"myip",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
