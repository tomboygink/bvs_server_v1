import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


import { observer } from "mobx-react";

import {EditUser} from "./EditUser"

import { APP_STORAGE } from "../../../../../storage/AppStorage";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';


interface IProps {}

@observer
export class TableUser extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }


  render(): React.ReactNode {
    let search_family = document.getElementById('search')
    // let input = search_family.value.toUpperCase(); 

    let table_rows = []
    if (APP_STORAGE.reg_user.getAllUsers()) {
        let users = JSON.parse(JSON.stringify(APP_STORAGE.reg_user.getAllUsers()));
        for (var key in users) {
          let row = users[key];
            if (row.u_deleted === false) {
            table_rows.push(
            <TableRow
                key={row.u_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell align="center" >{key}</TableCell>              
              <TableCell align="center" > {row.u_family} </TableCell>
              <TableCell  align="center" > {row.u_name} </TableCell>
              <TableCell  align="center">{row.u_father}</TableCell>
              <TableCell  align="center">{row.u_login}</TableCell>
              <TableCell  align="center">{row.u_telephone}</TableCell>
              <TableCell  align="center">{row.u_email}</TableCell>
              <TableCell  align="center">{row.u_info}</TableCell>
              <TableCell align="center"
                 onClick={(e) => {APP_STORAGE.edit_user.set_IdRows(row.u_id)}}>
                <DriveFileRenameOutlineOutlinedIcon fontSize="small"/>
             </TableCell>
             <TableCell  align="center">Действующая</TableCell> 
    
              </TableRow>

            )
          }

        else {

          table_rows.push(
            <TableRow 
                key={row.u_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, background : '#b9b3b31f'}}
              >  
              <TableCell align="center" >{key}</TableCell>                 
              <TableCell sx = {{color: '#E31450'}}align="center"> {row.u_family} </TableCell>
              <TableCell sx = {{color: '#E31450'}} align="center" > {row.u_name} </TableCell>
              <TableCell sx = {{color: '#E31450'}} align="center">{row.u_father}</TableCell>
              <TableCell sx = {{color: '#E31450'}} align="center">{row.u_login}</TableCell>
              <TableCell sx = {{color: '#E31450'}} align="center">{row.u_telephone}</TableCell>
              <TableCell sx = {{color: '#E31450'}} align="center">{row.u_email}</TableCell>
              <TableCell sx = {{color: '#E31450'}} align="center">{row.u_info}</TableCell>
              <TableCell align="center"
                 onClick={(e) => {APP_STORAGE.edit_user.set_IdRows(row.u_id)}}>
                <DriveFileRenameOutlineOutlinedIcon fontSize="small"/>
             </TableCell>
             <TableCell  sx = {{color: '#E31450'}}align="center">Закрытая</TableCell>
              </TableRow>

            )

        }
        }
      }

    return (
      <React.Fragment>

<TableContainer component={Paper}>
<TextField id="search-family" label="Name" />

      <Table  aria-label="simple table">
        <TableHead>
          <TableRow key={110}>
            <TableCell align="center" width={1}> <SearchOutlinedIcon fontSize="small" /></TableCell>    
            <TableCell align="center">Фамилия</TableCell>
            <TableCell align="center">Имя</TableCell>
            <TableCell align="center">Отчество</TableCell>
            <TableCell align="center">Логин</TableCell>
            <TableCell align="center">Телефон</TableCell>
            <TableCell align="center">Почта</TableCell>
            <TableCell align="center">Информация</TableCell>
            <TableCell align="center">Редактировать</TableCell>
            <TableCell align="center">Состояние</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {table_rows}

          <TableRow>
             </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

     
     <EditUser/>
       
      </React.Fragment>
    );
  }
}
