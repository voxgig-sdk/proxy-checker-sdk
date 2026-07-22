<?php
declare(strict_types=1);

// ProxyChecker SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ProxyCheckerFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ProxyCheckerBaseFeature();
            case "test":
                return new ProxyCheckerTestFeature();
            default:
                return new ProxyCheckerBaseFeature();
        }
    }
}
