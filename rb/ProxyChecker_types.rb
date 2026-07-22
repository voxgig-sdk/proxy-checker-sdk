# frozen_string_literal: true

# Typed models for the ProxyChecker SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Check entity data model.
#
# @!attribute [rw] anonymity
#   @return [String, nil]
#
# @!attribute [rw] asn
#   @return [Hash, nil]
#
# @!attribute [rw] geo
#   @return [Hash, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] isp
#   @return [String, nil]
#
# @!attribute [rw] port
#   @return [Integer, nil]
#
# @!attribute [rw] protocol
#   @return [String, nil]
#
# @!attribute [rw] proxy
#   @return [String, nil]
#
# @!attribute [rw] response_time
#   @return [Integer, nil]
#
# @!attribute [rw] rotation
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] working
#   @return [Boolean, nil]
Check = Struct.new(
  :anonymity,
  :asn,
  :geo,
  :ip,
  :isp,
  :port,
  :protocol,
  :proxy,
  :response_time,
  :rotation,
  :type,
  :working,
  keyword_init: true
)

# Request payload for Check#load.
#
# @!attribute [rw] anonymity
#   @return [String, nil]
#
# @!attribute [rw] asn
#   @return [Hash, nil]
#
# @!attribute [rw] geo
#   @return [Hash, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] isp
#   @return [String, nil]
#
# @!attribute [rw] port
#   @return [Integer, nil]
#
# @!attribute [rw] protocol
#   @return [String, nil]
#
# @!attribute [rw] proxy
#   @return [String, nil]
#
# @!attribute [rw] response_time
#   @return [Integer, nil]
#
# @!attribute [rw] rotation
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] working
#   @return [Boolean, nil]
CheckLoadMatch = Struct.new(
  :anonymity,
  :asn,
  :geo,
  :ip,
  :isp,
  :port,
  :protocol,
  :proxy,
  :response_time,
  :rotation,
  :type,
  :working,
  keyword_init: true
)

# Request payload for Check#create.
#
# @!attribute [rw] anonymity
#   @return [String, nil]
#
# @!attribute [rw] asn
#   @return [Hash, nil]
#
# @!attribute [rw] geo
#   @return [Hash, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] isp
#   @return [String, nil]
#
# @!attribute [rw] port
#   @return [Integer, nil]
#
# @!attribute [rw] protocol
#   @return [String, nil]
#
# @!attribute [rw] proxy
#   @return [String, nil]
#
# @!attribute [rw] response_time
#   @return [Integer, nil]
#
# @!attribute [rw] rotation
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] working
#   @return [Boolean, nil]
CheckCreateData = Struct.new(
  :anonymity,
  :asn,
  :geo,
  :ip,
  :isp,
  :port,
  :protocol,
  :proxy,
  :response_time,
  :rotation,
  :type,
  :working,
  keyword_init: true
)

# IpInformation entity data model.
#
# @!attribute [rw] ip
#   @return [String, nil]
IpInformation = Struct.new(
  :ip,
  keyword_init: true
)

# Request payload for IpInformation#load.
#
# @!attribute [rw] ip
#   @return [String, nil]
IpInformationLoadMatch = Struct.new(
  :ip,
  keyword_init: true
)

