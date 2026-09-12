import { CheckEntity } from './entity/CheckEntity';
import { IpInformationEntity } from './entity/IpInformationEntity';
export type * from './ProxyCheckerTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ProxyCheckerEntityBase } from './ProxyCheckerEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class ProxyCheckerSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Check(entopts?: Record<string, any>): CheckEntity;
    IpInformation(entopts?: Record<string, any>): IpInformationEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ProxyCheckerSDK;
    tester(testopts?: any, sdkopts?: any): ProxyCheckerSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ProxyCheckerSDK;
export { stdutil, config, BaseFeature, ProxyCheckerEntityBase, ProxyCheckerSDK, SDK, };
