import * as React from "react";
import { Box,Typography} from "@mui/material";


import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";



interface IProps {}

//Компонент формы приложения
@observer
export class Devs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async closeModal() {
    APP_STORAGE.devs_groups.setOpenModal(false);
  }

  async SelectedOrg(a: any) {//// Сохраняем , то что выбрал пользователь из выпадающего списка Организации
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  async OpenModal(){
    APP_STORAGE.devs.setOpenModal(true);
  }

  render(): React.ReactNode {
    let group_dev = [];
    let name_group_dev = []; /// контейнер для списка устройств

    let devs = [];
    let devs_form = [];

     if (APP_STORAGE.devs.getDevs()) {
      devs = JSON.parse(
        JSON.stringify(APP_STORAGE.devs.getDevs())
      );
      for (var key in devs) {
        if (devs.hasOwnProperty(key)) {
          let a = devs[key];
              
          if (a.id === APP_STORAGE.devs.getIdDev()) {
            devs_form.push(
             <>
          <Box
              sx={{
                display: "flex",
                background: "aliceblue",
                borderRadius: "4px",
                flexDirection: 'column',
                p: "18px",
              }}
            >
          <Typography >Номер устройства - {a.number}</Typography>
        <Typography>Название устройства - {a.name}</Typography>
        <Typography>Долгота - {a.latitude}</Typography> 
        <Typography>Широта - {a.longitude}</Typography>
        <Typography>Информация - {a.info}</Typography> 
        
          </Box>
              </>  
             );
          }
        }
      }

     }

   
  


    if (APP_STORAGE.devs_groups.getDevsGroups()) {
      group_dev = JSON.parse(
        JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
      );

      for (var key in group_dev) {
        if (group_dev.hasOwnProperty(key)) {
          let a = group_dev[key];
          if (a.id === APP_STORAGE.devs.getIdDevs() || a.id === APP_STORAGE.devs.getIdChild()) {

           name_group_dev.push(
              
            <Box
            sx={{
              boxShadow: "4px 6px 14px 2px rgb(0 0 0 / 4%);",
              width: "990px",
              background: "#fff",
              p: "25px",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mb: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>{a.g_name}</Typography>
              <Typography sx={{}}>Заводской номер - 6666</Typography>
            </Box>


            {devs_form}
            <Box
                sx={{
                  background: "#F1F5FC",
                  width: "180px",
                  color: "#000",
                  p: "8px",
                  borderRadius: "4px",
                  mt: '12px'
                }}
                onClick={() => {
                  this.OpenModal();
                }}
              >
                <Typography> Добавить устройство</Typography>
              </Box>
    </Box>

           )
             
  
            
         }
        }
      }
    }
    

    return (
      <React.Fragment>
        <Box
          className="wrapper-devs"
          sx={{
            mt: "44px",
            display: "flex",
            flexDirection: "column;",
            alignItems: "flex-start;",
            ml: "1rem",
          }}
        >
          <Typography sx={{ fontWeight: "500", pb: "20px" }}>
            Список устройств
          </Typography>

         {name_group_dev}
          
        </Box>
      </React.Fragment>
    );
  }
}
