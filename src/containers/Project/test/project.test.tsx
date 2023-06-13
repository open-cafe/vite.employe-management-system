// Imports
import { render, screen, cleanup } from '@testing-library/react';
import { QueryClientMockProvider } from '@/utils/mockUtils/mockProvider';
import userEvent from '@testing-library/user-event';

// To Test
import Project from '@/containers/Project';
import {
  emptyProjectMockData,
  errorProjectMockData,
  fullProjectMockData,
  loadingProjectMockData,
  projectMockData,
} from '@/utils/mockUtils/mockProject';

// Mock useNavigate
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('@/hooks/useProject');

const renderProject = () => {
  render(<QueryClientMockProvider component={<Project />} />);
};

afterEach(cleanup);

// Tests
describe('Project', () => {
  test('should render project page without data', async () => {
    loadingProjectMockData();
    renderProject();
  });

  test('should render project page with data', async () => {
    projectMockData();
    renderProject();
    expect(screen.getByText(/Jest/i)).toBeInTheDocument();
  });

  test('should render project page with empty data', async () => {
    emptyProjectMockData();
    renderProject();
    expect(screen.getByText(/No Project Found/i)).toBeInTheDocument();
  });

  test('should render project page with error', async () => {
    errorProjectMockData();
    renderProject();
    expect(screen.getByText(/Something went wrong !/i)).toBeInTheDocument();
  });

  test('should navigate to project detail page', async () => {
    projectMockData();
    renderProject();
    const project = screen.getByText(/Jest/i);
    await userEvent.click(project);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/projectdetail', {
      state: {
        description: 'It is a test automation framework',
        projectId: '6b6270f8-1f08-476e-a56b-139844bc0552',
        projectName: 'Jest',
        status: 'Active',
      },
    });
  });

  test('should change page when clicked to the next page', async () => {
    fullProjectMockData();
    renderProject();
    // Click to the next page
    const nextButton = screen.getByRole('button', { name: 'Go to next page' });
    await userEvent.click(nextButton);

    // Check if the page is changed or not (TO be discussed later)
    expect(screen.getByText(/11/i)).toBeInTheDocument();

    // Check if the rowperPageOption can be changed or not
    const rowsPerPage = screen.getByRole('button', { name: /Rows Per Page:/i });
    await userEvent.click(rowsPerPage);
    const rowsPerPageOption = screen.getByRole('option', { name: /25/i });
    await userEvent.click(rowsPerPageOption);
    expect(screen.getByText(/25/i)).toBeInTheDocument();
  });
});
