import * as React from "react";

import { observer } from "mobx-react";
import { toJS } from "mobx";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { Box, Typography, TextField, ListItemIcon, Menu , MenuItem, Link, Button, IconButton} from "@mui/material";

import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";
import { TDGroup } from "../../../storage/components/Devs/DevEntityes";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";

import DirectionsIcon from '@mui/icons-material/Directions';






interface IProps {}

//Устройства
@observer
export class MenuDevs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async editDevice(a:any) { /////////////////////////////////////////Кнопка редактирования
    APP_STORAGE.devs.setMenu_devs(a);
    let DevGr: any;
    DevGr = APP_STORAGE.devs_groups.getDevsGroups();
    return this.PassValueEditForm(DevGr); 
  }

  PassValueEditForm(dgrs: TDevsGroup[]) {
    var dev = APP_STORAGE.devs;
    var devGr = APP_STORAGE.devs_groups;
    var parent: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;
      var gr_devs = dgr.devs;
      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.PassValueEditForm(gr_childs);

      parent.push(childs);
      for (var key in gr_devs) {
        if (
          "_dev_id_key_" + gr_devs[key].id === APP_STORAGE.devs.getIdChild()
        ) {
          dev.setNumber(String(gr_devs[key].number));
          devGr.setParentId('key-09');
          dev.setName(String(gr_devs[key].name));
          dev.setLongitude(String(gr_devs[key].longitude));
          dev.setLatitude(String(gr_devs[key].latitude));
          dev.setInfo(String(gr_devs[key].info));
          dev.setChangeSensors(gr_devs[key].sensors.s);
          dev.setId(String(gr_devs[key].id));
          dev.setGroupDevId(String(gr_devs[key].group_dev_id));
          dev.setCheckboxEd(gr_devs[key].deleted);
            

      if(dev.getMenu_devs() === '1')
          {dev.setOpenModalChange(true);
            devGr.setOpen_menu(false);
          }
      if(dev.getMenu_devs() === '2'){
        devGr.setOpenModalMoveDevsGr(true);
        devGr.setOpen_menu(false);
          }
          
        }
      }
    }
    return parent;
  }



  render(): React.ReactNode {
    var devGr = APP_STORAGE.devs_groups;



    return (
<div>
                                      <IconButton
                                      onClick={() => {
                                        devGr.setOpen_menu(true);
                                      }}
                                      id="long-button555"
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
                                      anchorEl={document.getElementById("long-button555")}
                                      open={devGr.getOpen_menu()}
                                      onClose={() => {
                                      devGr.setOpen_menu(false);
                                      }}
                                      >
                                      <MenuItem onClick={() => this.editDevice('1')}>
                                      <ListItemIcon>
                                      <ModeEditRoundedIcon fontSize="small" />
                                      </ListItemIcon>{" "}
                                      Редактировать
                                      </MenuItem>

                                      <MenuItem onClick={() => this.editDevice('2')} >
                                      <ListItemIcon>
                                      <LogoutRoundedIcon fontSize="small" />
                                      </ListItemIcon>{" "}
                                      Переместить
                                      </MenuItem>
                                      </Menu>
                                      </div>
    
    );
  }
}











