import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserContext } from '../components/context/UserContext';
import Admin from '../components/admin/Admin';

test('renders "brak uprawnień" when user is not an admin', () => {
  const nonAdminUser = { user: { admin: false } };

  render(
    <UserContext.Provider value={nonAdminUser}>
      <Admin />
    </UserContext.Provider>
  );

  const noPermissionsText = screen.getByText(/brak uprawnień/i);
  expect(noPermissionsText).toBeInTheDocument();
});