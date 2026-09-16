<?php
declare(strict_types=1);

// ProxyChecker SDK configuration

class ProxyCheckerConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "ProxyChecker",
                "slug" => "proxy-checker",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://proxylab.live/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "check" => [],
                    "ip_information" => [],
                ],
            ],
            "entity" => [
        'check' => [
          'fields' => [
            [
              'name' => 'anonymity',
              'short' => 'The anonymity level of the proxy',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'asn',
              'short' => 'Autonomous System Number information',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'geo',
              'short' => 'Geographic location information',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'ip',
              'short' => 'The IP address of the proxy',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'isp',
              'short' => 'Internet Service Provider name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'port',
              'short' => 'The port number of the proxy',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'protocol',
              'short' => 'The protocol type of the proxy',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'proxy',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'The proxy address that was checked',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'response_time',
              'short' => 'Response time in milliseconds',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'rotation',
              'short' => 'Whether the proxy is static or rotating',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'short' => 'The type of proxy infrastructure',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'working',
              'short' => 'Whether the proxy is working',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'check',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/check',
                  'segments' => [
                    [
                      'lit' => 'check',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'check',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '1.1.1.1:443',
                        'kind' => 'query',
                        'name' => 'proxy',
                        'orig' => 'proxy',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/check',
                  'segments' => [
                    [
                      'lit' => 'check',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'proxy',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'check',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'ip_information' => [
          'fields' => [
            [
              'name' => 'ip',
              'short' => 'The IP address of the requesting client',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'ip_information',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/myip',
                  'segments' => [
                    [
                      'lit' => 'myip',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'myip',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return ProxyCheckerFeatures::make_feature($name);
    }
}
