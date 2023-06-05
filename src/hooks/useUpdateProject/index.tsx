import { useMutation } from '@tanstack/react-query';
import { updateProject } from './request';

const useUpdateProject = () => {
  const { mutate: updateProjectAction, isLoading: updateProjectLoading } =
    useMutation({
      mutationFn: (body: {
        projectId: string;
        projectName: string;
        description: string;
        status: string;
      }) => updateProject(body),
    });
  return { updateProjectAction, updateProjectLoading };
};

export default useUpdateProject;
