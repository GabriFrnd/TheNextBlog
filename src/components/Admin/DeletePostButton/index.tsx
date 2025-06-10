'use client';

import { Trash2Icon } from 'lucide-react';
import { deletePostAction } from '@/actions/post/delete-post-action';

import { Dialog } from '@/components/Dialog';
import { useState, useTransition } from 'react';

import { toast } from 'react-toastify';
import clsx from 'clsx';

type DeletePostButtonProps = {
  id: string;
  title: string;
};

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);

  function handleClick() {
    setShowDialog(true);
  }

  function handleConfirm() {
    toast.dismiss();

    startTransition(async () => {
      const result = await deletePostAction(id);
      setShowDialog(false);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success('Post excluído com sucesso!');
    });
  }

  return (
    <>
      <button
        className={clsx(
          'cursor-pointer',
          'hover:scale-120',
          'disabled:cursor-not-allowed',
          'disabled:text-slate-500',
          'hover:text-red-700',
          'text-red-500',
          'transition',
        )}
        onClick={handleClick}
        disabled={isPending}
        aria-label={`Apagar post: ${title}`}
        title={`Apagar post: ${title}`}
      >
        <Trash2Icon />
      </button>

      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title='Deseja deletar o post?'
          content={`Você tem certeza que deseja deletar o post: ${title.toLocaleLowerCase()}?`}
          onCancel={() => setShowDialog(false)}
          onConfirm={handleConfirm}
          disabled={isPending}
        />
      )}
    </>
  );
}
