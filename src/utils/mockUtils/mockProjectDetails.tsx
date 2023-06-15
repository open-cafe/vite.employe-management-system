import useAllEmployee from '@/hooks/useAllEmployee';
import useCurrentUser from '@/hooks/useCurrentUser';
import useProject from '@/hooks/useProject';
import useProjectAssignments from '@/hooks/useProjectAssignments';

const mockResponse = {
  data: {
    data: {
      data: [
        {
          projectAssignmentId: 'a9204266-23bc-4814-81d4-7c7c097d2f67',
          projectId: '567318f5-de9f-4498-8d39-b1546d3acefb',
          employeeId: '97eccb69-c93f-43c1-8584-eb9eb96a34d8',
          employee: {
            employeeId: '97eccb69-c93f-43c1-8584-eb9eb96a34d8',
            hireDate: '2023-05-29T01:56:06.842Z',
            name: 'Shreyam Pokharel',
            userId: 'a58aefe4-cf8a-486b-bf74-bbbf743cf756',
            phone: '+9779845375892',
            designation: 'frontend developer',
            isActive: true,
          },
        },
      ],
      total: 5,
      currentPage: 1,
      totalPage: 1,
      perPage: 10,
    },
  },
};

const addProjectAssignmentMockResponse = {
  data: {
    data: {
      data: {
        employeeId: '42406d0a-5ad2-4f84-94dc-13ab7f56ceba',
        projectAssignmentId: '9e665295-245a-4e1d-9767-317b7f1d6f33',
        projectId: '5a1e1e91-bdba-4bfa-bbb6-eafe3250a955',
      },
    },
  },
};

const deleteMockResponse = {
  data: {
    data: 'Deleted successfully',
  },
};

jest.mock('@/hooks/useProjectAssignments');
export const projectAssignmentsMockData = () => {
  (useProjectAssignments as jest.Mock).mockReturnValue({
    projectAssignmentLoading: false,
    projectAssignmentData: mockResponse,
    projectAssignmentError: false,
    deleteProjectAssignmentLoading: false,
    deleteProjectAssignmentAction: jest.fn().mockImplementation((a, b) => {
      b.onSuccess(deleteMockResponse);
    }),
    addProjectAssignmentLoading: false,
    addProjectAssignmentAction: jest.fn().mockImplementation((a, b) => {
      b.onSuccess(addProjectAssignmentMockResponse);
    }),
  });
};

export const projectAssignmentsLoadingMock = () => {
  (useProjectAssignments as jest.Mock).mockReturnValue({
    projectAssignmentLoading: true,
    projectAssignmentData: {},
    projectAssignmentError: false,
  });
};

jest.mock('@/hooks/useCurrentUser');
export const currentUserMockData = () => {
  (useCurrentUser as jest.Mock).mockReturnValue({
    currentUserLoading: false,
    currentUserData: {
      data: {
        data: {
          getCurrentUser: {
            userId: 'a58aefe4-cf8a-486b-bf74-bbbf743cf756',
            email: 'new@new.io',
            name: 'New User',
            role: 'Admin',
          },
        },
      },
    },
  });
};

jest.mock('@/hooks/useProject');
export const projectMockData = () => {
  (useProject as jest.Mock).mockReturnValue({
    deleteProjectLoading: false,
    deleteProjectAction: jest.fn().mockImplementation((a, b) => {
      b.onSuccess(deleteMockResponse);
    }),
    projectByIdData: {
      data: {
        data: {
          projectId: '567318f5-de9f-4498-8d39-b1546d3acefb',
          projectName: 'Miferia',
          description: 'This is description',
          status: 'Active',
        },
      },
    },
  });
};

export const deleteProjectErrorMockData = () => {
  (useProject as jest.Mock).mockReturnValue({
    deleteProjectLoading: false,
    deleteProjectAction: jest.fn().mockImplementation((a, b) => {
      b.onError();
    }),
  });
};

jest.mock('@/hooks/useAllEmployee');
export const allEmployeeMockData = () => {
  (useAllEmployee as jest.Mock).mockReturnValue({
    allEmployeeLoading: false,
    allEmployeeData: {
      data: {
        data: [
          {
            employeeId: '97eccb69-c93f-43c1-8584-eb9eb96a34d8',
            hireDate: '2023-05-29T01:56:06.842Z',
            name: 'Shreyam Pokharel',
            userId: 'a58aefe4-cf8a-486b-bf74-bbbf743cf756',
            phone: '+9779845375892',
            designation: 'frontend developer',
            isActive: true,
          },
        ],
        total: 5,
        currentPage: 1,
        totalPage: 1,
        perPage: 10,
      },
    },
  });
};

export const deleteProjectAssignmentErrorMockData = () => {
  (useProjectAssignments as jest.Mock).mockReturnValue({
    projectAssignmentLoading: false,
    projectAssignmentData: mockResponse,
    projectAssignmentError: false,
    deleteProjectAssignmentLoading: false,
    deleteProjectAssignmentAction: jest.fn().mockImplementation((a, b) => {
      b.onError();
    }),
  });
};

export const addProjectAssignmentErrorMockData = () => {
  (useProjectAssignments as jest.Mock).mockReturnValue({
    projectAssignmentLoading: false,
    projectAssignmentData: mockResponse,
    projectAssignmentError: false,
    addProjectAssignmentLoading: false,
    addProjectAssignmentAction: jest.fn().mockImplementation((a, b) => {
      b.onError();
    }),
  });
};

export const projectAssignmentErrorMockData = () => {
  (useProjectAssignments as jest.Mock).mockReturnValue({
    projectAssignmentLoading: false,
    projectAssignmentData: null,
    projectAssignmentError: true,
  });
};
