import React, { memo } from 'react';
import { useInputValue } from '../../hooks';
import { styled } from '../../styles';
import { Button } from '../../ui/button';
import { FormFields, TextField } from '../../ui/form';

export interface LoginFormData {
  email: string;
  password: string;
}

interface Props {
  className?: string;
  onSubmit?(formData: LoginFormData): void;
}

function LoginForm({ className, onSubmit }: Props) {
  const [email, setEmail] = useInputValue();
  const [password, setPassword] = useInputValue();

  const buttonDisabled = email.length === 0 || password.length === 0;

  return (
    <Form
      onSubmit={event => {
        event.preventDefault();
        onSubmit?.({
          email,
          password,
        });
      }}
      className={className}
    >
      <FormFields>
        <TextField type="email" value={email} placeholder="이메일" onChange={setEmail} />
        <TextField type="password" value={password} placeholder="비밀번호" onChange={setPassword} />
      </FormFields>
      <LoginButton size={64} disabled={buttonDisabled} color="primary" buttonType="submit">
        로그인
      </LoginButton>
    </Form>
  );
}

export default memo(LoginForm);

const Form = styled.form``;

const LoginButton = styled(Button)`
  margin-top: 40px;
  width: 100%;
`;
