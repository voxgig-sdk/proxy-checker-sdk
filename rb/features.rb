# ProxyChecker SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ProxyCheckerFeatures
  def self.make_feature(name)
    case name
    when "base"
      ProxyCheckerBaseFeature.new
    when "test"
      ProxyCheckerTestFeature.new
    else
      ProxyCheckerBaseFeature.new
    end
  end
end
