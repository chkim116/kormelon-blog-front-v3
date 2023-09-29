import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Card, Input, Button, Spacer } from '@nextui-org/react';
import { AuthLoginParamsModel } from '@domain/uiStates';
import { createAuthLoginParamsModel } from '@domain/manipulates';

interface AuthLoginFormProps {
  isLoading: boolean;
  onSubmit: (params: AuthLoginParamsModel) => void;
}

export const AuthLoginForm = ({ isLoading, onSubmit }: AuthLoginFormProps) => {
  const [form, setForm] = useState(createAuthLoginParamsModel());
  const [errorFieldNames, setErrorFieldNames] = useState<string[]>([]);
  const isErrorField = (name: string) => errorFieldNames.includes(name);

  const hasEmailError = isErrorField('email');
  const hasPasswordError = isErrorField('password');

  const handleChange: ChangeEventHandler<HTMLFormElement> = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

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

      <form onChange={handleChange} onSubmit={handleSubmit}>
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
        <Button
          className="w-full"
          type="submit"
          color="primary"
          data-cy="signInButton"
          isLoading={isLoading}
        >
          Sign in
        </Button>
      </form>
    </Card>
  );
};
