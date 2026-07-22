<?php
declare(strict_types=1);

// ProxyChecker SDK utility: prepare_body

class ProxyCheckerPrepareBody
{
    public static function call(ProxyCheckerContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
