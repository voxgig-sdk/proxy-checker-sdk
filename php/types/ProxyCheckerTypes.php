<?php
declare(strict_types=1);

// Typed models for the ProxyChecker SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Check entity data model. */
class Check
{
    public ?string $anonymity = null;
    public ?array $asn = null;
    public ?array $geo = null;
    public ?string $ip = null;
    public ?string $isp = null;
    public ?int $port = null;
    public ?string $protocol = null;
    public ?string $proxy = null;
    public ?int $response_time = null;
    public ?string $rotation = null;
    public ?string $type = null;
    public ?bool $working = null;
}

/** Request payload for Check#load. */
class CheckLoadMatch
{
    public ?string $anonymity = null;
    public ?array $asn = null;
    public ?array $geo = null;
    public ?string $ip = null;
    public ?string $isp = null;
    public ?int $port = null;
    public ?string $protocol = null;
    public ?string $proxy = null;
    public ?int $response_time = null;
    public ?string $rotation = null;
    public ?string $type = null;
    public ?bool $working = null;
}

/** Request payload for Check#create. */
class CheckCreateData
{
    public ?string $anonymity = null;
    public ?array $asn = null;
    public ?array $geo = null;
    public ?string $ip = null;
    public ?string $isp = null;
    public ?int $port = null;
    public ?string $protocol = null;
    public ?string $proxy = null;
    public ?int $response_time = null;
    public ?string $rotation = null;
    public ?string $type = null;
    public ?bool $working = null;
}

/** IpInformation entity data model. */
class IpInformation
{
    public ?string $ip = null;
}

/** Request payload for IpInformation#load. */
class IpInformationLoadMatch
{
    public ?string $ip = null;
}

