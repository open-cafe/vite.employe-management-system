// Imports
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { QueryClientMockProvider } from '@/utils/mockUtils/mockProvider';
import userEvent from '@testing-library/user-event';

// To Test
import ProjectAssignmentDetails from '@/containers/Project/ProjectAssignmentDetails';
import { MemoryRouter } from 'react-router-dom';
import {
  addProjectDesignationByAssignmentMockDataError,
  deleteProjectDesignationByAssignmentMockDataError,
  projectDesignationByAssignmentMockData,
  tagMockData,
} from '@/utils/mockUtils/mockProjectAssignmentDetails';

// Mock useNavigate
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('@/hooks/useTag');
jest.mock('@/hooks/useProjectDesignationByAssignment');

const renderProjectAssignmentDetail = (isAdmin: boolean) => {
  render(
    <MemoryRouter>
      <QueryClientMockProvider
        component={
          <ProjectAssignmentDetails
            projectAssignmentId={'123'}
            isAdmin={isAdmin}
          />
        }
      />
    </MemoryRouter>
  );
};

afterEach(() => {
  cleanup;
  mockedUsedNavigate.mockRestore();
});

describe('Project Assignment Details', () => {
  test('should open dialog box and close it ', async () => {
    tagMockData();
    projectDesignationByAssignmentMockData();
    renderProjectAssignmentDetail(true);

    const addTagButton = screen.getByRole('button', { name: /Add Tag/i });
    await userEvent.click(addTagButton);

    // Check if the dialog Box is rendered and cancel button is present
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    expect(cancelButton).toBeInTheDocument();
    expect(
      screen.getByText(/You can add one Tag at a time/i)
    ).toBeInTheDocument();

    // Close the dialog box
    await userEvent.click(cancelButton);
    waitFor(() => {
      expect(
        screen.queryByRole('button', { name: /Cancel/i })
      ).not.toBeInTheDocument();
    });
  });

  test('should open dialog box and add tag ', async () => {
    tagMockData();
    projectDesignationByAssignmentMockData();
    renderProjectAssignmentDetail(true);

    const addTagButton = screen.getByRole('button', { name: /Add Tag/i });
    await userEvent.click(addTagButton);

    // Check if the dialog Box is rendered and cancel button is present
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    expect(cancelButton).toBeInTheDocument();
    expect(
      screen.getByText(/You can add one Tag at a time/i)
    ).toBeInTheDocument();

    // Add tag
    const tagInputAutocComplete = screen.getByRole('combobox', {
      name: /Tag/i,
    });
    const submitButton = screen.getByRole('button', { name: /Add/i });

    tagInputAutocComplete.focus();

    await userEvent.type(tagInputAutocComplete, 'Frontend');

    // navigate to the first item in the autocomplete box
    await userEvent.type(tagInputAutocComplete, '{arrowdown}');
    // select element
    await userEvent.type(tagInputAutocComplete, '{enter}');

    await userEvent.click(submitButton);

    // Check if the dialogbox is closed
    waitFor(() => {
      expect(
        screen.queryByRole('button', { name: /Cancel/i })
      ).not.toBeInTheDocument();
    });
  });

  test('should not render Add tag if the role is Employee ', async () => {
    tagMockData();
    projectDesignationByAssignmentMockData();
    renderProjectAssignmentDetail(false);

    // Check if the Add Tag is not present

    const addTagButton = screen.queryByRole('button', { name: /Add Tag/i });
    expect(addTagButton).not.toBeInTheDocument();
  });

  test('should show snackbar when error occurs while adding tag ', async () => {
    tagMockData();
    addProjectDesignationByAssignmentMockDataError();
    renderProjectAssignmentDetail(true);

    const addTagButton = screen.getByRole('button', { name: /Add Tag/i });
    await userEvent.click(addTagButton);

    // Check if the dialog Box is rendered and cancel button is present
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    expect(cancelButton).toBeInTheDocument();
    expect(
      screen.getByText(/You can add one Tag at a time/i)
    ).toBeInTheDocument();

    // Add tag
    const tagInputAutocComplete = screen.getByRole('combobox', {
      name: /Tag/i,
    });
    const submitButton = screen.getByRole('button', { name: /Add/i });

    tagInputAutocComplete.focus();

    await userEvent.type(tagInputAutocComplete, 'Frontend');

    // navigate to the first item in the autocomplete box
    await userEvent.type(tagInputAutocComplete, '{arrowdown}');
    // select element
    await userEvent.type(tagInputAutocComplete, '{enter}');

    await userEvent.click(submitButton);

    // Check if the dialogbox is closed
    waitFor(() => {
      expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardError');
    });
  });

  test('should show snackbar when error occurs while deleting tag ', async () => {
    tagMockData();
    deleteProjectDesignationByAssignmentMockDataError();
    renderProjectAssignmentDetail(true);

    const deleteTagChipButton = screen.getByTestId('CancelIcon');

    await userEvent.click(deleteTagChipButton);

    // Check if the Backend tag is deleted and snackbar is shown
    waitFor(() => {
      expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardError');
      expect(
        screen.getByText(/Error while deleting Project Designation/i)
      ).toBeInTheDocument();
    });
  });

  test('should delete tag using chip ', async () => {
    tagMockData();
    projectDesignationByAssignmentMockData();
    renderProjectAssignmentDetail(true);

    const deleteTagChipButton = screen.getByTestId('CancelIcon');
    await userEvent.click(deleteTagChipButton);

    // Check if the Backend tag is deleted and snackbar is shown
    waitFor(() => {
      expect(screen.queryByText(/Backend/i)).not.toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardSuccess');
      expect(
        screen.getByText(/Deleted Project Designation Successfully/i)
      ).toBeInTheDocument();
    });
  });
});
