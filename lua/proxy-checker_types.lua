-- Typed models for the ProxyChecker SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Check
---@field anonymity? string
---@field asn? table
---@field geo? table
---@field ip? string
---@field isp? string
---@field port? number
---@field protocol? string
---@field proxy? string
---@field response_time? number
---@field rotation? string
---@field type? string
---@field working? boolean

---@class CheckLoadMatch
---@field anonymity? string
---@field asn? table
---@field geo? table
---@field ip? string
---@field isp? string
---@field port? number
---@field protocol? string
---@field proxy? string
---@field response_time? number
---@field rotation? string
---@field type? string
---@field working? boolean

---@class CheckCreateData
---@field anonymity? string
---@field asn? table
---@field geo? table
---@field ip? string
---@field isp? string
---@field port? number
---@field protocol? string
---@field proxy? string
---@field response_time? number
---@field rotation? string
---@field type? string
---@field working? boolean

---@class IpInformation
---@field ip? string

---@class IpInformationLoadMatch
---@field ip? string

local M = {}

return M
