// Imports
import { render, screen } from '@testing-library/react';
import { QueryClientMockProvider } from '@/utils/mockUtils/mockProvider';

// To Test
import AddProject from '@/containers/AddProject';

const renderAddProject = () => {
  render(<QueryClientMockProvider component={<AddProject />} />);
};
// Tests
describe('Add Project', () => {
  test('renders add project form', () => {
    renderAddProject();
    const nameInput = screen.getByLabelText(/Project Name/i);
    const descriptionInputs = screen.getByLabelText(/Description/i);
    const submitButton = screen.getByRole('button', { name: /Add Project/i });

    expect(nameInput).toBeInTheDocument();
    expect(descriptionInputs).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
