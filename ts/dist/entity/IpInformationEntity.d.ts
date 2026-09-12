import { ProxyCheckerEntityBase } from '../ProxyCheckerEntityBase';
import type { ProxyCheckerSDK } from '../ProxyCheckerSDK';
import type { Control } from '../types';
import type { IpInformation, IpInformationLoadMatch } from '../ProxyCheckerTypes';
declare class IpInformationEntity extends ProxyCheckerEntityBase<IpInformation> {
    constructor(client: ProxyCheckerSDK, entopts: any);
    make(this: IpInformationEntity): IpInformationEntity;
    load(this: any, reqmatch?: IpInformationLoadMatch, ctrl?: Control): Promise<IpInformationEntity>;
}
export { IpInformationEntity };
