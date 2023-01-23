
export type TDSensor = {
    depth: number,
    value: number
}



/**
 * Устройство
 */
export class TDevice {
    id: number = 0;
    group_dev_id: number = 0;
    number: string = '';
    name: string = '';
    latitude: string = '';
    longitude: string = '';
    sensors: TDSensorsList = {"s": []};
    info: string = '';
};

export type TDSensorsList = {
    "s": TDSensor[]
}

export const SENSORS_LIST:TDSensorsList = {"s": []}

/**
 * Устройство по умолчанию
 */
export const DEVICE:TDevice = {
    id: 0,
    group_dev_id: 0,
    number:'',
    name:'',
    latitude:'0.0',
    longitude:'0.0',
    sensors: SENSORS_LIST,
    info:''
};

/**
 * Группа устройств
 */
export type TDGroup = {
    id: number,
    parent_id: number,
    g_name:string,
    latitude:string,
    longitude:string,
    ord_num:string,
    g_info:string,
	deleted:boolean
};

export const D_GROUP:TDGroup = {
    id: 0,
    parent_id: 0,
    g_name:'',
    latitude:'',
    longitude:'',
    ord_num:'',
    g_info:'',
	deleted:false
};

/**
 * Полное описание рруппы устройств с вложением
 */
export class TDevsGroup {
    group: TDGroup = null;
    id:number = 0;
    p_id: number = 0;
    childs: TDevsGroup[] = new Array();
    devs: TDevice[] = new Array();
    updated: boolean = false; /* обновлен запросом (был выбран и подгружен по содержимому) */
}

/**
 * Дерево из групп с устройстчами
 */
export const DEV_GR_NODE:TDevsGroup = { group:{...D_GROUP}, id:0, p_id:0, childs:[], devs:[], updated:false };


