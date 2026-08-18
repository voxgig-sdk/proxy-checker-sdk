-- ProxyChecker SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "ProxyChecker",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "asn",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "geo",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "ip",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "isp",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "port",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "protocol",
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "response_time",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "rotation",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "working",
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
                ["parts"] = {
                  "check",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
                ["parts"] = {
                  "check",
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
                ["parts"] = {
                  "myip",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
