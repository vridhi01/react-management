export type filterUserData = {
  userRole: string;
};

export interface projectalldata {
  projectName: string;
  link: string;
  description: string;
  rate: string;
  team: string;
  createdDate: string;
  endedDate: string;
  projectType: string;
  projectid: string;
  userData: any;
  clientName: string;
}

export type projectProps = {
  editData: projectalldata | null;
  open: boolean;
  edit: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface addProjectData {
  projectName: string | any;
  projectType: string | any;
  createdDate: string | any;
  Description: string | any;
  Link: string | any;
  Rate: string | any;
  Team: string | any;

  clientName: string | any;
  endedDate: string | any;
  userData: any;
}

export interface editProjectData {
  projectName: string | any;
  projectType: string | any;
  createdDate: string | any;
  Description: string | any;
  Link: string | any;
  Rate: string | any;
  Team: string | any;
  projectId: string | any;
  clientName: string | any;
  endedDate: string | any;
  userData: any;
}

export type listprojectData = {
  projectData: {
    projectName: string;
    link: string;
    clientName: string;
    description: string;
    rate: string;
    team: string;
    createdDate: string;
    projectType: string;
    projectid: string;
    endedDate: string;
    userData: any;
  }[];

  handleProjectDeleteClick: (projectid: string) => void;

  handleProjectCardClick: (data: {
    projectName: string;
    link: string;
    clientName: string;
    description: string;
    rate: string;
    team: string;
    createdDate: string;
    projectType: string;
    projectid: string;
    userData: any;
  }) => void;
};
