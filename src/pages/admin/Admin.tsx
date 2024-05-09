import { Box, Flex } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';

function Admin() {
  return (
    <Flex direction="column" h="100%">
      <Header />
      <Box h="100%" style={{ overflow: 'auto' }}>
        <Outlet />
      </Box>
    </Flex>
  );
}

export default Admin;
