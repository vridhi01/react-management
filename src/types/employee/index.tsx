import React from "react";

export interface employecred {
  userEmail: string;
  userPassword: string;
}

export interface employeealldata {
  userName: string | any;
  userRole: string | any;
  userEmail: string | any;
  userPassword: string | any;
  userId?: string | any;
}

export interface deleteEmployeedata {
  userId: string;
}

export type deleteData = {
  deleteopen: boolean;
  deleteid: string;
  setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Props = {
  editData: employeealldata | null;
  open: boolean;
  edit: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type listemployeeData = {
  employeedata: {
    userEmail: string;
    userId: string;
    userName: string;
    userRole: string;
  }[];

  handleDeleteClick: (userId: string) => void;

  handleCardClick: (data: {
    userEmail: string;
    userId: string;
    userName: string;
    userRole: string;
  }) => void;
};
