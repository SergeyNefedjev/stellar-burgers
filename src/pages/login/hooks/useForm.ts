import React, { useState } from 'react';

export function useForm<T extends { [key: string]: string }>(baseForm: T) {
  const [form, setForm] = useState<T>(baseForm);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((pastForm) => ({ ...pastForm, [e.target.name]: e.target.value }));
  }
  return [form, handleChange] as const;
}
