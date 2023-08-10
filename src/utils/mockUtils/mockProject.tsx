import useProject from '@/hooks/useProject';

const mockResponse = {
  data: {
    data: {
      currentPage: 1,
      total: 1,
      perPage: 10,
      totalPage: 1,
      data: [
        {
          projectId: '6b6270f8-1f08-476e-a56b-139844bc0552',
          projectName: 'Jest',
          status: 'Active',
          description: 'It is a test automation framework',
        },
      ],
    },
  },
};

const fullMockResponse = {
  data: {
    data: {
      currentPage: 1,
      total: 12,
      perPage: 10,
      totalPage: 2,
      data: [
        {
          projectId: '6b70f8-1f08-476e-a56b-139844bc0552',
          projectName: 'Miferia',
          status: 'Active',
          description: 'It is a new project',
        },
      ],
    },
  },
};

const emptyResponse = {
  data: {
    data: {
      currentPage: 1,
      total: 0,
      perPage: 10,
      totalPage: 1,
      data: [],
    },
  },
};

jest.mock('@/hooks/useProject');
export const projectMockData = () => {
  (useProject as jest.Mock).mockReturnValue({
    projectLoading: false,
    projectData: mockResponse,
    projectError: false,
  });
};

export const emptyProjectMockData = () => {
  (useProject as jest.Mock).mockReturnValue({
    projectLoading: false,
    projectData: emptyResponse,
    projectError: false,
  });
};

export const loadingProjectMockData = () => {
  (useProject as jest.Mock).mockReturnValue({
    projectLoading: true,
    projectData: null,
    projectError: false,
  });
};

export const fullProjectMockData = () => {
  (useProject as jest.Mock).mockReturnValue({
    projectLoading: false,
    projectData: fullMockResponse,
    projectError: false,
  });
};
