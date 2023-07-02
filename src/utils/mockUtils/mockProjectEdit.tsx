import useProject from '@/hooks/useProject';

const mockResponse = {
  data: {
    data: {
      updateProject: {
        projectId: '567318f5-de9f-4498-8d39-b1546d3acefb',
        name: 'Miferia',
        description: 'Miferia description',
        status: 'Active',
      },
    },
  },
};

jest.mock('@/hooks/useProject');
export const updateProjectMockData = () => {
  (useProject as jest.Mock).mockReturnValue({
    updateProjectLoading: false,
    updateProjectAction: jest
      .fn()
      .mockImplementation((a, b) => b.onSuccess(mockResponse)),
  });
};

export const updateProjectErrorMockData = () => {
  (useProject as jest.Mock).mockReturnValue({
    updateProjectLoading: false,
    updateProjectAction: jest.fn().mockImplementation((a, b) => b.onError()),
  });
};
