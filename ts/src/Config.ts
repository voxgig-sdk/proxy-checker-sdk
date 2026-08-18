
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProxyChecker',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://proxylab.live/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      check: {
      },

      ip_information: {
      },

    }
  }


  entity = {
    "check": {
      "fields": [
        {
          "name": "anonymity",
          "type": "`$STRING`"
        },
        {
          "name": "asn",
          "type": "`$OBJECT`"
        },
        {
          "name": "geo",
          "type": "`$OBJECT`"
        },
        {
          "name": "ip",
          "type": "`$STRING`"
        },
        {
          "name": "isp",
          "type": "`$STRING`"
        },
        {
          "name": "port",
          "type": "`$INTEGER`"
        },
        {
          "name": "protocol",
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
          "type": "`$STRING`"
        },
        {
          "name": "response_time",
          "type": "`$INTEGER`"
        },
        {
          "name": "rotation",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "type": "`$STRING`"
        },
        {
          "name": "working",
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
              "parts": [
                "check"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "check"
              ],
              "select": {
                "exist": [
                  "proxy"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "myip"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

