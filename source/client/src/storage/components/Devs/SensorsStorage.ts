import {observable, action, computed, makeAutoObservable } from "mobx";
import { IWSQuery, WSQuery, IWSResult } from '../../../../../xcore/WSQuery';
import { WSocket } from '../../WSocket';
import {APP_STORAGE} from '../../AppStorage';
import { toJS } from "mobx";


export class SensorsStorage {
    
    @observable dataCharts: any = [];
    @observable sensors: any = [];
    @observable open_devsess: boolean = false;

    @observable dev_sensors: any = null;

    @observable sort_desc: string = '';
    @observable active_button_sort: string = '';
    @observable active_button_sort_desc: string = '';

    @observable sess_period_start : string = '' ; 
    @observable sess_period_end : string = '';

    @observable anchorEl: string = '';
    @observable number: string = '';
    @observable id_dev: string = '';

    @observable id_dev_sess: string = '';
    @observable chose_sess_time : string = '';

    @observable sessions_period: Array<any>  = [];

    @observable sessions_first_last_period: Array<any>  = [];
    @observable sess_first : Array<any>  = [];
    @observable sess_second : Array<any>  = [];
    @observable sess_middle: Array<any> = [];


    @observable example: Array<any> = [];
    
    @observable time_dev_firstsess : string = '';
    @observable time_dev_lastsess : string = '';
    @observable akb_lastsess : string = '';


    @observable id_firstsess : string  = '';
    @observable id_lastsess : string  = '';

    @observable old_dev_povs: string = ''; //////////////////////// Поверочный интервал
    @observable start_povs: string = '';
    @observable end_povs: string = '';

    @observable array_control_data: Array<number> = [];
    @observable array_last_data: Array<number> = [];
    
    constructor(){
        makeAutoObservable(this);
    }

    @action setArrayControlData(val : Array<number>) {this.array_control_data}
    @computed getArrayControlData() : Array<number> { return this.array_control_data}

    @action setTimeDevSessFirst(val : string) {this.time_dev_firstsess = val};
    @computed getTimeDevSessFirst() : string {return this.time_dev_firstsess}; 

    @action setTimeDevSessLast(val : string) {this.time_dev_lastsess = val};
    @computed getTimeDevSessLast() : string {return this.time_dev_lastsess}; 

    @action setAkbSessLast(val : string) {this.akb_lastsess = val};
    @computed getAkbSessLast() : string {return this.akb_lastsess}; 

    @action setChoseSessTime(val : string) {this.chose_sess_time = val};
    @computed getChoseSessTime() : string {return this.chose_sess_time}; 

    @action setdataCharts(val: Array<any>) { this.sessions_period = val; } 
    @computed getdataCharts(): Array<any> { return this.sessions_period; }

    @action setSessionsPeriod(val: Array<any>) { this.sessions_period = val; } /// Массив (сессии за переод)
    @computed getSessionsPeriod(): Array<any> { return this.sessions_period; } /// Массив (сессии за переод)

    @action setDevSession(val : any) {this.dev_sensors = val};
    @computed getDevSession() : any {return this.dev_sensors};

    @action setSensors(val : any) {this.sensors = val};
    @computed getSensors() : any {return this.sensors};

    @action setSortDesc(val : string) {this.sort_desc = val};
    @computed getSortDesc() : string {return this.sort_desc};

    @action setActiveButtonSort(val : string) {this.active_button_sort = val};
    @computed getActiveButtonSort() : string {return this.active_button_sort};

    @action setActiveButtonSortDesc(val : string) {this.active_button_sort_desc = val};
    @computed getActiveButtonSortDesc() : string {return this.active_button_sort_desc};

    @action setAnchorEl(val : string) {this.anchorEl = val};
    @computed getAnchorEl() : string {return this.anchorEl};

    @action setSessPeriodStart(val : string) {this.sess_period_start = val};
    @computed getSessPeriodStart() : string {return this.sess_period_start};

    @action setSessPeriodEnd(val : string) {this.sess_period_end = val};
    @computed getSessPeriodEnd() : string {return this.sess_period_end};

    @action setIdDev(val: string) {this.id_dev = val}
    @computed getIdDev(): string {return this.id_dev;} 

    @action setNumber(val: string) {this.number = val}
    @computed getNumber(): string {return this.number;}

    @action setOpenDevsess(val: boolean) {this.open_devsess = val}
    @computed getOpenDevsess(): boolean {return this.open_devsess;}

    @action setIdDevSess(val : string) {this.id_dev_sess = val};
    @computed getIdDevSess() : string {return this.id_dev_sess};

  

    @action setSessFirstLast(val: Array<any>) { this.sessions_first_last_period = val; } 
    @computed getSessFirstLast(): Array<any> { return this.sessions_first_last_period; }

    @action setSess_first(val: Array<any>) { this.sess_first = val; } 
    @computed getSess_first(): Array<any> { return this.sess_first; }


    @action setSess_second(val: Array<any>) { this.sess_second = val; } 
    @computed getSess_second(): Array<any> { return this.sess_second; }

    @action setSess_middle(val: Array<any>) { this.sess_middle = val; } 
    @computed getSess_middle(): Array<any> { return this.sess_middle; }

    
    @action setIdFirstSess(val: string) { this.id_firstsess = val; } 
    @computed getIdFirstSess(): string { return this.id_firstsess; }

    @action setIdLastSess(val: string) { this.id_lastsess = val; } 
    @computed getIdLastSess(): string { return this.id_lastsess; }

    @action setexample(val: Array<any>) { this.example = val; } 
    @computed getexample(): Array<any> { return this.example; }

    @action setOldDevPovs(val : string) {this.old_dev_povs = val};
    @computed getOldDevPovs() : string {return this.old_dev_povs};

    @action setStartPovs(val: string) {this.start_povs = val};
    @computed getStartPovs(): string {return this.start_povs};

    @action setEndPovs(val: string) {this.end_povs =val};
    @computed getEndPovs(): string {return this.end_povs};


    async get_DevSessions(name: string, value: any, _options?: any) {
        var sess_code = value;
        var q: IWSQuery = new WSQuery("get_DevSessions");
        {
          q.args = {
            dev_number: this.getNumber() || "",
            sess_period_start: this.getSessPeriodStart() || "",
            sess_period_end: this.getSessPeriodEnd() || ""
          };
    
          q.sess_code = sess_code;
          (await WSocket.get()).send(q);
        }
      }

      async get_DevFirstLastSessions(name: string, value: any, _options?: any) {
        var sess_code = value;
        var q: IWSQuery = new WSQuery("get_DevFirstLastSessions");
        {
          q.args = {
            dev_number: this.getNumber() || ""
          };
          q.sess_code = sess_code;
          (await WSocket.get()).send(q); 
        }
      }

      async get_DevPovs(value: any){
        var sess_code = value;

        var q: IWSQuery = new WSQuery("get_DevPovs");
        {
          q.args = {
            id: APP_STORAGE.sensors.getIdDev(),
            dev_number: APP_STORAGE.sensors.getNumber()
          }
          q.sess_code = sess_code;
          (await WSocket.get()).send(q);

        }
      }

      async set_DevPovs(dt: IWSResult) {

        console.log('DevPovs11', dt);
        
        if(Object.keys(dt.data).length !== 0){
          this.setOldDevPovs(dt.data[0].id);
          this.setStartPovs(dt.data[0].start_povs);
          this.setEndPovs(dt.data[0].end_povs);
        }
        else if(Object.keys(dt.data).length === 0){
          this.setOldDevPovs('0');
          this.setStartPovs('');
          this.setEndPovs('');
        }
      }


  async setDevSess(dt: IWSResult) {
    this.setDevSession(dt.data); 
  }


  async set_DevFirstLastSessions(dt: IWSResult) {
     if(Object.keys(dt.data).length > 0){
      
      let start_sess = JSON.parse(dt.data[1].sess_data);
      let end_sess = JSON.parse(dt.data[0].sess_data);

      this.setTimeDevSessFirst(dt.data[1].time_dev);
      this.setTimeDevSessLast(dt.data[0].time_dev);
      this.setIdFirstSess(dt.data[1].id); 
      this.setIdLastSess(dt.data[0].id);


      this.setAkbSessLast(dt.data[0].level_akb)
    
      var obj_first: any = {
        depth: '',
        data: '', 
    };
    
    var obj_second: any = {
      depth: '',
      data1: ''
    };
    
    var first = new Array();
    var second = new Array();
   
      const mergeByProperty = (arrays: any[], property = "depth") => {
       const arr = arrays.flatMap((item) => item); //делаем из всех массивов - один
     
       const obj = arr.reduce((acc, item) => {
         return { // делаем из массива - объект, чтобы повторения перезаписывались
           ...acc,
           [item[property]]: { ...acc[item[property]], ...item }
         };
       }, {});
     
       return Object.values(obj); //обратно преобразуем из объекта в массив
     };
     

     for(var i in start_sess.s.sort(
      (a: { depth: number }, b: { depth: number }) => b.depth - a.depth
    )){
       obj_first = {
         data_f : start_sess.s[i].data,
         depth : start_sess.s[i].depth
     }
     first.push(obj_first)
     }
     for (var j in end_sess.s.sort(
      (a: { depth: number }, b: { depth: number }) => b.depth - a.depth
    )){
         obj_second= {
           data_s: end_sess.s[j].data,
          depth : end_sess.s[j].depth
         }  
         second.push(obj_second)
     }
     const result = mergeByProperty([first, second]);
     this.setSess_first(first.sort(
      (a: { depth: number }, b: { depth: number }) =>  a.depth - b.depth
    ));
     this.setSess_second(second.sort(
      (a: { depth: number }, b: { depth: number }) =>  a.depth - b.depth
    ));
     this.setSessFirstLast(result.sort(
      (a: { depth: number }, b: { depth: number }) =>  a.depth - b.depth
    ));
    }
    if(Object.keys(dt.data).length === 0){
      this.setSessFirstLast([]);
      this.setTimeDevSessFirst('');
      this.setTimeDevSessLast('');
      this.setAkbSessLast('');
      APP_STORAGE.sensors.setChoseSessTime('');
    }     
}
}
