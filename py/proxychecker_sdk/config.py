# ProxyChecker SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "ProxyChecker",
            "slug": "proxy-checker",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://proxylab.live/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "check": {},
                "ip_information": {},
            },
        },
        "entity": {
      "check": {
        "fields": [
          {
            "name": "anonymity",
            "title": "Anonymity",
            "type": "`$STRING`",
            "short": "The anonymity level of the proxy",
          },
          {
            "name": "asn",
            "title": "Asn",
            "type": "`$OBJECT`",
            "short": "Autonomous System Number information",
          },
          {
            "name": "geo",
            "title": "Geo",
            "type": "`$OBJECT`",
            "short": "Geographic location information",
          },
          {
            "name": "ip",
            "title": "Ip",
            "type": "`$STRING`",
            "short": "The IP address of the proxy",
          },
          {
            "name": "isp",
            "title": "Isp",
            "type": "`$STRING`",
            "short": "Internet Service Provider name",
          },
          {
            "name": "port",
            "title": "Port",
            "type": "`$INTEGER`",
            "short": "The port number of the proxy",
          },
          {
            "name": "protocol",
            "title": "Protocol",
            "type": "`$STRING`",
            "short": "The protocol type of the proxy",
          },
          {
            "name": "proxy",
            "title": "Proxy",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "The proxy address that was checked",
          },
          {
            "name": "response_time",
            "title": "Response Time",
            "type": "`$INTEGER`",
            "short": "Response time in milliseconds",
          },
          {
            "name": "rotation",
            "title": "Rotation",
            "type": "`$STRING`",
            "short": "Whether the proxy is static or rotating",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "short": "The type of proxy infrastructure",
          },
          {
            "name": "working",
            "title": "Working",
            "type": "`$BOOLEAN`",
            "short": "Whether the proxy is working",
          },
        ],
        "name": "check",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/check",
                "segments": [
                  {
                    "lit": "check",
                  },
                ],
                "parts": [
                  "check",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/check",
                "segments": [
                  {
                    "lit": "check",
                  },
                ],
                "parts": [
                  "check",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "proxy",
                      "orig": "proxy",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "1.1.1.1:443",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "proxy",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "ip_information": {
        "fields": [
          {
            "name": "ip",
            "title": "Ip",
            "type": "`$STRING`",
            "short": "The IP address of the requesting client",
          },
        ],
        "name": "ip_information",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/myip",
                "segments": [
                  {
                    "lit": "myip",
                  },
                ],
                "parts": [
                  "myip",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
