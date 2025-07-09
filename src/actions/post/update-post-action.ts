'use server';

import { makePartialPublicPost, makePublicPostFromDb, PublicPost } from '@/dto/post/dto';
import { PostUpdateSchema } from '@/lib/post/validations';

import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';

import { revalidateTag } from 'next/cache';

type UpdatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: true;
};

export async function updatePostAction( prevState: UpdatePostActionState, formData: FormData ): Promise<UpdatePostActionState> {
  let post;

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos.'],
    };
  }

  const id = formData.get('id')?.toString() || '';

  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['ID inválido.'],
    };
  }

  const formDataToObject = Object.fromEntries(formData.entries());
  const zodParsedObject = PostUpdateSchema.safeParse(formDataToObject);

  if(!zodParsedObject.success) {
    const errors = getZodErrorMessages(zodParsedObject.error.format());

    return {
      errors,
      formState: makePartialPublicPost(formDataToObject),
    }
  }

  const validPostData = zodParsedObject.data;

  const newPost = {
    ...validPostData,
  };

  try {
    post = await postRepository.update(id, newPost);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataToObject),
        errors: [error.message],
      }
    }

    return {
      formState: makePartialPublicPost(formDataToObject),
      errors: ['Erro desconhecido.'],
    }
  }

  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return {
    formState: makePublicPostFromDb(post),
    errors: [],
    success: true,
  }
}
