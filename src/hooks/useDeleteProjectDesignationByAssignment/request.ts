import axios from '@/config/axios';
interface IDeleteProjectDesignationByAssignment {
  projectDesignationId: string;
}

export const deleteProjectDesignationByAssignment = async (
  body: IDeleteProjectDesignationByAssignment
) => {
  const data = await axios.delete(
    `/project-designations/${body.projectDesignationId}`
  );
  return data;
};
