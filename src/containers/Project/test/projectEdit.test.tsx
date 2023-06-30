import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { QueryClientMockProvider } from '@/utils/mockUtils/mockProvider';
import userEvent from '@testing-library/user-event';

// To Test
import ProjectEdit from '@/containers/Project/ProjectEdit';
import { updateProjectMockData } from '@/utils/mockUtils/mockProjectEdit';

jest.mock('@/hooks/useProject');

const renderProjectEdit = () => {
  render(
    <QueryClientMockProvider
      component={
        <ProjectEdit
          projectId={'123'}
          projectName="test"
          description="test"
          status="Completed"
        />
      }
    />
  );
};

afterEach(cleanup);

describe('Project Edit', () => {
  test('should edit project', async () => {
    updateProjectMockData();
    renderProjectEdit();
    const editButton = screen.getByTestId('EditIcon');
    await userEvent.click(editButton);

    const nameInput = screen.getByRole('textbox', { name: /Project Name/i });
    const descriptionInput = screen.getByRole('textbox', {
      name: /Description/i,
    });
    const statusInput = screen.getByRole('combobox', { name: /Status/i });
    const updateButton = screen.getByRole('button', { name: /Update/i });

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Miferia');
    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'Miferia description');
    await userEvent.click(statusInput);
    await userEvent.keyboard('Active');
    await userEvent.keyboard('{enter}');
    await userEvent.click(updateButton);

    expect(nameInput).toHaveValue('Miferia');
    expect(descriptionInput).toHaveValue('Miferia description');
    expect(statusInput).toHaveValue('Active');
    waitFor(() => {
      expect(updateButton).not.toBeInTheDocument();
    });
  });
  test('should close dialogbox when clicked cancel', async () => {
    updateProjectMockData();
    renderProjectEdit();
    const editButton = screen.getByTestId('EditIcon');
    await userEvent.click(editButton);

    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    await userEvent.click(cancelButton);
    waitFor(() => {
      expect(cancelButton).not.toBeInTheDocument();
    });
  });
});
