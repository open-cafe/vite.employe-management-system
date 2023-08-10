import axios from '@/config/axios';

interface IDeleteProjectDesignationByAssignment {
  projectDesignationId: string;
}

interface IAddProjectDesignationByAssignment {
  projectAssignmentId: string;
  tagId: string;
}

export const fetchProjectDesignationByAssignmemt = async (
  projectAssignmentId: string
) => {
  const data = await axios.get(
    `/project-designations/project-assignments/${projectAssignmentId}`
  );
  return data;
};

export const deleteProjectDesignationByAssignment = async (
  body: IDeleteProjectDesignationByAssignment
) => {
  const data = await axios.delete(
    `/project-designations/${body.projectDesignationId}`
  );
  return data;
};

export const addProjectDesignationByAssignment = async (
  body: IAddProjectDesignationByAssignment
) => {
  const data = await axios.post(`/project-designations`, body);
  return data;
};
