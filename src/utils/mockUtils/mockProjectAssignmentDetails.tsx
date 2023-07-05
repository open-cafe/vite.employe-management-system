import useTag from '@/hooks/useTag';
import useProjectDesignationByAssignment from '@/hooks/useProjectDesignationByAssignment';

jest.mock('@/hooks/useTag');
export const tagMockData = () => {
  (useTag as jest.Mock).mockReturnValue({
    tagData: {
      data: {
        data: {
          data: [
            {
              tagId: '1',
              tagName: 'Frontend',
            },
            {
              tagId: '2',
              tagName: 'Backend',
            },
          ],
        },
      },
    },
    tagError: false,
    tagSuccess: true,
    tagLoading: false,
  });
};

const mockResponse = {
  data: {
    data: {
      data: [
        {
          designationId: '1',
          tag: {
            tagId: '1',
            tagName: 'Frontend',
          },
          projectAssignmentId: '1',
        },
        {
          designationId: '2',
          tag: {
            tagId: '2',
            tagName: 'Backend',
          },
          projectAssignmentId: '1',
        },
      ],
    },
  },
};

const deleteMockResponse = {
  data: {
    data: 'Deleted successfully',
  },
};

jest.mock('@/hooks/useProjectDesignationByAssignment');
export const addProjectDesignationByAssignmentMockDataError = () => {
  (useProjectDesignationByAssignment as jest.Mock).mockReturnValue({
    addProjectDesignationByAssignmentLoading: false,
    addProjectDesignationByAssignmentAction: jest
      .fn()
      .mockImplementation((a, b) => b.onError()),
  });
};

export const projectDesignationByAssignmentMockData = () => {
  (useProjectDesignationByAssignment as jest.Mock).mockReturnValue({
    projectDesignationData: {
      data: {
        data: {
          data: [
            {
              designationId: '1',
              designation: 'React Developer',
              tag: { tagName: 'Backend', tagId: '1' },
            },
          ],
        },
      },
    },
    projectDesignationError: false,
    projectDesignationSuccess: true,
    projectDesignationLoading: false,
    addProjectDesignationByAssignmentLoading: false,
    addProjectDesignationByAssignmentAction: jest
      .fn()
      .mockImplementation((a, b) => b.onSuccess(mockResponse)),
    deleteProjectDesignationByAssignmentLoading: false,
    deleteProjectDesignationByAssignmentAction: jest
      .fn()
      .mockImplementation((a, b) => b.onSuccess(deleteMockResponse)),
  });
};

export const deleteProjectDesignationByAssignmentMockDataError = () => {
  (useProjectDesignationByAssignment as jest.Mock).mockReturnValue({
    projectDesignationData: {
      data: {
        data: {
          data: [
            {
              designationId: '1',
              designation: 'React Developer',
              tag: { tagName: 'Backend', tagId: '1' },
            },
          ],
        },
      },
    },
    projectDesignationError: false,
    projectDesignationSuccess: true,
    projectDesignationLoading: false,
    deleteProjectDesignationByAssignmentLoading: false,
    deleteProjectDesignationByAssignmentAction: jest
      .fn()
      .mockImplementation((a, b) => b.onError()),
  });
};
