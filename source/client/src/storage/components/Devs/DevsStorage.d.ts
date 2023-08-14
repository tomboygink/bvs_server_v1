import { IWSResult } from '../../../../../xcore/WSQuery';
import { TDGroup } from './DevEntityes';
export declare class DevsStorage {
    gr: TDGroup;
    devs: Array<string>;
    item: Array<any>;
    array: Array<any>;
    depth_new_sensors: Array<any>;
    id_devs: string;
    id_devs_ch: string;
    open_modal: boolean;
    open_modal_change: boolean;
    user_role: boolean;
    org_id: number;
    parent: number;
    add_sensors: boolean;
    get_sensors: Array<any>;
    get_sensors1: Array<any>;
    get_sensors2: Array<any>;
    array_sensors: Array<any>;
    change_sensors: boolean;
    id: string;
    group_dev_id: string;
    number: string;
    name: string;
    latitude: string;
    longitude: string;
    deleted: boolean;
    info: string;
    sensors: number;
    change_sensors_value: string;
    select_id_dev: string;
    checkbox_editing: boolean;
    number_err: boolean;
    number_err_mess: string;
    name_err: boolean;
    name_err_mess: string;
    org_err: boolean;
    org_err_mess: string;
    latitude_err: boolean;
    latitude_err_mess: string;
    longitude_err: boolean;
    longitude_err_mess: string;
    menu_devs: string;
    save: string;
    deactivate_constrolsess: any;
    error_controlsess: any;
    open_newdevpovs: boolean;
    start_devpovs: string;
    end_devpovs: string;
    passedDay: string;
    day: string;
    rowsPerPage: number;
    page: number;
    top_menu_dev: string;
    constructor();
    setTopMenuDev(val: string): void;
    getTopMenuDev(): string;
    setGr(val: TDGroup): void;
    getGr(): TDGroup;
    setDeactivateControlSess(val: any): void;
    getDeactivateControlSess(): any;
    setErrorControlSess(val: any): void;
    getErrorControlSess(): any;
    setRowsPerPage(val: number): void;
    getRowsPerPage(): number;
    setPage(val: number): void;
    getPage(): number;
    setMenu_devs(val: string): void;
    getMenu_devs(): string;
    setCheckboxEd(val: boolean): void;
    getCheckboxEd(): boolean;
    setOrgId(val: number): void;
    getOrgId(): number;
    setUserRole(val: boolean): void;
    getUserRole(): boolean;
    setDevs(val: Array<string>): void;
    getDevs(): Array<string>;
    setItem(val: Array<any>): void;
    getItem(): Array<any>;
    setArray(val: Array<any>): void;
    getArray(): Array<any>;
    setDepthNewSensors(val: Array<any>): void;
    getDepthNewSensors(): Array<any>;
    setIdDevs(val: string): void;
    getIdDevs(): string;
    setIdChild(val: string): void;
    getIdChild(): string;
    setOpenModal(val: boolean): void;
    getOpenModal(): boolean;
    setOpenModalChange(val: boolean): void;
    getOpenModalChange(): boolean;
    setId(val: string): void;
    getId(): string;
    setGroupDevId(val: string): void;
    getGroupDevId(): string;
    setNumber(val: string): void;
    getNumber(): string;
    setName(val: string): void;
    getName(): string;
    setLatitude(val: string): void;
    getLatitude(): string;
    setLongitude(val: string): void;
    getLongitude(): string;
    setDeleted(val: boolean): void;
    getDeleted(): boolean;
    setInfo(val: string): void;
    getInfo(): string;
    setSensors(val: number): void;
    getSensors(): number;
    setChangeSensorsValue(val: string): void;
    getChangeSensorsValue(): string;
    setParent(val: number): void;
    getParent(): number;
    setIdDev(val: string): void;
    getIdDev(): string;
    setDepthSensors(val: boolean): void;
    getDepthSensors(): boolean;
    setDepthSensors_Ch(val: boolean): void;
    getDepthSensors_Ch(): boolean;
    setChangeSensors(val: Array<any>): void;
    getChangeSensors(): Array<any>;
    setChangeSensors1(val: Array<any>): void;
    getChangeSensors1(): Array<any>;
    setChangeSensors2(val: Array<any>): void;
    getChangeSensors2(): Array<any>;
    setSave(val: string): void;
    getSave(): string;
    setArray_sensors(val: Array<any>): void;
    getArray_sensors(): Array<any>;
    setNumberError(val: boolean): void;
    getNumberError(): boolean;
    setNumberError_mess(val: string): void;
    getNumberError_mess(): string;
    setNameError(val: boolean): void;
    getNameError(): boolean;
    setNameError_mess(val: string): void;
    getNamaError_mess(): string;
    setLatitudeError(val: boolean): void;
    getLatitudeError(): boolean;
    setLatitudeError_mess(val: string): void;
    getLatitudeError_mess(): string;
    setLongitudeError(val: boolean): void;
    getLongitudeError(): boolean;
    setLongitudeError_mess(val: string): void;
    getLongitudeError_mess(): string;
    setOpenNewdevpovs(val: boolean): void;
    getOpenNewdevpovs(): boolean;
    setStartDevPovs(val: string): void;
    getStartDevPovs(): string;
    setEndDevPovs(val: string): void;
    getEndDevPovs(): string;
    setPassedDay(val: string): void;
    getPassedDay(): string;
    setDay(val: string): void;
    getDay(): string;
    get_Devs(name: string, value: any, _options?: any): Promise<void>;
    get_Devs11(name: string, value: any, _options?: any): Promise<void>;
    set_NewDevs(name: string, value: any, _options?: any): Promise<void>;
    setDevsAll(dt: IWSResult): Promise<void>;
    set_DevsDepth(value: number): Promise<void>;
    set_ChangeDevs(name: string, value: any, _options?: any): Promise<void>;
    set_NewDevPovs(name: string, value: any, _options?: any): Promise<void>;
    set_NewControlDevSess(value: any, id_sess: any, dev_id: any, dev_number: any): Promise<void>;
    deleteControlDevSess(value: any, id_sess: any): Promise<void>;
    get_NewControlDevSess(dt: IWSResult): Promise<void>;
}
