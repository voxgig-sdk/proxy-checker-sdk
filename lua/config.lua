-- ProxyChecker SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "ProxyChecker",
      slug = "proxy-checker",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://proxylab.live/api",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["check"] = {},
        ["ip_information"] = {},
      },
    },
    entity = {
      ["check"] = {
        ["fields"] = {
          {
            ["name"] = "anonymity",
            ["title"] = "Anonymity",
            ["type"] = "`$STRING`",
            ["short"] = "The anonymity level of the proxy",
          },
          {
            ["name"] = "asn",
            ["title"] = "Asn",
            ["type"] = "`$OBJECT`",
            ["short"] = "Autonomous System Number information",
          },
          {
            ["name"] = "geo",
            ["title"] = "Geo",
            ["type"] = "`$OBJECT`",
            ["short"] = "Geographic location information",
          },
          {
            ["name"] = "ip",
            ["title"] = "Ip",
            ["type"] = "`$STRING`",
            ["short"] = "The IP address of the proxy",
          },
          {
            ["name"] = "isp",
            ["title"] = "Isp",
            ["type"] = "`$STRING`",
            ["short"] = "Internet Service Provider name",
          },
          {
            ["name"] = "port",
            ["title"] = "Port",
            ["type"] = "`$INTEGER`",
            ["short"] = "The port number of the proxy",
          },
          {
            ["name"] = "protocol",
            ["title"] = "Protocol",
            ["type"] = "`$STRING`",
            ["short"] = "The protocol type of the proxy",
          },
          {
            ["name"] = "proxy",
            ["title"] = "Proxy",
            ["type"] = "`$STRING`",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "The proxy address that was checked",
          },
          {
            ["name"] = "response_time",
            ["title"] = "Response Time",
            ["type"] = "`$INTEGER`",
            ["short"] = "Response time in milliseconds",
          },
          {
            ["name"] = "rotation",
            ["title"] = "Rotation",
            ["type"] = "`$STRING`",
            ["short"] = "Whether the proxy is static or rotating",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
            ["short"] = "The type of proxy infrastructure",
          },
          {
            ["name"] = "working",
            ["title"] = "Working",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Whether the proxy is working",
          },
        },
        ["name"] = "check",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/check",
                ["segments"] = {
                  {
                    ["lit"] = "check",
                  },
                },
                ["parts"] = {
                  "check",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/check",
                ["segments"] = {
                  {
                    ["lit"] = "check",
                  },
                },
                ["parts"] = {
                  "check",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "proxy",
                      ["orig"] = "proxy",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "1.1.1.1:443",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "proxy",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["ip_information"] = {
        ["fields"] = {
          {
            ["name"] = "ip",
            ["title"] = "Ip",
            ["type"] = "`$STRING`",
            ["short"] = "The IP address of the requesting client",
          },
        },
        ["name"] = "ip_information",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/myip",
                ["segments"] = {
                  {
                    ["lit"] = "myip",
                  },
                },
                ["parts"] = {
                  "myip",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
