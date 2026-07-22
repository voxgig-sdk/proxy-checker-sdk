# ProxyChecker SDK exists test

require "minitest/autorun"
require_relative "../ProxyChecker_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ProxyCheckerSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
