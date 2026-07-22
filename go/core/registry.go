package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCheckEntityFunc func(client *ProxyCheckerSDK, entopts map[string]any) ProxyCheckerEntity

var NewIpInformationEntityFunc func(client *ProxyCheckerSDK, entopts map[string]any) ProxyCheckerEntity

