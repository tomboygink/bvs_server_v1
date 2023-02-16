import React from "react";
import { observer } from "mobx-react";

import { Box, Typography, TextField, ListItemIcon } from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";

import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";
import { TDGroup } from "../../../storage/components/Devs/DevEntityes";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Divider from "@mui/material/Divider";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";

////////////////////////////////////Импортируем функции

interface IProps {}

//Устройства
@observer
export class DevLocation extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async OpenModal(e: any, org_id: any) {
    APP_STORAGE.devs_groups.setOrg(Number(org_id));
    APP_STORAGE.devs_groups.setParentId(e);
    APP_STORAGE.devs_groups.setOpenModal(true);
    APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt()); /// получаем все организации
  }
  async UpdateDate() {
    APP_STORAGE.devs.setOpenModal(true);
  }
  async editDeviceLocation() {
    APP_STORAGE.devs_groups.setOpen_menu(false);
    let DevGr: any;
    DevGr = APP_STORAGE.devs_groups.getDevsGroups();
    return this.getValueCh(DevGr);
  }

  async moveDeviceLocation(a: any) {
    APP_STORAGE.devs.setMenu_devs(a);
    APP_STORAGE.devs_groups.setOpen_menu(false);
    let DevGr: any;
    DevGr = APP_STORAGE.devs_groups.getDevsGroups();
     

    return this.getValueMove(DevGr);
  }



  

  getValueCh(dgrs: TDevsGroup[]) {
    var parent: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;

      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.getValueCh(gr_childs);

      parent.push(childs);

      if (APP_STORAGE.devs.getIdDevs() === String(gr.id)) {
        APP_STORAGE.devs_groups.setName(String(gr.g_name));
        APP_STORAGE.devs_groups.setLongitude(String(gr.longitude));
        APP_STORAGE.devs_groups.setLatitude(String(gr.latitude));
        APP_STORAGE.devs_groups.setInfo(String(gr.g_info));
        APP_STORAGE.devs_groups.setKeyOrg(String(gr.org_id));
        APP_STORAGE.devs_groups.setParent(String(gr.parent_id));
        APP_STORAGE.devs_groups.setCheckboxEd(gr.deleted);

        APP_STORAGE.devs_groups.setOpenModalChDevsGr(true);
      }
    }
    return parent;
  }

  getValueMove(dgrs: TDevsGroup[]) {
    let array = [];
    var parent: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;

      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.getValueMove(gr_childs);

      parent.push(childs);

      if (Number(gr.parent_id) === 0) {
        array.push(gr.parent_id);
      }

      APP_STORAGE.setdevs_group_move(array);

      if (APP_STORAGE.devs.getIdDevs() === String(gr.id)) {
        APP_STORAGE.devs_groups.setParentId(String(gr.id));
        APP_STORAGE.devs_groups.setParent(String(gr.parent_id));
        APP_STORAGE.devs_groups.setName(gr.g_name);
        APP_STORAGE.devs_groups.setLatitude(gr.longitude);
        APP_STORAGE.devs_groups.setLongitude(gr.longitude);
        APP_STORAGE.devs.setCheckboxEd(gr.deleted);
        APP_STORAGE.devs.setInfo(gr.g_info);

        APP_STORAGE.devs_groups.setOpenModalMoveDevsGr(true);
      }
    }
    return parent;
  }

  drawDevGroup(dgrs: TDevsGroup[]): React.ReactNode[] {
    let array_parentid = [];
    let parent: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;

      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.drawDevGroup(gr_childs);

      parent.push(
        <React.Fragment key={"_gr_id_key_" + gr.id}>
          <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
            <Box id={String(gr.id)}>{childs}</Box>
          </Box>
        </React.Fragment>
      );

      if (APP_STORAGE.devs.getIdDevs() === String(gr.id)) {
        if (Number(gr.parent_id) === 0 && array_parentid.length === 1) {
        }

        if (gr.deleted === true) {
          parent.push(
            <React.Fragment key={String(gr.id)}>
              <Box
                id="long-button"
                sx={{
                  width: "100%",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  p: "20px",
                  mb: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: "#808080",
                      }}
                    >
                      Место расположения устройства:
                    </Typography>
                  </Box>
                  {APP_STORAGE.getRoleWrite() === 2 &&
                    APP_STORAGE.getRoleRead() === 1 && (
                      <div>
                        <IconButton
                          onClick={() => {
                            APP_STORAGE.devs_groups.setOpen_menu(true);
                          }}
                          id="long-button_menu"
                          aria-label="more"
                          aria-controls={open ? "long-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          // onClick={handleClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            "aria-labelledby": "long-button",
                          }}
                          anchorEl={document.getElementById("long-button_menu")}
                          open={APP_STORAGE.devs_groups.getOpen_menu()}
                          onClose={() => {
                            APP_STORAGE.devs_groups.setOpen_menu(false);
                          }}
                        >
                          
                          <MenuItem onClick={() => this.editDeviceLocation()}>
                            <ListItemIcon>
                              <ModeEditRoundedIcon fontSize="small" />
                            </ListItemIcon>{" "}
                            Редактировать
                          </MenuItem>

                          <MenuItem>
                            <Typography
                              onClick={() => this.moveDeviceLocation("3")}
                            >
                              {" "}
                              Переместить
                            </Typography>
                          </MenuItem>
                        </Menu>
                      </div>
                    )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    borderRadius: "4px",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    label="Место расположения"
                    autoFocus
                    disabled={true}
                    value={gr.g_name}
                  />

                  <TextField
                    variant="outlined"
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="Долгота"
                    label="Долгота"
                    autoFocus
                    disabled={true}
                    value={gr.longitude}
                  />

                  <TextField
                    variant="outlined"
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="Широта"
                    label="Широта"
                    autoFocus
                    disabled={true}
                    value={gr.latitude}
                  />
                  <Box id={gr.org_id}></Box>
                </Box>
              </Box>
            </React.Fragment>
          );
        } else {
          parent.push(
            <React.Fragment key={String(gr.id)}>
              <Box
                id="long-button"
                sx={{
                  width: "100%",
                  background: "#fff",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: "20px",
                  mb: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: "#000",
                      }}
                    >
                      Место расположения устройства:
                    </Typography>
                  </Box>
                  {APP_STORAGE.getRoleWrite() === 2 &&
                    APP_STORAGE.getRoleRead() === 1 && (
                      <div>
                        <IconButton
                          onClick={() => {
                            APP_STORAGE.devs_groups.setOpen_menu(true);
                          }}
                          id="long-button_menu"
                          aria-label="more"
                          aria-controls={open ? "long-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            "aria-labelledby": "long-button",
                          }}
                          anchorEl={document.getElementById("long-button_menu")}
                          open={APP_STORAGE.devs_groups.getOpen_menu()}
                          onClose={() => {
                            APP_STORAGE.devs_groups.setOpen_menu(false);
                          }}
                        >
                          <MenuItem onClick={() => this.editDeviceLocation()}>
                            <ListItemIcon>
                              <ModeEditRoundedIcon fontSize="small" />
                            </ListItemIcon>{" "}
                            Редактировать
                          </MenuItem>

                          <MenuItem
                            onClick={() => this.moveDeviceLocation("3")}
                          >
                            <ListItemIcon>
                              <LogoutRoundedIcon fontSize="small" />
                            </ListItemIcon>{" "}
                            Переместить
                          </MenuItem>

                          <Divider />
                          <MenuItem>
                            <Typography
                              onClick={() =>
                                APP_STORAGE.devs.setOpenModal(true)
                              }
                            >
                              {" "}
                              Добавить устройство
                            </Typography>
                          </MenuItem>

                          <MenuItem
                            onClick={() =>
                              this.OpenModal(
                                APP_STORAGE.devs.getIdDevs(),
                                Number(gr.org_id)
                              )
                            }
                          >
                            <ListItemIcon>
                              <CreateNewFolderOutlinedIcon fontSize="small" />
                            </ListItemIcon>{" "}
                            Добавить подруппу
                          </MenuItem>
                        </Menu>
                      </div>
                    )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    borderRadius: "4px",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="Место расположения"
                    label="Место расположения"
                    autoFocus
                    ///onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                    value={gr.g_name}
                  />

                  <TextField
                    variant="outlined"
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="Долгота"
                    label="Долгота"
                    autoFocus
                    ///onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                    value={gr.longitude}
                  />

                  <TextField
                    variant="outlined"
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="Широта"
                    label="Широта"
                    autoFocus
                    ///onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                    value={gr.latitude}
                  />
                  <Box id={gr.org_id}></Box>
                </Box>
              </Box>
            </React.Fragment>
          );
        }
      }
    }
    return parent;
  }

  drawDevLocation(): React.ReactNode {
    let DevGr: any;
    DevGr = APP_STORAGE.devs_groups.getDevsGroups();
    return this.drawDevGroup(DevGr);
  }

  render(): React.ReactNode {
    return <React.Fragment>
       <Typography sx={{ fontWeight: "500" , color: '#111111', mb : '8px'}}>
              {" "}
              Данные по расположению устройства{" "}
            </Typography>
      {this.drawDevLocation()}
      </React.Fragment>;
  }
}
