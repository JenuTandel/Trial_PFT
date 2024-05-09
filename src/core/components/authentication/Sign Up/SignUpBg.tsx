import { BackgroundImage, Box, Divider, Image, Text } from '@mantine/core';
import AsideBg from '../../../../assets/images/aside-bg.jpg';
import AsideLogo from '../../../../assets/images/aside-logo.svg';

export default function SignUpBg() {
  return (
    <BackgroundImage
      src={AsideBg}
      radius="sm"
      w={'50%'}
      style={{ borderRadius: '10px 0 0 10px' }}
    >
      <Box
        h={'100%'}
        bg={'var(--mantine-color-secondary)'}
        p={50}
        style={{ opacity: '0.8', borderRadius: '10px 0 0 10px' }}
      >
        <Box c="white">
          <Image src={AsideLogo} />
          <Text fz={40} fw={700} mt={50} mb={20} lh={1.2}>
            Your Path To Financial Freedom
          </Text>
          <Divider my="md" w={70} size={4} />
          <Text>
            Take control of your finances with ease using our Personal Finance
            Tracker
          </Text>
        </Box>
      </Box>
    </BackgroundImage>
  );
}
