<?php
declare(strict_types=1);

// ProxyChecker SDK base feature

class ProxyCheckerBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ProxyCheckerContext $ctx, array $options): void {}
    public function PostConstruct(ProxyCheckerContext $ctx): void {}
    public function PostConstructEntity(ProxyCheckerContext $ctx): void {}
    public function SetData(ProxyCheckerContext $ctx): void {}
    public function GetData(ProxyCheckerContext $ctx): void {}
    public function GetMatch(ProxyCheckerContext $ctx): void {}
    public function SetMatch(ProxyCheckerContext $ctx): void {}
    public function PrePoint(ProxyCheckerContext $ctx): void {}
    public function PreSpec(ProxyCheckerContext $ctx): void {}
    public function PreRequest(ProxyCheckerContext $ctx): void {}
    public function PreResponse(ProxyCheckerContext $ctx): void {}
    public function PreResult(ProxyCheckerContext $ctx): void {}
    public function PreDone(ProxyCheckerContext $ctx): void {}
    public function PreUnexpected(ProxyCheckerContext $ctx): void {}
}
