# ProxyChecker SDK utility: make_context

from proxychecker_sdk.core.context import ProxyCheckerContext


def make_context_util(ctxmap, basectx):
    return ProxyCheckerContext(ctxmap, basectx)
