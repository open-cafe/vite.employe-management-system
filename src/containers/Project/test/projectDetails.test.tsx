// Imports
import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import { QueryClientMockProvider } from '@/utils/mockUtils/mockProvider';
import userEvent from '@testing-library/user-event';

// To Test
import ProjectDetail from '@/containers/Project/ProjectDetails';
import {
  addProjectAssignmentErrorMockData,
  addProjectAssignmentMockData,
  allEmployeeMockData,
  currentUserMockData,
  deleteProjectAssignmentMockData,
  deleteProjectAssignmentErrorMockData,
  deleteProjectErrorMockData,
  deleteProjectMockData,
  projectAssignmentErrorMockData,
  projectAssignmentsLoadingMock,
  projectAssignmentsMockData,
  projectByIdMockData,
} from '@/utils/mockUtils/mockProjectDetails';
import { MemoryRouter } from 'react-router-dom';

// Mock InvakidataQueries
const invalidateQueries = jest.fn();

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: () => ({
    invalidateQueries,
  }),
}));

// Mock useNavigate
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('@/hooks/useCurrentUser');
jest.mock('@/hooks/useProjectAssignments');
jest.mock('@/hooks/useProjectById');
jest.mock('@/hooks/useAllEmployee');
jest.mock('@/hooks/useDeleteProjectAssignment');
jest.mock('@/hooks/useDeleteProject');
jest.mock('@/hooks/useAddProjectAssignment');

const mockUseLocationValue = {
  state: {
    projectId: '123',
  },
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => mockUseLocationValue),
}));

const renderProjectDetail = () => {
  render(
    <MemoryRouter>
      <QueryClientMockProvider component={<ProjectDetail />} />
    </MemoryRouter>
  );
};

afterEach(() => {
  cleanup;
  mockedUsedNavigate.mockRestore();
  invalidateQueries.mockRestore();
});

describe('Project Detail', () => {
  test('should render circularprogress when loading', async () => {
    projectAssignmentsLoadingMock();
    currentUserMockData();
    projectByIdMockData();
    allEmployeeMockData();
    deleteProjectAssignmentMockData();
    deleteProjectMockData();
    addProjectAssignmentMockData();
    renderProjectDetail();

    // Check if the circular progress is displayed
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('should render project detail', async () => {
    projectAssignmentsMockData();
    currentUserMockData();
    projectByIdMockData();
    allEmployeeMockData();
    deleteProjectAssignmentMockData();
    deleteProjectMockData();
    addProjectAssignmentMockData();
    renderProjectDetail();

    // Check if the project name is displayed
    expect(screen.getByText(/Miferia/i)).toBeInTheDocument();
  });

  test('should render project detail page with error', async () => {
    projectAssignmentErrorMockData();
    currentUserMockData();
    projectByIdMockData();
    allEmployeeMockData();
    deleteProjectAssignmentMockData();
    deleteProjectMockData();
    addProjectAssignmentMockData();
    renderProjectDetail();

    // Check if the error message is displayed
    expect(screen.getByText(/Something went wrong !/i)).toBeInTheDocument();
  });

  test('should not delete project as there are project assignments', async () => {
    projectAssignmentsMockData();
    currentUserMockData();
    projectByIdMockData();
    allEmployeeMockData();
    deleteProjectAssignmentMockData();
    deleteProjectErrorMockData();
    addProjectAssignmentMockData();
    renderProjectDetail();

    // Click on project delete button
    const deleteButton = screen.getByTestId('delete-project');
    await userEvent.click(deleteButton);

    // Check if the error message is displayed
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardError');
    expect(
      screen.getByText(
        /Cannot Delete Project!! Employees are assigned to the project/i
      )
    ).toBeInTheDocument();
  });

  test('should add project assignment', async () => {
    projectAssignmentsMockData();
    currentUserMockData();
    projectByIdMockData();
    allEmployeeMockData();
    deleteProjectAssignmentMockData();
    deleteProjectMockData();
    addProjectAssignmentMockData();
    renderProjectDetail();

    const employeeAutoComplete = screen.getByRole('combobox', {
      name: /Employee/i,
    });

    const addProjectAssignmentButton = screen.getByRole('button', {
      name: /add employee/i,
    });

    act(() => {
      employeeAutoComplete.focus();
      // type employee Name
      fireEvent.change(employeeAutoComplete, {
        target: { value: 'Shreyam Pokharel' },
      });
    });

    // navigate to the first item in the autocomplete box
    fireEvent.keyDown(employeeAutoComplete, { key: 'ArrowDown' });

    // select element
    fireEvent.keyDown(employeeAutoComplete, { key: 'Enter' });

    // Check if the employee name is displayed in the autocomplete box
    expect(employeeAutoComplete).toHaveValue('Shreyam Pokharel');

    await userEvent.click(addProjectAssignmentButton);

    // Check if the adding project assignment invalidates the project assignment query
    expect(invalidateQueries).toHaveBeenCalledWith(['project-assignment']);
  });

  test('should not add project assignment as there are no employees', async () => {
    projectAssignmentsMockData();
    currentUserMockData();
    projectByIdMockData();
    allEmployeeMockData();
    deleteProjectAssignmentMockData();
    deleteProjectMockData();
    addProjectAssignmentErrorMockData();
    renderProjectDetail();

    const addProjectAssignmentButton = screen.getByRole('button', {
      name: /add employee/i,
    });

    await userEvent.click(addProjectAssignmentButton);

    // Check if the error message is displayed
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardError');
  });

  test('should delete project', async () => {
    projectAssignmentsMockData();
    currentUserMockData();
    projectByIdMockData();
    allEmployeeMockData();
    deleteProjectAssignmentMockData();
    deleteProjectMockData();
    addProjectAssignmentMockData();
    renderProjectDetail();

    const deleteButton = screen.getByTestId('delete-project');
    await userEvent.click(deleteButton);

    // Check if the deleting project invalidates the project query and navigates to project page
    waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/project');
      expect(invalidateQueries).toHaveBeenCalledWith(['project']);
    });
  });

  test('should delete project Assignment', async () => {
    projectAssignmentsMockData();
    currentUserMockData();
    projectByIdMockData();
    allEmployeeMockData();
    deleteProjectAssignmentMockData();
    deleteProjectMockData();
    addProjectAssignmentMockData();
    renderProjectDetail();

    const deleteProjectAssignmentButton = screen.getByTestId(
      'delete-project-assignment'
    );
    await userEvent.click(deleteProjectAssignmentButton);

    // Check if the deleting project assignment invalidates the project assignment query
    expect(invalidateQueries).toHaveBeenCalledWith(['project-assignment']);
  });

  test('should not delete project assignment as there are no project assignments', async () => {
    projectAssignmentsMockData();
    currentUserMockData();
    projectByIdMockData();
    allEmployeeMockData();
    deleteProjectAssignmentErrorMockData();
    deleteProjectMockData();
    addProjectAssignmentMockData();
    renderProjectDetail();

    // Click on project delete button
    const deleteProjectAssignmentButton = screen.getByTestId(
      'delete-project-assignment'
    );
    await userEvent.click(deleteProjectAssignmentButton);

    // Check if the error message is displayed
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardError');
  });
});
