import { useMutation } from '@tanstack/react-query';
import { addProject } from './result';

const useAddProject = () => {
  const { mutate: addProjectAction, isLoading: addProjectLoading } =
    useMutation({
      mutationFn: (body: { projectName: string; description: string }) =>
        addProject(body),
    });
  return { addProjectAction, addProjectLoading };
};

export default useAddProject;
