import * as React from "react";

import { observer } from "mobx-react";
import { toJS } from "mobx";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { Box, Typography, TextField, Button } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import {DevSessCharts} from '../Sensors/DevSessCharts'




interface IProps {}

//Устройства
@observer
export class CustomExport extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }



  render(): React.ReactNode {
    var date = []; 
    let sess = APP_STORAGE.sensors;
    let dev_sess: { [x: string]: {
      sess_data: any;
      time_srv: string;
      time_dev: string;
      dev_number: string;
      id: string; level_akb: string; 
}; };

    if (sess.getDevSession) {
      dev_sess = toJS(sess.getDevSession());

      for (var key in dev_sess) {  

   
         
         let senso = JSON.parse(dev_sess[key].sess_data)
    

        date.push( 
        <React.Fragment key={"_gr_id_export_" + dev_sess[key].id}>
         <TableRow key={'key_row_export' + dev_sess[key].id} sx = {{p: '4px'}}>
        <TableCell key={'key_row_export' + dev_sess[key].dev_number}  sx = {{p: '4px'}} > {'' + dev_sess[key].dev_number} </TableCell>
        <TableCell key={'key_row_export' + dev_sess[key].time_dev} sx = {{p: '4px'}} > {'' + dev_sess[key].time_dev} </TableCell>
        <TableCell key={'key_row_export' + dev_sess[key].time_srv} sx = {{p: '4px'}} > {'' + dev_sess[key].time_srv} </TableCell>
        <TableCell  sx = {{p: '4px'}}> {'' + dev_sess[key].level_akb} </TableCell>
          {
          senso.s.map((row : any, i : any) => (
            <TableCell sx = {{p: '4px'}}> {'' + row.depth} </TableCell>
            ))
          }

       </TableRow>
        </React.Fragment>
    
        )    
      }}


    return (
      <React.Fragment >
        { date.length &&
          <Table key= {'my-table-id'} id = 'my-table-id' sx= {{display: 'none'}} >
              <TableBody  key ={'dsafsafasfd' + 8888}>
                  <TableRow  key ={'dsafsafasfd' + 1}>
                    <TableCell key = '121212'> Устройство</TableCell>
                    <TableCell key = '12121ewe2' > Время устройства</TableCell>
                    <TableCell key = '121weeew212'> Время сервера</TableCell>
                    <TableCell key = '12121e2eqe2'> АКБ</TableCell>
                    <TableCell key = '12121e2ewwqe2' colSpan={10}> Температура</TableCell>
                  </TableRow>
               {date}
              </TableBody>
            </Table>
        }
       
      </React.Fragment>
    );
  }
}












