# ProxyChecker SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ProxyCheckerFeatures
  def self.make_feature(name)
    case name
    when "base"
      ProxyCheckerBaseFeature.new
    when "ratelimit"
      ProxyCheckerRatelimitFeature.new
    when "retry"
      ProxyCheckerRetryFeature.new
    when "test"
      ProxyCheckerTestFeature.new
    when "timeout"
      ProxyCheckerTimeoutFeature.new
    else
      ProxyCheckerBaseFeature.new
    end
  end
end
