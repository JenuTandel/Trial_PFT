import {
  Anchor,
  Box,
  Container,
  Divider,
  Flex,
  Image,
  Indicator,
  Text,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { PftRoutes } from '../../../core/utility/enums/core.enum';

export const Header = () => {
  return (
    <Box component="header" bg={'white'}>
      <Container
        size={'var(--mantine-container-width)'}
        h={'var(--mantine-header-height)'}
      >
        <Flex justify="space-between" h={'100%'} align={'center'}>
          {/* Left section of the header  */}
          <Flex>
            {/* Brand logo  */}
            <Box py={'xs'}>
              <Image w={'160px'} src="src/assets/images/brand-logo.svg" />
            </Box>

            <Divider mx="lg" my="lg" size="2" orientation="vertical" />
            {/* Navigation for the pages  */}
            <Flex columnGap={'xl'}>
              <Anchor
                component={NavLink}
                to={PftRoutes.PENDING_REQUESTS}
                className="navlink"
                underline="never"
              >
                Pending Requests
              </Anchor>
              <Anchor
                className="navlink"
                component={NavLink}
                to={PftRoutes.APPROVED_REQUESTS}
                underline="never"
              >
                Approved Requests
              </Anchor>
              <Anchor
                className="navlink"
                component={NavLink}
                to={PftRoutes.REJECTED_REQUESTS}
                underline="never"
              >
                Rejected Requests
              </Anchor>
              <Anchor
                className="navlink"
                component={NavLink}
                to={'/report-analytics'}
                underline="never"
              >
                Report and Analytics
              </Anchor>
            </Flex>
          </Flex>

          {/* Right section of the header  */}
          <Box display={'flex'} h={'100%'}>
            {/* Notification icon */}
            <Flex align={'center'} c={'var(--mantine-color-secondary)'}>
              <Indicator size={10} offset={3} zIndex={10} withBorder color="primary">
                <Text
                  component="span"
                  size={'xl'}
                  className="icon-notification cp"
                  opacity={0.7}
                ></Text>
              </Indicator>
            </Flex>
            <Divider
              size={2}
              mx="xl"
              my={'xs'}
              orientation="vertical"
            ></Divider>
            {/* Manage user profile  */}
            <Flex align={'center'} gap="sm">
              <Image src="src/assets/images/profile-thumb.svg" />
              <Text c="var(--mantine-color-secondary)" fw="600">
                Ravi Singh
              </Text>
              <Text component="span" size="xs" className="icon-arrow-up"></Text>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
