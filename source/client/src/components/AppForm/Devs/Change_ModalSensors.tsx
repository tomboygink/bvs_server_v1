import React from "react";
import { observer } from "mobx-react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";



import { APP_STORAGE } from "../../../storage/AppStorage";

interface IProps {}

//Компонент формы приложения
@observer
export class Change_ModalSensors extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async Change_sensors(){
    var obj = JSON.parse(JSON.stringify(APP_STORAGE.devs.getChangeSensors()));
    
    console.log('the array' ,JSON.parse(JSON.stringify(APP_STORAGE.devs.getChangeSensors())) );

    for (let i = 0; i < obj.length; i++){
      
      if( Number(APP_STORAGE.devs.getSensors()) !== Number(obj[i]) ){
        APP_STORAGE.devs.get_sensors.push(APP_STORAGE.devs.getSensors()); 
      }
    }
    APP_STORAGE.devs.setDepthSensors_Ch(false)
   
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <Box>
          <Modal
            open={APP_STORAGE.devs.getDepthSensors_Ch()} 
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                borderRadius: "4px",
                border: "none",
                boxShadow: 24,
                p: 4,
                outline: "none",
              }}
            >
              <Typography id="modal-modal-title">
              Изменить глубину датчика
              </Typography>

              <TextField
                size="small"
                fullWidth
                id="outlined-number"
                label="Глубина2"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps = {{ inputMode: 'decimal', step:0.1, pattern:'[0..9]*[\.][0..9]*' }} 
                onChange={(e) => {
                  APP_STORAGE.devs.setSensors(Number(e.target.value));
                }}
                value = {APP_STORAGE.devs.getSensors()}
                sx={{ mt: 2 }}
              />

              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                onClick={() => {
                  this.Change_sensors();
                }}
              >
                Сохранить
              </Typography>

              <Typography onClick={() => {APP_STORAGE.devs.setDepthSensors_Ch(false)}}>close</Typography>
            </Box>
          </Modal>
        </Box>
      </React.Fragment>
    );
  }
}
