-- ProxyChecker SDK exists test

local sdk = require("proxy-checker_sdk")

describe("ProxyCheckerSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
