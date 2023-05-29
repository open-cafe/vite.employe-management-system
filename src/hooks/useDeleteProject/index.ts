import { useMutation } from '@tanstack/react-query';
import { deleteProject } from './request';

const useDeleteProject = () => {
  const { mutate: deleteProjectAction, isLoading: deleteProjectLoading } =
    useMutation({
      mutationFn: (body: { projectId: string }) => deleteProject(body),
    });
  return { deleteProjectAction, deleteProjectLoading };
};

export default useDeleteProject;
