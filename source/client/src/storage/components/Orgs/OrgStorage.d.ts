import { IWSResult } from "../../../../../xcore/WSQuery";
export declare class OrgStorage {
    modal_edit_org: boolean;
    full_name_org: string;
    name_org: string;
    inn: string;
    address: string;
    latitude: string;
    longitude: string;
    info_org: string;
    key_org: any;
    constructor();
    setModalEditOrg(val: boolean): void;
    getModalEditOrg(): boolean;
    setKeyOrg(val: any): void;
    getKeyOrg(): any;
    setFullNameOrg(val: string): void;
    getFullNameOrg(): string;
    setNameOrg(val: string): void;
    getNameOrg(): string;
    setInn(val: string): void;
    getInn(): string;
    setAddress(val: string): void;
    getAddress(): string;
    setLatitude(val: string): void;
    getLatitude(): string;
    setLongitude(val: string): void;
    getLongitude(): string;
    setInfOrg(val: string): void;
    getInfOrg(): string;
    get_ChangeOrg(dt: IWSResult): Promise<void>;
    set_ChangeOrg(name: string, value: any, _options?: any): Promise<void>;
    setChangeJobs_Titles(name: string, value: any, _options?: any): Promise<void>;
}