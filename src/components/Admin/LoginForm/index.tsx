'use client';

import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';

import { LogInIcon } from 'lucide-react';
import { useActionState } from 'react';

import { loginAction } from '@/actions/login/login-action';
import clsx from 'clsx';

export const dynamic = 'force-dynamic'; /* Rota dinâmica */

export function LoginForm() {
  const initialState = {
    username: '',
    error: '',
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);

  return (
    <div className={clsx('flex', 'items-center', 'justify-center', 'max-w-70 mb-32 mt-16 mx-auto')}>
      <form className={clsx('flex flex-1 flex-col', 'gap-6')} action={action}>
        <InputText
          type='text'
          name='username'
          label='Usuário'
          placeholder='Digite o seu nome de usuário'
          disabled={isPending}
          defaultValue={state.username}
        />

        <InputText
          type='password'
          name='password'
          label='Senha'
          placeholder='Digite a sua senha'
          disabled={isPending}
        />

        <Button className={clsx('mt-4', 'mx-auto')} type='submit' disabled={isPending}>
          <LogInIcon />
          <b>Entrar</b>
        </Button>

        {!!state.error && <p className={clsx('text-center', 'text-red-600')}><b>{state.error}</b></p>}
      </form>
    </div>
  );
}
