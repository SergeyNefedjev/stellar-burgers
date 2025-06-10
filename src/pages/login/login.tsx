import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, selectError } from '../../services/slices/user-slice';
import { useForm } from './hooks/useForm';
export const Login: FC = () => {
  const error = useSelector(selectError);
  const [form, handleChange] = useForm({ email: '', password: '' });
  const dispatch = useDispatch();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginUser(form));
  };

  return (
    <LoginUI
      errorText={error}
      email={form.email}
      setEmail={(value) =>
        handleChange({
          target: { name: 'email', value }
        } as React.ChangeEvent<HTMLInputElement>)
      }
      password={form.password}
      setPassword={(value) =>
        handleChange({
          target: { name: 'password', value }
        } as React.ChangeEvent<HTMLInputElement>)
      }
      handleSubmit={handleSubmit}
    />
  );
};
