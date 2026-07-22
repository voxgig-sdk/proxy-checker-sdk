package voxgigproxycheckersdk

import (
	"github.com/voxgig-sdk/proxy-checker-sdk/go/core"
	"github.com/voxgig-sdk/proxy-checker-sdk/go/entity"
	"github.com/voxgig-sdk/proxy-checker-sdk/go/feature"
	_ "github.com/voxgig-sdk/proxy-checker-sdk/go/utility"
)

// Type aliases preserve external API.
type ProxyCheckerSDK = core.ProxyCheckerSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ProxyCheckerEntity = core.ProxyCheckerEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ProxyCheckerError = core.ProxyCheckerError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCheckEntityFunc = func(client *core.ProxyCheckerSDK, entopts map[string]any) core.ProxyCheckerEntity {
		return entity.NewCheckEntity(client, entopts)
	}
	core.NewIpInformationEntityFunc = func(client *core.ProxyCheckerSDK, entopts map[string]any) core.ProxyCheckerEntity {
		return entity.NewIpInformationEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewProxyCheckerSDK = core.NewProxyCheckerSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewProxyCheckerSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *ProxyCheckerSDK  { return NewProxyCheckerSDK(nil) }
func Test() *ProxyCheckerSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
