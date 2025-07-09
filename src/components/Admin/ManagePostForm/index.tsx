'use client';

import { Button } from '@/components/Button';
import { useActionState, useEffect, useState } from 'react';

import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';

import { ImageUploader } from '../ImageUploader';
import { InputCheckBox } from '@/components/InputCheckBox';

import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { createPostAction } from '@/actions/post/create-post-action';

import { toast } from 'react-toastify';
import { updatePostAction } from '@/actions/post/update-post-action';

import { useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';

type ManagePostFormUpdateProps = {
  mode: 'update';
  publicPost: PublicPost;
};

type ManagePostFormCreateProps = {
  mode: 'create';
};

type ManagePostFormProps = ManagePostFormUpdateProps | ManagePostFormCreateProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;
  const searchParams = useSearchParams();

  const created = searchParams.get('created');
  const router = useRouter();

  let publicPost;

  if (mode === 'update') publicPost = props.publicPost;

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  };

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };

  const [state, action, isPending] = useActionState(actionsMap[mode], initialState);

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(error => toast.error(error));
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success('Post atualizado com sucesso!');
    }
  }, [state]);

  useEffect(() => {
    if (created === '1') {
      toast.dismiss();
      toast.success('Post criado com sucesso!');

      const url = new URL(window.location.href);
      url.searchParams.delete('created');

      router.replace(url.toString());
    }
  }, [created, router]);

  const { formState } = state;
  const [contentValue, setContentValue] = useState(publicPost?.content || '');

  return (
    <form className={clsx('mb-16')} action={action}>
      <div className={clsx('flex flex-col', 'gap-6')}>
        <InputText
          type='text'
          label='ID do Post'
          name='id'
          placeholder='ID gerado automaticamente'
          defaultValue={formState.id}
          readOnly
          disabled={isPending}
        />

        <InputText
          type='text'
          label='Slug do Post'
          name='slug'
          placeholder='Slug gerada automaticamente'
          defaultValue={formState.slug}
          readOnly
          disabled={isPending}
        />

        <InputText
          type='text'
          label='Autor do Post'
          name='author'
          placeholder='Digite o seu nome'
          defaultValue={formState.author}
          disabled={isPending}
        />

        <InputText
          type='text'
          label='Título do Post'
          name='title'
          placeholder='Digite o título do seu post'
          defaultValue={formState.title}
          disabled={isPending}
        />

        <InputText
          type='text'
          label='Excerto do Post'
          name='excerpt'
          placeholder='Escreva um resumo para o seu post'
          defaultValue={formState.excerpt}
          disabled={isPending}
        />

        <MarkdownEditor
          label='Conteúdo do Post'
          value={contentValue}
          setValue={setContentValue}
          textAreaName='content'
          disabled={isPending}
        />

        <ImageUploader disabled={isPending} />

        <InputText
          type='text'
          label='URL da Imagem de Capa do Post'
          name='coverImageUrl'
          placeholder='Digite a URL da imagem de capa do seu post'
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
        />

        <InputCheckBox
          type='checkbox'
          label='Post Publicado'
          name='published'
          defaultChecked={formState.published}
          disabled={isPending}
        />

        <div className={clsx('mt-4')}>
          <Button type='submit' disabled={isPending}>Enviar</Button>
        </div>
      </div>
    </form>
  );
}
