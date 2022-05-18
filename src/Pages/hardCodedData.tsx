import React from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

export const teamDetails = [
  "nodejs",
  "angular",
  "react",
  "reactNative",
  "flutter",
  "python",
  "magento"
];
export const prodjectType = ["fixed Price", "Hourly Based"];

export const userRole = ["User", "Admin"];

export const drawerList = [
  {
    projectName: "Dashboard",
    projectLink: "home",
    projectIcon: <DashboardOutlinedIcon />
  },
  {
    projectName: "Project Management",
    projectLink: "projects",
    projectIcon: <LibraryBooksOutlinedIcon />
  },
  {
    projectName: "User Management",
    projectLink: "users",
    projectIcon: <GroupOutlinedIcon />
  }
];

export const projectStatus = ["taskcomplete", "taskpending"];
