# ProxyChecker SDK feature factory

from feature.base_feature import ProxyCheckerBaseFeature
from feature.test_feature import ProxyCheckerTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ProxyCheckerBaseFeature(),
        "test": lambda: ProxyCheckerTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
