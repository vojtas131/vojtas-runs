import React from 'react';
import { Grommet } from 'grommet';
import UserPage from './pages/UserPage';

function App() {
  const theme = {
    global: {
      font: {
        family: 'Poppins',
        size: '14px',
        height: '20px',
      },
    },
  };

  return (
    <Grommet theme={theme}>
      <UserPage />
    </Grommet>
  );
}

export default App;
