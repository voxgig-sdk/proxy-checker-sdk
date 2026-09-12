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
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
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
            ["short"] = "The anonymity level of the proxy",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "asn",
            ["short"] = "Autonomous System Number information",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "geo",
            ["short"] = "Geographic location information",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "ip",
            ["short"] = "The IP address of the proxy",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "isp",
            ["short"] = "Internet Service Provider name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "port",
            ["short"] = "The port number of the proxy",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "protocol",
            ["short"] = "The protocol type of the proxy",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "proxy",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "The proxy address that was checked",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "response_time",
            ["short"] = "Response time in milliseconds",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "rotation",
            ["short"] = "Whether the proxy is static or rotating",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["short"] = "The type of proxy infrastructure",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "working",
            ["short"] = "Whether the proxy is working",
            ["type"] = "`$BOOLEAN`",
          },
        },
        ["name"] = "check",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/check",
                ["segments"] = {
                  {
                    ["lit"] = "check",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "check",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "1.1.1.1:443",
                      ["kind"] = "query",
                      ["name"] = "proxy",
                      ["orig"] = "proxy",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/check",
                ["segments"] = {
                  {
                    ["lit"] = "check",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "proxy",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "check",
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
            ["short"] = "The IP address of the requesting client",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "ip_information",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/myip",
                ["segments"] = {
                  {
                    ["lit"] = "myip",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "myip",
                },
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
