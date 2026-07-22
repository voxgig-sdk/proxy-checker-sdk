# ProxyChecker SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ProxyCheckerUtility.registrar = ->(u) {
  u.clean = ProxyCheckerUtilities::Clean
  u.done = ProxyCheckerUtilities::Done
  u.make_error = ProxyCheckerUtilities::MakeError
  u.feature_add = ProxyCheckerUtilities::FeatureAdd
  u.feature_hook = ProxyCheckerUtilities::FeatureHook
  u.feature_init = ProxyCheckerUtilities::FeatureInit
  u.fetcher = ProxyCheckerUtilities::Fetcher
  u.make_fetch_def = ProxyCheckerUtilities::MakeFetchDef
  u.make_context = ProxyCheckerUtilities::MakeContext
  u.make_options = ProxyCheckerUtilities::MakeOptions
  u.make_request = ProxyCheckerUtilities::MakeRequest
  u.make_response = ProxyCheckerUtilities::MakeResponse
  u.make_result = ProxyCheckerUtilities::MakeResult
  u.make_point = ProxyCheckerUtilities::MakePoint
  u.make_spec = ProxyCheckerUtilities::MakeSpec
  u.make_url = ProxyCheckerUtilities::MakeUrl
  u.param = ProxyCheckerUtilities::Param
  u.prepare_auth = ProxyCheckerUtilities::PrepareAuth
  u.prepare_body = ProxyCheckerUtilities::PrepareBody
  u.prepare_headers = ProxyCheckerUtilities::PrepareHeaders
  u.prepare_method = ProxyCheckerUtilities::PrepareMethod
  u.prepare_params = ProxyCheckerUtilities::PrepareParams
  u.prepare_path = ProxyCheckerUtilities::PreparePath
  u.prepare_query = ProxyCheckerUtilities::PrepareQuery
  u.result_basic = ProxyCheckerUtilities::ResultBasic
  u.result_body = ProxyCheckerUtilities::ResultBody
  u.result_headers = ProxyCheckerUtilities::ResultHeaders
  u.transform_request = ProxyCheckerUtilities::TransformRequest
  u.transform_response = ProxyCheckerUtilities::TransformResponse
}
