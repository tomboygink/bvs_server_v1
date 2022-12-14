import React from "react";
import { observer } from "mobx-react";

import {TextField, Box, Dialog , Divider , Typography, TextareaAutosize, Button, FormControl,InputLabel, Select, MenuItem} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { APP_STORAGE } from "../../../storage/AppStorage";
import SaveIcon from "@mui/icons-material/Save";

interface IProps {}

//Компонент формы приложения
@observer
export class ModalDevs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async closeModal() {
    APP_STORAGE.devs_groups.setOpenModal(false)
}

async SelectedOrg(a: any) {    //// Сохраняем , то что выбрал пользователь из выпадающего списка Организации
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  render(): React.ReactNode {
    let org = null;
    var options_org = [];
///// разделяем обьект на ключ значение - Организации
    if (APP_STORAGE.reg_user.getOrgAll()) {
      org = JSON.parse(JSON.stringify(APP_STORAGE.reg_user.getOrgAll()));
      for (var key in org) {
        if (org.hasOwnProperty(key)) {
          let a = org[key];

          options_org.push(  /// создаем опции выбора для выпадающего списка - организации
            <MenuItem key={a.id} sx={{ fontSize: "12px" }} value={a.id}>
              {a.full_name}
            </MenuItem>
          );
        }
      }
    }

    return (
        <React.Fragment>

        <Dialog BackdropProps={{style:{background:'rgba(0, 0, 0, 0.75)'} } } open={APP_STORAGE.devs_groups.getOpenModal()}  fullWidth >
         
        <Box  sx={{p: 2}}>
  
        <Box className='ModalTitle' sx = { {display: 'flex' , justifyContent: 'space-between', mb: '12px'}}> 
         
        <Typography >  
            Добавить расположение устройства 1111
        </Typography>
  
        <CloseIcon  sx={{color: '#1976D2'}}
             onClick={ ()=>{this.closeModal();}}
             />
        </Box>  
        
        <Divider sx = {{marginBottom: '20px'}}/>

         
        <TextField
          sx={{ mt: "14px" }}
          inputProps={{ style: { fontSize: 12 } }} 
          InputLabelProps={{ style: { fontSize: 12 } }} 
          variant="outlined"
          fullWidth
          required
          label="Место расположения"
          autoComplete="место расположения"
          autoFocus
          size="small"
          onChange={(e) => {
            APP_STORAGE.devs_groups.setName(e.target.value);
          }}
          value={APP_STORAGE.devs_groups.getName()}
        />

        <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
          <InputLabel className="org" sx={{ fontSize: "12px" }}>
            Организация
          </InputLabel>
          <Select
            sx={{ fontSize: "12px" }}
            value={APP_STORAGE.devs_groups.getKeyOrg() || ""}
            label="организация"
            onChange={(e) => {
              this.SelectedOrg(e.target.value);
            }}
          >
            {options_org}
            <Divider />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                m: 1,
                borderRadius: "4px",
              }}
            >
        
            </Box>
          </Select>
        </FormControl>

         <TextField
          sx={{ mt: "14px" }}
          inputProps={{ style: { fontSize: 12 } }} 
          InputLabelProps={{ style: { fontSize: 12 } }} 
          variant="outlined"
          fullWidth
          required
          label="Долгота"
          autoComplete="долгота"
          autoFocus
          size="small"
          onChange={(e) => {
            APP_STORAGE.devs_groups.setLongitude(e.target.value);
          }}
          value={APP_STORAGE.devs_groups.getLongitude()}
        />

          <TextField
          sx={{ mt: "14px" }}
          inputProps={{ style: { fontSize: 12 } }} 
          InputLabelProps={{ style: { fontSize: 12 } }} 
          variant="outlined"
          fullWidth
          required
          label="Широта"
          autoComplete="широта"
          autoFocus
          size="small"
          onChange={(e) => {
            APP_STORAGE.devs_groups.setLatitude(e.target.value);
          }}
          value={APP_STORAGE.devs_groups.getLatitude()}
        />
         <Divider sx={{ padding: "12px" }} />
          <Typography sx={{ color: "#999999" }} variant="caption">
            Информация:
          </Typography>

          <TextareaAutosize
            className="info"
            aria-label="minimum height"
            minRows={4}
            style={{ width: "100%" }}
            onChange={(e) => {
                APP_STORAGE.devs_groups.setInfo(e.target.value);
            }}
            value={APP_STORAGE.devs_groups.getInfo()}
          />

          <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "flex-end",
          }}
        >
          <Button
            sx={{
              background: "#266BF1",
              color: "#fff;",
              mt: "18px",
              mb: "18px",
              fontSize: "12px",
            }}
             onClick={() => {
              APP_STORAGE.devs_groups.set_NewDevGroup("sess_id", APP_STORAGE.auth_form.getdt());
            }}
          >
            Сохранить
          </Button>
        </Box>
             
        </Box>
     
  
        </Dialog>
    
    
        </React.Fragment>
    );
  }
}
