'use client';
import { ChangeEventHandler, ReactNode, useState } from 'react';
import { Card, Input, Spacer } from '@nextui-org/react';
import { createAuthLoginUiParams } from '../../../shared/domains/auth/auth.create';
import { AuthLoginUiParams } from '../../../shared/domains/auth/auth.uiState';

interface AuthLoginFormProps {
  onSubmit: (params: AuthLoginUiParams) => void;
  children: ReactNode;
}

export default function AuthLoginForm({
  children,
  onSubmit,
}: AuthLoginFormProps) {
  const [form, setForm] = useState(createAuthLoginUiParams());
  const [errorFieldNames, setErrorFieldNames] = useState<string[]>([]);
  const isErrorField = (name: string) => errorFieldNames.includes(name);

  const hasEmailError = isErrorField('email');
  const hasPasswordError = isErrorField('password');

  const handleChange: ChangeEventHandler<HTMLFormElement> = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setErrorFieldNames([]);

    let isErr = false;

    Object.entries(form).forEach(([key, value]) => {
      if (!value) {
        isErr = true;
        setErrorFieldNames((prev) => [...prev, key]);
      }
    });

    if (isErr) {
      return;
    }

    onSubmit(form);
  };

  return (
    <Card className="w-full p-5">
      <h1 className="text-2xl bold text-center mb-5">Login</h1>

      <form action={handleSubmit} onChange={handleChange}>
        <Input
          variant="underlined"
          isClearable
          fullWidth
          color={hasEmailError ? 'danger' : 'primary'}
          size="lg"
          errorMessage={hasEmailError && '해당 값을 입력해 주세요.'}
          name="email"
          placeholder="Email"
        />
        <Spacer y={1} />
        <Input
          variant="underlined"
          isClearable
          fullWidth
          color={hasPasswordError ? 'danger' : 'primary'}
          size="lg"
          name="password"
          type="password"
          placeholder="Password"
          className="mb-1.5"
          errorMessage={hasPasswordError && '해당 값을 입력해 주세요.'}
        />

        <Spacer y={4} />
        {children}
      </form>
    </Card>
  );
}
