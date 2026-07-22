-- ProxyChecker SDK error

local ProxyCheckerError = {}
ProxyCheckerError.__index = ProxyCheckerError


function ProxyCheckerError.new(code, msg, ctx)
  local self = setmetatable({}, ProxyCheckerError)
  self.is_sdk_error = true
  self.sdk = "ProxyChecker"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ProxyCheckerError:error()
  return self.msg
end


function ProxyCheckerError:__tostring()
  return self.msg
end


return ProxyCheckerError
