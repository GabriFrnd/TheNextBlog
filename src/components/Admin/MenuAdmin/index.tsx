'use client';

import { CircleXIcon, FileTextIcon, HourglassIcon, HouseIcon, LogOutIcon, MenuIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';

import { usePathname } from 'next/navigation';
import { logoutAction } from '@/actions/login/logout-action';

import clsx from 'clsx';
import Link from 'next/link';

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navigationClasses = clsx(
    'bg-slate-900 text-slate-100',
    'flex flex-col',
    'mb-10',
    'rounded-lg',
    'sm:flex-row sm:flex-wrap sm:h-auto sm:overflow-visible',
    !isOpen && 'h-10',
    !isOpen && 'overflow-hidden',
  );

  const linkClasses = clsx(
    'flex',
    'cursor-pointer',
    'gap-2 h-10 px-4 shrink-0',
    'hover:bg-slate-800 transition',
    'items-center justify-start',
    'rounded-lg',
    '[&>svg]:h-[20px] [&>svg]:w-[20px]',
  );

  const buttonClasses = clsx(linkClasses, 'sm:hidden', 'text-blue-200');

  function handleLogout(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();

    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <nav className={navigationClasses}>
      <button
        className={buttonClasses}
        onClick={() => setIsOpen(state => !state)}
      >
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}

        {isOpen && (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>

      <a className={linkClasses} href='/' target='_blank'>
        <HouseIcon />
        Home
      </a>

      <Link className={linkClasses} href='/admin/post'>
        <FileTextIcon />
        Posts
      </Link>

      <Link className={linkClasses} href='/admin/post/new'>
        <PlusIcon />
        Criar Post
      </Link>

      <a className={linkClasses} href='#' onClick={handleLogout}>
        {isPending && (
          <>
            <HourglassIcon /> Aguarde ...
          </>
        )}

        {!isPending && (
          <>
            <LogOutIcon /> Sair
          </>
        )}
      </a>
    </nav>
  );
}
