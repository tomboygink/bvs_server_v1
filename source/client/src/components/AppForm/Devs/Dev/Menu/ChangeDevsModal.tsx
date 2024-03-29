import React from "react";
import { observer } from "mobx-react";
import {
  TextField,
  Box,
  Dialog,
  Divider,
  Typography,
  TextareaAutosize,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  FormGroup,
} from "@mui/material";

import { AntSwitch } from "../../../AppBarPanel/LeftPanel/RegistationUsers/switch";
import AddIcon from "@mui/icons-material/Add";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { APP_STORAGE } from "../../../../../storage/AppStorage";
import { Change_ModalSensors } from "./AddSensorsModal";
import LongInput from "../../../../shared/LongInput";
import LatInput from "../../../../shared/LatInput";
import { TextInput } from "../../../../shared/TextInput";
import { CloseButton } from "../../../../shared/CloseButton";

interface IProps {}

//Компонент формы приложения
@observer
export class ChangeDevsModal extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async closeModal() {
    APP_STORAGE.devs.setOpenModalChange(false);

    APP_STORAGE.devs.setNumberError(false);
    APP_STORAGE.devs.setNumberError_mess("");
    APP_STORAGE.devs.setNumber("");

    APP_STORAGE.devs.setNameError(false);
    APP_STORAGE.devs.setNameError_mess("");
    APP_STORAGE.devs.setName("");

    APP_STORAGE.devs.setLongitudeError(false);
    APP_STORAGE.devs.setLongitudeError_mess("");
    APP_STORAGE.devs.setLongitude("");

    APP_STORAGE.devs.setLatitudeError(false);
    APP_STORAGE.devs.setLatitudeError_mess("");
    APP_STORAGE.devs.setLatitude("");
  }

  async SelectedOrg(a: any) {
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  async ChekedForEdit(editing: any) {
    APP_STORAGE.devs.setCheckboxEd(editing.target.checked);
  }

  async ChangeSensors(a: any) {
    APP_STORAGE.devs.setChangeSensorsValue(a);
    APP_STORAGE.devs.setDepthSensors_Ch(true);
  }

  async DeleteSensors(a: any) {
    var obj = JSON.parse(JSON.stringify(APP_STORAGE.devs.getChangeSensors()));
    for (var i in obj) {
      if (Number(a) === Number(obj[i].depth)) {
        delete obj[i].depth;
        delete obj[i].value;
      }
    }
    var newArray = obj.filter((value: {}) => Object.keys(value).length !== 0);
    APP_STORAGE.devs.setChangeSensors(newArray);
  }

  async AddSensors(a: any) {
    APP_STORAGE.devs.setChangeSensorsValue("add");
    APP_STORAGE.devs.setDepthSensors_Ch(true);
  }

  async ChangeDevs() {
    APP_STORAGE.devs.set_ChangeDevs("sess_id", APP_STORAGE.auth_form.getdt());
  }

  async SelectedPeriodSess(a: any) {
    APP_STORAGE.devs.setPeriodSess(a);
  }

  render(): React.ReactNode {
    let depth_sensors = []; //// массив сенсоров на устройстве
    let count: any = "";
    let org = null;
    var options_org = [];
    if (APP_STORAGE.reg_user.getOrgAll()) {
      org = JSON.parse(JSON.stringify(APP_STORAGE.reg_user.getOrgAll()));

      for (var key in org) {
        if (org.hasOwnProperty(key)) {
          let a = org[key];

          options_org.push(
            <MenuItem key={a.id} sx={{ fontSize: "12px" }} value={a.id}>
              {a.full_name}
            </MenuItem>
          );
        }
      }
    }

    let group_devs = [];
    let devs = JSON.parse(
      JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
    );

    for (var key in devs) {
      if (devs.hasOwnProperty(key)) {
        let a = devs[key];

        if (a.id === APP_STORAGE.devs.getIdChild()) {
          group_devs.push(<Typography> Родитель - {a.g_name} </Typography>);
        }
      }
    }

    if (APP_STORAGE.devs.getChangeSensors()) {
      const obj1: any = {};
      var obj = JSON.parse(JSON.stringify(APP_STORAGE.devs.getChangeSensors()));

      const uniqueChars = obj.reduce((o: any, i: any) => {
        ////////////////// Редюсом убираем дубликаты
        if (!o.find((v: { depth: any }) => v.depth == i.depth)) {
          o.push(i);
        }
        return o;
      }, []);

      for (let i = 0; i < uniqueChars.length; i++) {
        obj1[i] = uniqueChars[i];
        count = uniqueChars.length;

        if (uniqueChars[i].depth !== null) {
          depth_sensors.push(
            <TableRow key={uniqueChars[i].depth}>
              <TableCell
                key={uniqueChars[i].depth}
                sx={{
                  display: "flex",
                  fontWeight: "700",
                  border: "none",
                }}
                align="left"
              >
                <TextInput
                  id={"_id_s" + uniqueChars[i].depth}
                  label="Глубина"
                  value={uniqueChars[i].depth}
                />
              </TableCell>

              <TableCell
                align="left"
                sx={{ color: "#1976D2" }}
                onClick={(e) => {
                  this.AddSensors(
                    /////// Добавление сенсоров
                    (
                      document.getElementById(
                        "_id_s" + uniqueChars[i].depth
                      ) as HTMLInputElement
                    ).value
                  );
                }}
              >
                <AddIcon fontSize="small" />
              </TableCell>

              <TableCell
                align="left"
                sx={{ color: "#1976D2" }}
                onClick={(e) => {
                  this.ChangeSensors(
                    (
                      document.getElementById(
                        "_id_s" + uniqueChars[i].depth
                      ) as HTMLInputElement
                    ).value
                  );
                }}
              >
                <ModeEditOutlineOutlinedIcon fontSize="small" />
              </TableCell>

              <TableCell
                align="left"
                sx={{ color: "#FF4848" }}
                onClick={(e) => {
                  this.DeleteSensors(
                    (
                      document.getElementById(
                        "_id_s" + uniqueChars[i].depth
                      ) as HTMLInputElement
                    ).value
                  );
                }}
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </TableCell>
            </TableRow>
          );
        }
      }

      if (!obj.length) {
        depth_sensors.push(
          <TableRow key="key_0">
            <TableCell
              sx={{
                display: "flex",
                fontWeight: "700",
                border: "none",
              }}
              align="left"
            >
              <TextInput id={"_id_s" + 7777} disabled={true} label="Глубина" />
            </TableCell>

            <TableCell
              align="left"
              sx={{ color: "#1976D2" }}
              onClick={(e) => {
                this.AddSensors(1);
              }}
            >
              <AddIcon fontSize="small" />
            </TableCell>

            <TableCell align="left" sx={{ color: "#1976D2" }}>
              {/* <ModeEditOutlineOutlinedIcon fontSize="small" /> */}
            </TableCell>

            <TableCell align="left" sx={{ color: "#FF4848" }}>
              {/* <DeleteOutlineOutlinedIcon fontSize="small" /> */}
            </TableCell>
          </TableRow>
        );
      }
    }

    return (
      <React.Fragment>
        <Dialog
          componentsProps={{
            backdrop: { style: { backgroundColor: "rgba(0 0 0 / 35%)" } },
          }}
          open={APP_STORAGE.devs.getOpenModalChange()}
          PaperProps={{
            sx: {
              width: "100%",
              maxHeight: "100%",
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box
              className="ModalTitle"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: "12px",
              }}
            >
              <Typography>Редактировать устройство</Typography>
              <CloseButton onClose={() => this.closeModal()} />
            </Box>

            <Divider sx={{ marginBottom: "20px" }} />

            {group_devs}
            {/* <TextInput
              label="Номер устройства"
              error={APP_STORAGE.devs.getNumberError()}
              helperText={APP_STORAGE.devs.getNumberError_mess()}
              onChange={(e) => {
                APP_STORAGE.devs.setNumber(e.target.value);
              }}
              value={APP_STORAGE.devs.getNumber()}
            /> */}

            <TextInput
              error={APP_STORAGE.devs.getNumberError()}
              helperText={APP_STORAGE.devs.getNumberError_mess()}
              label="Номер устройства"
              onBlur={(e) => {
                APP_STORAGE.devs.setNumber(e.target.value);
              }}
              defaultValue={APP_STORAGE.devs.getNumber()}
            />

            <TextInput
              error={APP_STORAGE.devs.getNameError()}
              helperText={APP_STORAGE.devs.getNameError_mess()}
              label="Название устройства "
              onBlur={(e) => {
                APP_STORAGE.devs.setName(e.target.value);
              }}
              defaultValue={APP_STORAGE.devs.getName()}
            />

            <TextInput
              InputProps={{
                style: { fontSize: 12 },
                inputComponent: LatInput as any,
              }}
              error={APP_STORAGE.devs.getLatitudeError()}
              helperText={APP_STORAGE.devs.getLatitudeError_mess()}
              label="Широта"
              onBlur={(e) => {
                APP_STORAGE.devs.setLatitude(e.target.value);
              }}
              defaultValue={APP_STORAGE.devs.getLatitude()}
            />
            <TextInput
              InputProps={{
                style: { fontSize: 12 },
                inputComponent: LongInput as any,
              }}
              error={APP_STORAGE.devs.getLongitudeError()}
              helperText={APP_STORAGE.devs.getLongitudeError_mess()}
              label="Долгота"
              onBlur={(e) => {
                APP_STORAGE.devs.setLongitude(e.target.value);
              }}
              defaultValue={APP_STORAGE.devs.getLongitude()}
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
              // onChange={(e) => console.log("value=>", e.target.value)}
              onBlur={(e) => {
                APP_STORAGE.devs.setInfo(e.target.value);
              }}
              defaultValue={APP_STORAGE.devs.getInfo()}
            />
            <Box
              sx={{ border: "1px solid #eee", p: "12px", borderRadius: "4px" }}
            >
              <Typography sx={{ pb: "12px", fontSize: "12px" }}>
                Список сенсоров на устройстве : {count}
              </Typography>
              <TableContainer component={Paper} sx={{ maxHeight: "150px" }}>
                <Table aria-label="caption table">
                  <TableBody>{depth_sensors}</TableBody>
                </Table>
              </TableContainer>
              <Change_ModalSensors />
            </Box>

            <FormGroup sx={{ mt: "12px" }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  sx={{ ml: "12px", fontSize: "12px", color: "#266bf1" }}
                >
                  Заблокировать -{" "}
                </Typography>
                <AntSwitch
                  checked={APP_STORAGE.devs.getCheckboxEd()}
                  // Закомментировано для запуска
                  onChange={(editing) => {
                    this.ChekedForEdit(editing);
                  }}
                />
              </Stack>
            </FormGroup>

            <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
              <InputLabel className="org" sx={{ fontSize: "12px" }}>
                Период сессии
              </InputLabel>

              <Select
                value={APP_STORAGE.devs.getPeriodSess()}
                sx={{ fontSize: "12px" }}
                label="Период сессии"
                onBlur={(e) => {
                  this.SelectedPeriodSess(e.target.value);
                }}
              >
                <MenuItem key="4_sess" sx={{ fontSize: "12px" }} value="1">
                  Один раз в день
                </MenuItem>
                <MenuItem key="3_sess" sx={{ fontSize: "12px" }} value="7">
                  Один раз в неделю
                </MenuItem>
                <MenuItem key="2_sess" sx={{ fontSize: "12px" }} value="14">
                  Каждые две недели
                </MenuItem>
                <MenuItem key="1_sess" sx={{ fontSize: "12px" }} value="31">
                  Один раз в месяц
                </MenuItem>
                <Divider />
              </Select>
            </FormControl>

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
                  this.ChangeDevs();
                }}
              >
                Сохранить
              </Button>
            </Box>
            {APP_STORAGE.devs.getSuccessSave_mess().length > 0 && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="success">
                  {APP_STORAGE.devs.getSuccessSave_mess()}
                </Alert>
              </Stack>
            )}
            {APP_STORAGE.devs.getErrorSave_mess().length > 0 && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">
                  {APP_STORAGE.devs.getErrorSave_mess()}
                </Alert>
              </Stack>
            )}
          </Box>
        </Dialog>
      </React.Fragment>
    );
  }
}
