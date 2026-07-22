<?php
declare(strict_types=1);

// ProxyChecker SDK utility: result_headers

class ProxyCheckerResultHeaders
{
    public static function call(ProxyCheckerContext $ctx): ?ProxyCheckerResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
