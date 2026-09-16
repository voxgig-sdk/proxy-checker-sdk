package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewCheckEntityFunc func(client *ProxyCheckerSDK, entopts map[string]any) ProxyCheckerEntity

var NewIpInformationEntityFunc func(client *ProxyCheckerSDK, entopts map[string]any) ProxyCheckerEntity

