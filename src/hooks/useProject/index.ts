import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchProject,
  addProject,
  deleteProject,
  fetchProjectById,
  updateProject,
} from './request';

interface IProjectProps {
  projectId?: string;
  page?: number;
  limit?: number;
}

const useProject = ({ projectId, page, limit }: IProjectProps = {}) => {
  const fetchProjectFilterProps = {
    page: page as number,
    limit: limit as number,
  };
  const {
    isSuccess: projectSuccess,
    data: projectData,
    isLoading: projectLoading,
    isError: projectError,
  } = useQuery({
    queryKey: ['project', page, limit],
    queryFn: () => fetchProject(fetchProjectFilterProps),
    enabled: !!page && !!limit,
  });

  const {
    mutate: addProjectAction,
    isLoading: addProjectLoading,
    isError: addProjectError,
  } = useMutation({
    mutationFn: (body: {
      projectName: string;
      description: string;
      status: string;
    }) => addProject(body),
  });

  const { mutate: deleteProjectAction, isLoading: deleteProjectLoading } =
    useMutation({
      mutationFn: (body: { projectId: string }) => deleteProject(body),
    });

  const {
    isSuccess: projectByIdSuccess,
    data: projectByIdData,
    isLoading: projectByIdLoading,
    isError: projectByIdError,
  } = useQuery({
    queryKey: ['projectById', projectId],
    queryFn: () => fetchProjectById(projectId as string),
    enabled: !!projectId,
  });

  const {
    mutate: updateProjectAction,
    isLoading: updateProjectLoading,
    isSuccess: updateProjectSuccess,
  } = useMutation({
    mutationFn: (body: {
      projectId: string;
      projectName: string;
      description: string;
      status: string;
    }) => updateProject(body),
  });

  return {
    projectSuccess,
    projectData,
    projectLoading,
    projectError,
    addProjectAction,
    addProjectLoading,
    deleteProjectAction,
    deleteProjectLoading,
    projectByIdSuccess,
    projectByIdData,
    projectByIdLoading,
    projectByIdError,
    updateProjectAction,
    updateProjectLoading,
    addProjectError,
    updateProjectSuccess,
  };
};

export default useProject;
