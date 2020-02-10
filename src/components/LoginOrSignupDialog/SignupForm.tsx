import React, { memo, useEffect, useState } from 'react';
import { emailRegexp, nameRegexp, passwordRegexp } from '../../constants';
import { useInputValue } from '../../hooks';
import { styled } from '../../styles';
import { Button } from '../../ui/button';
import { FormFields, TextField } from '../../ui/form';

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export interface SignupFormError {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

interface Props {
  loading?: boolean;
  error?: SignupFormError;
  clearValue?: boolean;
  className?: string;
  onSubmit?(formData: SignupFormData): void;
}

function SignupForm({ loading, error: defaultError = {}, clearValue, className, onSubmit }: Props) {
  const [name, setName, setNameValue] = useInputValue();
  const [email, setEmail, setEmailValue] = useInputValue();
  const [password, setPassword, setPasswordValue] = useInputValue();
  const [passwordConfirm, setPasswordConfirm, setPasswordConfirmValue] = useInputValue();

  const buttonDisabled =
    loading ||
    name.length === 0 ||
    email.length === 0 ||
    password.length === 0 ||
    passwordConfirm.length === 0;

  const [error, setError] = useState<SignupFormError>(defaultError);

  useEffect(() => {
    if (clearValue) {
      setNameValue('');
      setEmailValue('');
      setPasswordValue('');
      setPasswordConfirmValue('');
    }
  }, [setNameValue, setEmailValue, setPasswordValue, setPasswordConfirmValue, clearValue]);

  return (
    <Form
      onSubmit={event => {
        event.preventDefault();

        if (!nameRegexp.test(name)) {
          setError({
            name: '이름은 공백없이 2~20자로 정해주세요.',
          });
          return;
        } else if (!emailRegexp.test(email)) {
          setError({
            name: '이메일을 다시 확인해주세요',
          });
          return;
        } else if (!passwordRegexp.test(password)) {
          setError({
            password: '비밀번호를 다시 확인해주세요.',
          });
          return;
        } else if (password !== passwordConfirm) {
          setError({
            passwordConfirm: '비밀번호를 다시 확인해주세요.',
          });
          return;
        }

        setError({});
        onSubmit?.({
          name,
          email,
          password,
        });
      }}
      className={className}
    >
      <FormFields>
        <TextField
          type="text"
          value={name}
          placeholder="이름"
          error={error.name}
          onChange={setName}
        />
        <TextField
          type="email"
          value={email}
          placeholder="이메일"
          error={error.email}
          onChange={setEmail}
        />
        <TextField
          type="password"
          value={password}
          placeholder="비밀번호(영문+숫자 8~20자리)"
          error={error.password}
          onChange={setPassword}
        />
        <TextField
          type="password"
          value={passwordConfirm}
          placeholder="비밀번호 확인"
          error={error.passwordConfirm}
          onChange={setPasswordConfirm}
        />
      </FormFields>
      <SignupButton size={64} disabled={buttonDisabled} color="primary" buttonType="submit">
        회원가입
      </SignupButton>
    </Form>
  );
}

export default memo(SignupForm);

const Form = styled.form`
  display: block;
  margin: 0;
  padding: 0;
`;

const SignupButton = styled(Button)`
  margin-top: 40px;
  width: 100%;
`;
