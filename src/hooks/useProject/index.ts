import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchProject,
  addProject,
  deleteProject,
  fetchProjectById,
} from './request';

const useProject = (projectId?: string, page?: number, limit?: number) => {
  const {
    isSuccess: projectSuccess,
    data: projectData,
    isLoading: projectLoading,
    isError: projectError,
  } = useQuery({
    queryKey: ['project', page, limit],
    queryFn: () => fetchProject(page as number, limit as number),
    enabled: !!page && !!limit,
  });

  const { mutate: addProjectAction, isLoading: addProjectLoading } =
    useMutation({
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
  };
};

export default useProject;
