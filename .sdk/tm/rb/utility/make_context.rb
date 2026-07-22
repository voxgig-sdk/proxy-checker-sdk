# ProxyChecker SDK utility: make_context
require_relative '../core/context'
module ProxyCheckerUtilities
  MakeContext = ->(ctxmap, basectx) {
    ProxyCheckerContext.new(ctxmap, basectx)
  }
end
