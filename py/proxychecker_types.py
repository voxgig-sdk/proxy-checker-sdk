# Typed models for the ProxyChecker SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Check(TypedDict, total=False):
    anonymity: str
    asn: dict
    geo: dict
    ip: str
    isp: str
    port: int
    protocol: str
    proxy: str
    response_time: int
    rotation: str
    type: str
    working: bool


class CheckLoadMatch(TypedDict, total=False):
    anonymity: str
    asn: dict
    geo: dict
    ip: str
    isp: str
    port: int
    protocol: str
    proxy: str
    response_time: int
    rotation: str
    type: str
    working: bool


class CheckCreateData(TypedDict, total=False):
    anonymity: str
    asn: dict
    geo: dict
    ip: str
    isp: str
    port: int
    protocol: str
    proxy: str
    response_time: int
    rotation: str
    type: str
    working: bool


class IpInformation(TypedDict, total=False):
    ip: str


class IpInformationLoadMatch(TypedDict, total=False):
    ip: str
