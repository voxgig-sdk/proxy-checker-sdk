// Typed models for the ProxyChecker SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Check is the typed data model for the check entity.
type Check struct {
	Anonymity *string `json:"anonymity,omitempty"`
	Asn *map[string]any `json:"asn,omitempty"`
	Geo *map[string]any `json:"geo,omitempty"`
	Ip *string `json:"ip,omitempty"`
	Isp *string `json:"isp,omitempty"`
	Port *int `json:"port,omitempty"`
	Protocol *string `json:"protocol,omitempty"`
	Proxy *string `json:"proxy,omitempty"`
	ResponseTime *int `json:"response_time,omitempty"`
	Rotation *string `json:"rotation,omitempty"`
	Type *string `json:"type,omitempty"`
	Working *bool `json:"working,omitempty"`
}

// CheckLoadMatch is the typed request payload for Check.LoadTyped.
type CheckLoadMatch struct {
	Anonymity *string `json:"anonymity,omitempty"`
	Asn *map[string]any `json:"asn,omitempty"`
	Geo *map[string]any `json:"geo,omitempty"`
	Ip *string `json:"ip,omitempty"`
	Isp *string `json:"isp,omitempty"`
	Port *int `json:"port,omitempty"`
	Protocol *string `json:"protocol,omitempty"`
	Proxy *string `json:"proxy,omitempty"`
	ResponseTime *int `json:"response_time,omitempty"`
	Rotation *string `json:"rotation,omitempty"`
	Type *string `json:"type,omitempty"`
	Working *bool `json:"working,omitempty"`
}

// CheckCreateData is the typed request payload for Check.CreateTyped.
type CheckCreateData struct {
	Anonymity *string `json:"anonymity,omitempty"`
	Asn *map[string]any `json:"asn,omitempty"`
	Geo *map[string]any `json:"geo,omitempty"`
	Ip *string `json:"ip,omitempty"`
	Isp *string `json:"isp,omitempty"`
	Port *int `json:"port,omitempty"`
	Protocol *string `json:"protocol,omitempty"`
	Proxy *string `json:"proxy,omitempty"`
	ResponseTime *int `json:"response_time,omitempty"`
	Rotation *string `json:"rotation,omitempty"`
	Type *string `json:"type,omitempty"`
	Working *bool `json:"working,omitempty"`
}

// IpInformation is the typed data model for the ip_information entity.
type IpInformation struct {
	Ip *string `json:"ip,omitempty"`
}

// IpInformationLoadMatch is the typed request payload for IpInformation.LoadTyped.
type IpInformationLoadMatch struct {
	Ip *string `json:"ip,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
