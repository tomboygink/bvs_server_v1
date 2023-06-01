import * as React from 'react';
import { APP_STORAGE } from '../../../storage/AppStorage';



export const handleChangePage = (
  event: React.MouseEvent<HTMLButtonElement> | null,
  newPage: number,
) => {
  APP_STORAGE.devs.setPage(newPage);
};


export const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  APP_STORAGE.devs.setRowsPerPage(parseInt(event.target.value, 10));
  APP_STORAGE.devs.setPage(0);
};

