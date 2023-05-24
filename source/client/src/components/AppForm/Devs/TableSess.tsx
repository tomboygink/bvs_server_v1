import * as React from "react";

import { observer } from "mobx-react";
import { toJS } from "mobx";
import { APP_STORAGE } from "../../../storage/AppStorage";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  TableHead,
  Paper,
  TableFooter,
  TablePagination,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import { CustomExport } from "./Export";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AddIcon from "@mui/icons-material/Add";

import { Calendar } from "./Calendar";
import { SsidChart } from "@mui/icons-material";
import { handleChangePage, handleChangeRowsPerPage } from "./CustomPaginationActionsTable";


interface IProps {}

//Устройства
@observer
export class TableSess extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async set_NewControlDevSess(id: any, dev_id: any, dev_number: any) {
    APP_STORAGE.devs.set_NewControlDevSess(APP_STORAGE.auth_form.getdt(), id, dev_id, dev_number)
  }

  async setRowId(e: string, time: string) {
    APP_STORAGE.sensors.setChoseSessTime(time);
    APP_STORAGE.sensors.setOpenDevsess(true);
    APP_STORAGE.sensors.setIdDevSess(e);
    APP_STORAGE.sensors.get_DevSessions(
      "sess_id",
      APP_STORAGE.auth_form.getdt()
    );

    var data: any[] = []; ////// отображаем сенсоры

    let sess = APP_STORAGE.sensors;
    let sessors;
    if (sess.getDevSession) {
      sessors = sess.getDevSession();
 
      for (var key in sessors) {
        let sess_data = JSON.parse(sessors[key].sess_data);
        const uniqueChars = sess_data.s.reduce((o: any, i: any) => {
          if (!o.find((v: { depth: any }) => v.depth == i.depth)) {
            o.push(i);
          }
          return o;
        }, []);

        for (var i in uniqueChars.sort(
          (a: { depth: number }, b: { depth: number }) => a.depth - b.depth
        )) {
          if (
            String(APP_STORAGE.sensors.getIdDevSess()) ===
            String(sessors[key].id)
          ) {
            data.push({
              depth: String(uniqueChars[i].depth),
              "град.": uniqueChars[i].data,
            });
          }
        }
      }
    }
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

    const result1 = mergeByProperty([data, toJS(APP_STORAGE.sensors.getSessFirstLast())]);


    APP_STORAGE.sensors.setSess_middle(data.sort(
      (a: { depth: number }, b: { depth: number }) =>  a.depth - b.depth
    ));
   

    APP_STORAGE.sensors.setdataCharts(result1.sort(
      (a: { depth: number }, b: { depth: number }) =>  a.depth - b.depth
    ));
  }
 

  render(): React.ReactNode {
    let count_sess = [];
    var ses_depth = [];
    var ses_date = [];
    var date = [];
    var count;
    let sess = APP_STORAGE.sensors;
    let dev_sess: {
      [x: string]: {
        sess_data: any;
        dev_id:any;
        time_srv: string;
        time_dev: string;
        dev_number: string;
        id: string;
        level_akb: string;
      };
    };

    if (sess.getSessPeriodStart() === "" || sess.getSessPeriodEnd() === "") {
      var tzoffset = new Date().getTimezoneOffset() * 60000; // смещение в миллисекундах
      var localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .slice(0, -8);
      sess.setSessPeriodStart(localISOTime);
      sess.setSessPeriodEnd(localISOTime); // => '2023-03-16T09:00'
    }

    if (sess.getDevSession) {
      dev_sess = toJS(sess.getDevSession());

      for (var key in dev_sess) {
        let senso = JSON.parse(dev_sess[key].sess_data);

        if (
          String(APP_STORAGE.sensors.getIdDevSess()) ===
          String(dev_sess[key].id)
        ) {
          count_sess.push(senso.s.length);

          ses_depth.push(
            senso.s.map((row: any, i: any) => (
              <React.Fragment key={"data_" + row.data + row.depth}>
                <TableCell
                  sx={{ p: "4px", color: "#002757", fontWeight: "500" }}
                >
                  {" "}
                  {"" + row.depth}{" "}
                </TableCell>
              </React.Fragment>
            ))
          );
          ses_date.push(
            senso.s.map((row: any, i: any) => (
              <React.Fragment key={"data_qdsadsd" + row.data + row.depth}>
                <TableCell
                  sx={{ p: "4px", color: "#002757", fontWeight: "500" }}
                >
                  {" "}
                  {"" + row.data}{" "}
                </TableCell>
              </React.Fragment>
            ))
          );
        }

        date.push(dev_sess[key]);
        count = Object.keys(dev_sess).length;
      }
    }

    let page = APP_STORAGE.devs.getPage();
    let rowsPerPage = APP_STORAGE.devs.getRowsPerPage();

    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - date.length) : 0;

    if (document.getElementById(dev_sess[key].id)) {
      if (
        document.getElementById(dev_sess[key].id).id ===
        APP_STORAGE.sensors.getIdDevSess()
      ) {
        document.getElementById(dev_sess[key].id).style.backgroundColor =
          "#E3EEFA";
      } else if (
        document.getElementById(dev_sess[key].id).id !==
        APP_STORAGE.sensors.getIdDevSess()
      ) {
        document.getElementById(dev_sess[key].id).style.backgroundColor =
          "#fff";
      }
    }

    return (
      <React.Fragment>
        {date.length > 0 && (
          <Box sx={{ mt: "8px" }}>
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow 
                          key={'row_key'}
                        >
                          <TableCell component="th" scope="row">
                            Номер устройства
                          </TableCell>
                          
                          <TableCell style={{ width: 160 }} align="center">
                          Время устройств
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            Заряд
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                          Контрольная сессия
                          </TableCell>
                          <TableCell component="th" scope="row"  >
                           Показать на графике 
                          </TableCell>
                        </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0 ? date.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : date).map(
                      (row) => (
                        <TableRow id = {row.id}
                          key={row.id}
                        >
                          <TableCell component="th" scope="row">
                            {row.dev_number}
                          </TableCell>
                       
                          <TableCell style={{ width: 160 }} align="right">
                            {row.time_dev.replace('T', ' ')}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="right">
                            {row.level_akb}
                          </TableCell>

                          <TableCell component="th" scope="row"  >
                            <Button  sx={{fontSize: '12px'}} onClick={() => {
                            this.set_NewControlDevSess(row.id, row.dev_id, row.dev_number);
                          }}> установить </Button>
                            
                          </TableCell>
                          <TableCell component="th" scope="row"  >
                            <Button sx={{fontSize: '12px'}} onClick={() => {
                            this.setRowId(row.id, row.time_dev);
                          }}> Выбрать </Button>
                            
                          </TableCell>
                        </TableRow>
                      )
                    )}
                 {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
                  </TableBody>

                  <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={date.length}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage={"строк на странице"}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              //ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
                </Table>
              </TableContainer>
            </>
          </Box>
        )}
        <CustomExport />
      </React.Fragment>
    );
  }
}
