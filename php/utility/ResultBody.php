<?php
declare(strict_types=1);

// ProxyChecker SDK utility: result_body

class ProxyCheckerResultBody
{
    public static function call(ProxyCheckerContext $ctx): ?ProxyCheckerResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
