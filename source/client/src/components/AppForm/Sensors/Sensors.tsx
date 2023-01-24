import * as React from "react";
import { Box, Alert, Typography, TextField } from "@mui/material";

import SensorsIcon from "@mui/icons-material/Sensors";

import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell } from '@mui/material';
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import AddIcon from "@mui/icons-material/Add";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

import { TDevsGroup } from "../../../storage/components/DevEntityes";

interface IProps {}

//Компонент формы приложения
@observer
export class Sensors extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async closeModal() {
    APP_STORAGE.devs_groups.setOpenModal(false);
  }

  async SelectedOrg(a: any) {
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  async OpenModal() {
    APP_STORAGE.devs.setOpenModal(true);
  }

  drawSensors(dgrs: TDevsGroup[]): React.ReactNode[] {
    var sensors: React.ReactNode[] = new Array();          ////// отображаем сенсоры 
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr_childs = dgr.childs;
      var gr_devs = dgr.devs;

      for (var key1 in gr_devs) {
        if (
          "_dev_id_" + gr_devs[key1].id === APP_STORAGE.devs.getIdChild() &&
          APP_STORAGE.devs_groups.getMiddleForm() === 2
        ) {
          for (var key in gr_devs[key1].sensors.s) {
            sensors.push(
              <TableRow key={"sensors_id" + gr_devs[key1].sensors.s[key]}>
                <TableCell
                  sx={{ display: "flex", fontWeight: "700", border: "none" }}
                  align="left"
                >
                  <SensorsIcon
                    fontSize="small"
                    sx={{ pr: "9px", color: "#5be95b" }}
                  />
                  [{"" + gr_devs[key1].sensors.s[key]}]{" "}
                </TableCell>
                <TableCell align="left" sx={{ color: "#038F54" }}>
                  <AddIcon fontSize="small" />
                </TableCell>
                <TableCell align="left" sx={{ color: "#1976D2" }}>
                  <ModeEditOutlineOutlinedIcon fontSize="small" />
                </TableCell>
                <TableCell align="left" sx={{ color: "#FF4848" }}>
                  <DeleteOutlineOutlinedIcon fontSize="small" />
                </TableCell>
              </TableRow>
            );
          }
        }
      }

      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.drawSensors(gr_childs);

      sensors.push(childs);
    }
    return sensors;
  }


  drawDevLocation(): React.ReactNode {
    let devs_g = [];
    let DevGr = [];

    if (
      Object.keys(
        JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()))
      ).length !== 0 &&
      JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()))
        .constructor === Object
    ) {
      devs_g = JSON.parse(
        JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
      );
    }

    for (var key in devs_g) {
      if (devs_g.hasOwnProperty(key)) {
        let a = devs_g[key];
        let root = JSON.parse(a);

        if (root.childs.length > 0) {
          for (let i = 0; i < root.childs.length; i++) {
            DevGr.push(root.childs[i]);
          }
        }
      }
    }

    return this.drawSensors(DevGr);
  }

  render(): React.ReactNode {
    return (
      <>
        <Box
          className="wrapper-devs"
          sx={{
            mt: "44px",
            display: "flex",
            flexDirection: "column;",
            alignItems: "flex-start;",
            ml: "1rem",
            mr: "32px",
          }}
        >
          <Typography sx={{ fontWeight: "500", pb: "20px" }}>
            Список сенсоров
          </Typography>

          <Box
            sx={{
              width: "290px",
              p: "25px",
              background: "#fff",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: " 100%",
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Поиск"
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
              >
                <DirectionsIcon />
              </IconButton>
            </Paper>
          </Box>

          <Box
            sx={{
              width: "290px",
              p: "25px",
              mt: "22px",
              background: "#fff",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <TableContainer>
              <Table aria-label="caption table">
                <TableBody>{this.drawDevLocation()}</TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </>
    );
  }
}
