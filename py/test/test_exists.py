# ProxyChecker SDK exists test

import pytest
from proxychecker_sdk import ProxyCheckerSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ProxyCheckerSDK.test(None, None)
        assert testsdk is not None
