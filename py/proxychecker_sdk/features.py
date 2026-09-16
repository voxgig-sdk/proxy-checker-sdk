# ProxyChecker SDK feature factory

from proxychecker_sdk.feature.base_feature import ProxyCheckerBaseFeature
from proxychecker_sdk.feature.ratelimit_feature import ProxyCheckerRatelimitFeature
from proxychecker_sdk.feature.retry_feature import ProxyCheckerRetryFeature
from proxychecker_sdk.feature.test_feature import ProxyCheckerTestFeature
from proxychecker_sdk.feature.timeout_feature import ProxyCheckerTimeoutFeature


_FEATURES = {
    "base": lambda: ProxyCheckerBaseFeature(),
    "ratelimit": lambda: ProxyCheckerRatelimitFeature(),
    "retry": lambda: ProxyCheckerRetryFeature(),
    "test": lambda: ProxyCheckerTestFeature(),
    "timeout": lambda: ProxyCheckerTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
