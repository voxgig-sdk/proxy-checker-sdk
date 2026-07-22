<?php
declare(strict_types=1);

// ProxyChecker SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ProxyCheckerMakeContext
{
    public static function call(array $ctxmap, ?ProxyCheckerContext $basectx): ProxyCheckerContext
    {
        return new ProxyCheckerContext($ctxmap, $basectx);
    }
}
