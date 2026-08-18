# ProxyChecker SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "type": "`$STRING`",
          },
          {
            "name": "asn",
            "type": "`$OBJECT`",
          },
          {
            "name": "geo",
            "type": "`$OBJECT`",
          },
          {
            "name": "ip",
            "type": "`$STRING`",
          },
          {
            "name": "isp",
            "type": "`$STRING`",
          },
          {
            "name": "port",
            "type": "`$INTEGER`",
          },
          {
            "name": "protocol",
            "type": "`$STRING`",
          },
          {
            "name": "proxy",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "type": "`$STRING`",
          },
          {
            "name": "response_time",
            "type": "`$INTEGER`",
          },
          {
            "name": "rotation",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
          {
            "name": "working",
            "type": "`$BOOLEAN`",
          },
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
                "parts": [
                  "check",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/check",
                "parts": [
                  "check",
                ],
                "select": {
                  "exist": [
                    "proxy",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$STRING`",
          },
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
                "parts": [
                  "myip",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
