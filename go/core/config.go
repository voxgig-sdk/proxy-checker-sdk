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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
						"short": "The anonymity level of the proxy",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "asn",
						"short": "Autonomous System Number information",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "geo",
						"short": "Geographic location information",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "ip",
						"short": "The IP address of the proxy",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isp",
						"short": "Internet Service Provider name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "port",
						"short": "The port number of the proxy",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "protocol",
						"short": "The protocol type of the proxy",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "proxy",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The proxy address that was checked",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "response_time",
						"short": "Response time in milliseconds",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rotation",
						"short": "Whether the proxy is static or rotating",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "The type of proxy infrastructure",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "working",
						"short": "Whether the proxy is working",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "check",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/check",
								"segments": []any{
									map[string]any{
										"lit": "check",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"check",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "1.1.1.1:443",
											"kind": "query",
											"name": "proxy",
											"orig": "proxy",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/check",
								"segments": []any{
									map[string]any{
										"lit": "check",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"proxy",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"check",
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
						"short": "The IP address of the requesting client",
						"type": "`$STRING`",
					},
				},
				"name": "ip_information",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/myip",
								"segments": []any{
									map[string]any{
										"lit": "myip",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"myip",
								},
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
