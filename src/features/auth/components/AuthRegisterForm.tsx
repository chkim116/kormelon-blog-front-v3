'use client';
import { ChangeEventHandler, ReactNode, useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Input,
  Spacer,
} from '@nextui-org/react';
import { toast } from '@shared2/services/ToastService';
import { createAuthRegisterUiParams } from '../domains/auth.create';
import { AuthRegisterUiParams } from '../domains/auth.uiState';

interface AuthRegisterFormProps {
  profileImage: string;
  onSubmit: (params: AuthRegisterUiParams) => void;
  onUpload: (fd: FormData) => void;
  children: ReactNode;
}

export default function AuthRegisterForm({
  profileImage,
  onSubmit,
  onUpload,
  children,
}: AuthRegisterFormProps) {
  const [form, setForm] = useState(createAuthRegisterUiParams());
  const [errorFieldNames, setErrorFieldNames] = useState<string[]>([]);
  const isErrorField = (name: string) => errorFieldNames.includes(name);

  const hasEmailError = isErrorField('email');
  const hasPasswordError = isErrorField('password');
  const hasUserError = isErrorField('username');

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

  const handleChange: ChangeEventHandler<HTMLFormElement> = (e) => {
    const { name, value } = e.target;

    if (!name) {
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) {
      toast.open('error', '파일이 올바르지 않습니다.');
      return;
    }

    const file = e.target.files[0];

    const fd = new FormData();
    fd.append('image', file);

    onUpload(fd);
  };

  useEffect(() => {
    setForm((prev) => ({ ...prev, profileImage }));
  }, [profileImage]);

  return (
    <Card className="w-full p-5">
      <h1 className="text-2xl bold text-center mb-5">Register</h1>

      <form onChange={handleChange} action={handleSubmit}>
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
        <Spacer y={1} />
        <Input
          variant="underlined"
          isClearable
          fullWidth
          color={hasUserError ? 'danger' : 'primary'}
          size="lg"
          name="username"
          placeholder="Username"
          className="mb-1.5"
          errorMessage={hasUserError && '해당 값을 입력해 주세요.'}
        />
        <div className="m-1 flex-col items-center justify-center">
          <div className="flex justify-center items-center py-2">
            <Avatar src={profileImage} size="lg" />
          </div>

          <Button fullWidth as="label">
            Upload Profile
            <input
              accept="image/*"
              type="file"
              hidden
              onChange={handleUpload}
            />
          </Button>
        </div>
        <Spacer y={4} />

        <Divider />

        <Spacer y={4} />

        {children}
      </form>
    </Card>
  );
}
