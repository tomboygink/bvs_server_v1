import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {
  Box,
  Typography
} from "@mui/material";
import { APP_STORAGE } from '../../../storage/AppStorage';

const options = [
  'Редактировать',
  'Добавить в текущую '
];



export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      
      >
       
          <MenuItem  onClick={handleClose}>
            <Typography onClick = {()=> {APP_STORAGE.change_devs_groups.setOpenModalChDevsGr(true)}} > Редактировать</Typography>
          </MenuItem>
        
      </Menu>
    </div>
  );
}