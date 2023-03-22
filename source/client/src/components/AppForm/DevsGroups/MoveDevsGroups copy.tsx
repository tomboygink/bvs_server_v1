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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import CloseIcon from "@mui/icons-material/Close";
import { APP_STORAGE } from "../../../storage/AppStorage";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";

import { AntSwitch } from "../AppBarPanel/LeftPanel/RegistationUsers/switch";

import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";
import { TDGroup } from "../../../storage/components/Devs/DevEntityes";
import { options } from "../Devs/StyledMua";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

interface IProps {}

//Компонент формы приложения
@observer
export class MoveDevsGroups extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
    APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt());
  }

  async closeModal() {
    APP_STORAGE.devs_groups.setOpenModalMoveDevsGr(false);
     
    APP_STORAGE.devs_groups.setParentId('');
    APP_STORAGE.devs_groups.setParent('');
    APP_STORAGE.devs_groups.setName('');
    APP_STORAGE.devs_groups.setLatitude('');
    APP_STORAGE.devs_groups.setLongitude('');
    APP_STORAGE.devs.setInfo('');
    APP_STORAGE.devs_groups.setKeyOrg('');
    APP_STORAGE.devs_groups.setParentId('')
  }

  async SelectedOrg(a: any) {
    //// Сохраняем , то что выбрал пользователь из выпадающего списка Организации
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  async SelectedDevsGroups(a: any) {
    APP_STORAGE.devs_groups.setKeyDevsgr(a);
    APP_STORAGE.devs_groups.setParent(a);
    APP_STORAGE.devs.setGroupDevId(a);
  }

  drawDevLocation(): React.ReactNode {
    let DevGr: any;
    DevGr = APP_STORAGE.devs_groups.getDevsGroups();
    return this.drawDevGroup(DevGr);
  }

  drawDevGroup(dgrs: TDevsGroup[]): React.ReactNode[] {
    let parent: React.ReactNode[] = new Array();

    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;

      var childs = new Array();
      if (gr_childs.length > 0) childs = this.drawDevGroup(gr_childs);

      if (Number(APP_STORAGE.devs_groups.getKeyOrg()) === Number(gr.org_id)) {
        if (
          Number(APP_STORAGE.devs_groups.getParentId()) !==
            Number(gr.parent_id) &&
          Number(APP_STORAGE.devs.getIdDevs()) !== Number(gr.id)
        ) {
          parent.push(
            <React.Fragment key={"_gr_id_key_" + gr.id}>
              <Box sx={{ display: "flex" }}>
                <TreeItem nodeId={String(gr.id)} label={gr.g_name}>
                  {childs}
                </TreeItem>
              </Box>
            </React.Fragment>
          );
        }

       else  if (
          String(APP_STORAGE.devs_groups.getParentId()) ===
            String('key-09') 
        ) {
          parent.push(
            <React.Fragment key={"_gr_id_key_" + gr.id}>
              <Box sx={{ display: "flex" }}>
                <TreeItem nodeId={String(gr.id)} label={gr.g_name}>
                  {childs}
                </TreeItem>
              </Box>
            </React.Fragment>
          );
        }
        
      }
    }
    return parent;
  }

  async ChekedForEdit(editing: any) {
    APP_STORAGE.devs_groups.setCheckboxEd(editing.target.checked);
  }

  async SaveChangeDevsGroups(a: any) {
    if (Number(0) === Number(a)) {
      APP_STORAGE.devs_groups.setParent(String(0));
      APP_STORAGE.devs_groups.set_ChangeDevsGroups("sess_id",APP_STORAGE.auth_form.getdt());
    }

    if (APP_STORAGE.devs.getMenu_devs() === "2") { ////// Перемещение для устройств
      APP_STORAGE.devs.set_ChangeDevs("sess_id", APP_STORAGE.auth_form.getdt());
      setTimeout(() => {
        APP_STORAGE.devs_groups.setOpenModalMoveDevsGr(false)
      }, 2000) 
    }

    if (APP_STORAGE.devs.getMenu_devs() === "3") { ////// Перемещение дял групп устройств
      APP_STORAGE.devs_groups.set_ChangeDevsGroups("sess_id",APP_STORAGE.auth_form.getdt());
    }

    setTimeout(() => {
      APP_STORAGE.devs_groups.get_DevsGroups(
        "sess_id",
        APP_STORAGE.auth_form.getdt()
      );
    }, 500);
  }

  render(): React.ReactNode {
    let org = null;
    var options_org = [];
    if (APP_STORAGE.reg_user.getOrgAll()) {
      org = JSON.parse(JSON.stringify(APP_STORAGE.reg_user.getOrgAll()));
      for (var key in org) {
        if (org.hasOwnProperty(key)) {
          let a = org[key];
          options_org.push(
            /// создаем опции выбора для выпадающего списка - организации
            <MenuItem key={a.id} sx={{ fontSize: "12px" }} value={a.id}>
              {a.full_name}
            </MenuItem>
          );
        }
      }
    }
    return (
      <React.Fragment>
        <Dialog
          BackdropProps={{ style: { background: "rgba(0 0 0 / 12%)" } }}
          open={APP_STORAGE.devs_groups.getOpenModalMoveDevsGr()}
          fullWidth
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
              <Typography sx={{display: 'flex' , color: '#000'}}>Переместить <Typography sx = {{color: '#266BF1',  ml: '4px', mr: '4px'}}> { APP_STORAGE.devs_groups.getName()} </Typography>  {APP_STORAGE.devs.getMoveDev()}</Typography>

              <CloseIcon
                sx={{ color: "#1976D2" }}
                onClick={() => {
                  this.closeModal();
                }}
              />
            </Box>

            <Divider sx={{ marginBottom: "20px" }} />

            <FormControl
              fullWidth
              size="small"
              error={APP_STORAGE.devs_groups.getOrgError()}
            >
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
                ></Box>
              </Select>
            </FormControl>
            {APP_STORAGE.devs_groups.getKeyOrg() && (
              <Box
              className="move_devtree"
                sx={{
                  maxHeight: '200px',
                  overflow: 'auto'
                }}
              >
                
                <Typography sx={{pt: '12px', pb: '12px', pl: '5px'}}>Переместить в: </Typography>
                
                <TreeView
                  aria-label="multi-select"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  onNodeSelect={options}
                  multiSelect
                  sx={{ flexGrow: 1, maxWidth: "100%", overflowY: "auto" }}
                >
                  {this.drawDevLocation()}
                </TreeView>
              </Box>
            )}

 <Box sx={{ display: "flex" }}>
 { APP_STORAGE.devs.getMenu_devs() === "3" && 
 <Box
   sx={{
     display: "flex",
     alignItems: "baseline",
     justifyContent: "flex-end",
     mr: "40px",
   }}
   onClick={() => {
     this.SaveChangeDevsGroups(0);
   }}
 >
   <Button
     sx={{
       background: "#F1F5FC",
       color: "#000;",
       mt: "18px",
       mb: "18px",
       fontSize: "12px",
     }}
   >
     Переместить в корень
   </Button>
 </Box>
 }

<Box
   sx={{
     display: "flex",
     alignItems: "baseline",
     justifyContent: "flex-end",
   }}
   onClick={() => {
     this.SaveChangeDevsGroups(1);
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
   >
     Сохранить
   </Button>
 </Box>
 </Box>
 {APP_STORAGE.devs.getResulSave().length > 0 &&
       <Typography sx= {{background: '#EDF7ED', color : '#1E4620', p: '12px', borderRadius: '4px'}}> {APP_STORAGE.devs.getResulSave()}</Typography>
      }

{APP_STORAGE.devs_groups.getResulSave().length > 0 &&
       <Typography sx= {{background: '#EDF7ED', color : '#1E4620', p: '12px', borderRadius: '4px'}}> {APP_STORAGE.devs_groups.getResulSave()}</Typography>
      }
          </Box>
        </Dialog>
      </React.Fragment>
    );
  }
}