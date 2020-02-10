import React, { memo, useEffect, useState } from 'react';
import { emailRegexp, passwordRegexp } from '../../constants';
import { useInputValue } from '../../hooks';
import { styled } from '../../styles';
import { Button } from '../../ui/button';
import { FormFields, TextField } from '../../ui/form';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormError {
  email?: string;
  password?: string;
}

interface Props {
  loading?: boolean;
  error?: LoginFormError;
  clearValue?: boolean;
  className?: string;
  onSubmit?(formData: LoginFormData): void;
}

function LoginForm({ loading, error: defaultError = {}, clearValue, className, onSubmit }: Props) {
  const [email, setEmail, setEmailValue] = useInputValue();
  const [password, setPassword, setPasswordValue] = useInputValue();

  const buttonDisabled = loading || email.length === 0 || password.length === 0;

  const [error, setError] = useState<LoginFormError>(defaultError);

  useEffect(() => {
    if (clearValue) {
      setEmailValue('');
      setPasswordValue('');
    }
  }, [setEmailValue, setPasswordValue, clearValue]);

  return (
    <Form
      onSubmit={event => {
        event.preventDefault();

        if (!emailRegexp.test(email)) {
          setError({
            email: '이메일을 다시 확인해주세요',
          });
          return;
        } else if (!passwordRegexp.test(password)) {
          setError({
            password: '비밀번호를 다시 확인해주세요.',
          });
          return;
        }

        setError({});
        onSubmit?.({
          email,
          password,
        });
      }}
      className={className}
    >
      <FormFields>
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
          placeholder="비밀번호"
          error={error.password}
          onChange={setPassword}
        />
      </FormFields>
      <LoginButton size={64} disabled={buttonDisabled} color="primary" buttonType="submit">
        로그인
      </LoginButton>
    </Form>
  );
}

export default memo(LoginForm);

const Form = styled.form`
  display: block;
  margin: 0;
  padding: 0;
`;

const LoginButton = styled(Button)`
  margin-top: 40px;
  width: 100%;
`;
