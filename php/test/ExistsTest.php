<?php
declare(strict_types=1);

// ProxyChecker SDK exists test

require_once __DIR__ . '/../proxychecker_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ProxyCheckerSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
