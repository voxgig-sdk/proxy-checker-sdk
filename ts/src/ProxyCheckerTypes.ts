// Typed models for the ProxyChecker SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Check {
  anonymity?: string
  asn?: Record<string, any>
  geo?: Record<string, any>
  ip?: string
  isp?: string
  port?: number
  protocol?: string
  proxy?: string
  response_time?: number
  rotation?: string
  type?: string
  working?: boolean
}

export interface CheckLoadMatch {
  anonymity?: string
  asn?: Record<string, any>
  geo?: Record<string, any>
  ip?: string
  isp?: string
  port?: number
  protocol?: string
  proxy?: string
  response_time?: number
  rotation?: string
  type?: string
  working?: boolean
}

export interface CheckCreateData {
  anonymity?: string
  asn?: Record<string, any>
  geo?: Record<string, any>
  ip?: string
  isp?: string
  port?: number
  protocol?: string
  proxy?: string
  response_time?: number
  rotation?: string
  type?: string
  working?: boolean
}

export interface IpInformation {
  ip?: string
}

export interface IpInformationLoadMatch {
  ip?: string
}

