export interface Check {
    anonymity?: string;
    asn?: Record<string, any>;
    geo?: Record<string, any>;
    ip?: string;
    isp?: string;
    port?: number;
    protocol?: string;
    proxy?: string;
    response_time?: number;
    rotation?: string;
    type?: string;
    working?: boolean;
}
export interface CheckLoadMatch {
    proxy: string;
}
export interface CheckCreateData {
    anonymity?: string;
    asn?: Record<string, any>;
    geo?: Record<string, any>;
    ip?: string;
    isp?: string;
    port?: number;
    protocol?: string;
    proxy?: string;
    response_time?: number;
    rotation?: string;
    type?: string;
    working?: boolean;
}
export interface IpInformation {
    ip?: string;
}
export interface IpInformationLoadMatch {
    ip?: string;
}
