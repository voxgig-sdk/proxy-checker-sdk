# ProxyChecker SDK configuration

module ProxyCheckerConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "ProxyChecker",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://proxylab.live/api",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "check" => {},
          "ip_information" => {},
        },
      },
      "entity" => {
        "check" => {
          "fields" => [
            {
              "name" => "anonymity",
              "type" => "`$STRING`",
            },
            {
              "name" => "asn",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "geo",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "ip",
              "type" => "`$STRING`",
            },
            {
              "name" => "isp",
              "type" => "`$STRING`",
            },
            {
              "name" => "port",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "protocol",
              "type" => "`$STRING`",
            },
            {
              "name" => "proxy",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "type" => "`$STRING`",
            },
            {
              "name" => "response_time",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "rotation",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "type" => "`$STRING`",
            },
            {
              "name" => "working",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "check",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/check",
                  "parts" => [
                    "check",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "1.1.1.1:443",
                        "kind" => "query",
                        "name" => "proxy",
                        "orig" => "proxy",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/check",
                  "parts" => [
                    "check",
                  ],
                  "select" => {
                    "exist" => [
                      "proxy",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "ip_information" => {
          "fields" => [
            {
              "name" => "ip",
              "type" => "`$STRING`",
            },
          ],
          "name" => "ip_information",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/myip",
                  "parts" => [
                    "myip",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    ProxyCheckerFeatures.make_feature(name)
  end
end
