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
        "slug" => "proxy-checker",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "short" => "The anonymity level of the proxy",
              "type" => "`$STRING`",
            },
            {
              "name" => "asn",
              "short" => "Autonomous System Number information",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "geo",
              "short" => "Geographic location information",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "ip",
              "short" => "The IP address of the proxy",
              "type" => "`$STRING`",
            },
            {
              "name" => "isp",
              "short" => "Internet Service Provider name",
              "type" => "`$STRING`",
            },
            {
              "name" => "port",
              "short" => "The port number of the proxy",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "protocol",
              "short" => "The protocol type of the proxy",
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
              "short" => "The proxy address that was checked",
              "type" => "`$STRING`",
            },
            {
              "name" => "response_time",
              "short" => "Response time in milliseconds",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "rotation",
              "short" => "Whether the proxy is static or rotating",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "short" => "The type of proxy infrastructure",
              "type" => "`$STRING`",
            },
            {
              "name" => "working",
              "short" => "Whether the proxy is working",
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
              "short" => "The IP address of the requesting client",
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
