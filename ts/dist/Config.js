"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'ProxyChecker',
        slug: "proxy-checker",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://proxylab.live/api",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            check: {},
            ip_information: {},
        }
    };
    entity = {
        "check": {
            "fields": [
                {
                    "name": "anonymity",
                    "short": "The anonymity level of the proxy",
                    "type": "`$STRING`"
                },
                {
                    "name": "asn",
                    "short": "Autonomous System Number information",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "geo",
                    "short": "Geographic location information",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "ip",
                    "short": "The IP address of the proxy",
                    "type": "`$STRING`"
                },
                {
                    "name": "isp",
                    "short": "Internet Service Provider name",
                    "type": "`$STRING`"
                },
                {
                    "name": "port",
                    "short": "The port number of the proxy",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "protocol",
                    "short": "The protocol type of the proxy",
                    "type": "`$STRING`"
                },
                {
                    "name": "proxy",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The proxy address that was checked",
                    "type": "`$STRING`"
                },
                {
                    "name": "response_time",
                    "short": "Response time in milliseconds",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "rotation",
                    "short": "Whether the proxy is static or rotating",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "short": "The type of proxy infrastructure",
                    "type": "`$STRING`"
                },
                {
                    "name": "working",
                    "short": "Whether the proxy is working",
                    "type": "`$BOOLEAN`"
                }
            ],
            "name": "check",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/check",
                            "segments": [
                                {
                                    "lit": "check"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "check"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "1.1.1.1:443",
                                        "kind": "query",
                                        "name": "proxy",
                                        "orig": "proxy",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/check",
                            "segments": [
                                {
                                    "lit": "check"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "proxy"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "check"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "ip_information": {
            "fields": [
                {
                    "name": "ip",
                    "short": "The IP address of the requesting client",
                    "type": "`$STRING`"
                }
            ],
            "name": "ip_information",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/myip",
                            "segments": [
                                {
                                    "lit": "myip"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "myip"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map