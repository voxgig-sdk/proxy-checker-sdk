import { ProxyCheckerEntityBase } from '../ProxyCheckerEntityBase';
import type { ProxyCheckerSDK } from '../ProxyCheckerSDK';
import type { Control } from '../types';
import type { Check, CheckLoadMatch, CheckCreateData } from '../ProxyCheckerTypes';
declare class CheckEntity extends ProxyCheckerEntityBase<Check> {
    constructor(client: ProxyCheckerSDK, entopts: any);
    make(this: CheckEntity): CheckEntity;
    load(this: any, reqmatch?: CheckLoadMatch, ctrl?: Control): Promise<CheckEntity>;
    create(this: any, reqdata?: CheckCreateData, ctrl?: Control): Promise<CheckEntity>;
}
export { CheckEntity };
