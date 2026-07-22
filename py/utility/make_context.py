# ProxyChecker SDK utility: make_context

from core.context import ProxyCheckerContext


def make_context_util(ctxmap, basectx):
    return ProxyCheckerContext(ctxmap, basectx)
