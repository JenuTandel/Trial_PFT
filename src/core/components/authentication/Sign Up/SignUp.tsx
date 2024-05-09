import { Container, Flex } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { signUpFormConstants } from '../../../utility/constants/SignUp.constant';
import { ISignUpForm } from '../../../utility/models/signUp.model';
import AuthService from '../../../utility/services/auth-service';
import { useSignUpSubmitMutation } from '../../../utility/services/signUp.service';
import SignUpBg from './SignUpBg';
import { SignUpForm } from './SignUpForm';

export default function SignUp() {
  const [signUpSubmit] = useSignUpSubmitMutation();
  const [resetForm, setResetForm] = useState<boolean>(false);
  const authService = AuthService();
  const handleSignUpSubmit = (signUpDetails: ISignUpForm) => {
    signUpSubmit(signUpDetails as ISignUpForm).then((response: any) => {
      if ('data' in response) {
        if (response.data.message) {
          showNotification({
            title: 'Success',
            message: signUpFormConstants.successToaster,
            color: 'green',
          });
          setResetForm(true);
          authService.login();
        } else {
          showNotification({
            title: 'Error',
            message: response.data.error,
            color: 'red',
          });
          setResetForm(false);
        }
      }
    });
  };
  return (
    <Flex h="100%" style={{ flexDirection: 'column' }}>
      <Flex align="center" justify="center" style={{ flexGrow: 1 }} p="md">
        <Container size="60rem" display="flex" style={{ alignItems: 'center' }}>
          <Flex style={{ borderRadius: '10px' }} w={'100%'} bg="white">
            <SignUpBg />
            <SignUpForm
              onSignUpSubmit={handleSignUpSubmit}
              resetForm={resetForm}
            />
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
}
