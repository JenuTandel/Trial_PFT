import {
  Anchor,
  Box,
  Button,
  Flex,
  NumberInput,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { signUpInitialValues } from '../../../utility/constants/SignUp.constant';
import {
  ISignUpForm,
  ISignUpFormProps,
} from '../../../utility/models/signUp.model';
import AuthService from '../../../utility/services/auth-service';
import { signUpFormValidationSchema } from '../../../utility/validations/signUp.validation';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


export const SignUpForm: React.FC<ISignUpFormProps> = ({
  onSignUpSubmit,
  resetForm,
}) => {
  const { loginWithRedirect, loginWithPopup } = useAuth0();

  useEffect(() => {
    if (resetForm) {
      signUpForm.reset();
    }
  }, [resetForm]);
  const authService = AuthService();
  const initialSignUpValues: ISignUpForm = signUpInitialValues;
  const signUpForm = useForm({
    initialValues: {
      ...initialSignUpValues,
    },
    validate: yupResolver(signUpFormValidationSchema),
    validateInputOnChange: true,
    validateInputOnBlur: true,
  });
  /**
   * This method is called on submit
   * @param values : values for submition
   */
  const handleSubmit = (values: ISignUpForm) => {
    let signUpSubmitValues = { ...values };
    delete signUpSubmitValues.confirmPassword;
    signUpSubmitValues.phoneNumber = signUpSubmitValues.phoneNumber.toString();
    onSignUpSubmit(signUpSubmitValues);
  };

  const largeScreen = useMediaQuery('(min-width: 1400px)');
  return (
    <Box px={70} py={30} w={'50%'}>
      {/* Sign-up title  */}
      <Title order={2} mb="lg">
        Sign Up
      </Title>

      {/* Start: Sign-up form  */}
      <form onSubmit={signUpForm.onSubmit(handleSubmit)}>
        <Flex gap={20} mb="sm">
          <TextInput
            withAsterisk
            size={largeScreen ? 'lg' : 'md'}
            leftSection={<span className="icon icon-user" />}
            label="First Name"
            placeholder="First name"
            labelProps={{ style: { fontSize: '14px' } }}
            key={signUpForm.key('firstName')}
            {...signUpForm.getInputProps('firstName')}
          />

          <TextInput
            size={largeScreen ? 'lg' : 'md'}
            leftSection={<span className="icon icon-user" />}
            label="Last Name"
            placeholder="Last name"
            labelProps={{ style: { fontSize: '14px' } }}
            key={signUpForm.key('lastName')}
            {...signUpForm.getInputProps('lastName')}
          />
        </Flex>

        <NumberInput
          hideControls
          size={largeScreen ? 'lg' : 'md'}
          maxLength={10}
          mb="sm"
          leftSection={<span className="icon icon-phone" />}
          label="Phone"
          placeholder="Phone"
          labelProps={{ style: { fontSize: '14px' } }}
          key={signUpForm.key('phoneNumber')}
          {...signUpForm.getInputProps('phoneNumber')}
        />

        <TextInput
          withAsterisk
          size={largeScreen ? 'lg' : 'md'}
          mb="sm"
          leftSection={<span className="icon icon-email" />}
          label="Email ID"
          placeholder="Email ID"
          labelProps={{ style: { fontSize: '14px' } }}
          key={signUpForm.key('email')}
          {...signUpForm.getInputProps('email')}
        />

        <PasswordInput
          withAsterisk
          size={largeScreen ? 'lg' : 'md'}
          mb="sm"
          leftSection={<span className="icon icon-password" />}
          label="Password"
          placeholder="Password"
          labelProps={{ style: { fontSize: '14px' } }}
          key={signUpForm.key('passwordHash')}
          {...signUpForm.getInputProps('passwordHash')}
        />

        <PasswordInput
          withAsterisk
          size={largeScreen ? 'lg' : 'md'}
          mb="lg"
          leftSection={<span className="icon icon-password" />}
          label="Confirm Password"
          placeholder="Confirm Password"
          labelProps={{ style: { fontSize: '14px' } }}
          key={signUpForm.key('confirmPassword')}
          {...signUpForm.getInputProps('confirmPassword')}
        />

        <Button fullWidth size={largeScreen ? 'lg' : 'md'} type="submit">
          SUBMIT
        </Button>
      </form>
      {/* End: Sign-up form  */}

      <Flex justify="center" mt="lg">
        {/* Redirection link text */}
        <Text c="var(--mantine-color-grey)" pr="3px">
          Already have an account?
        </Text>
        {/* Redirection link */}
        <Anchor fw={700} underline="never" onClick={() => loginWithRedirect()}>
          Sign in Here
        </Anchor>
      </Flex>
    </Box>
  );
};
