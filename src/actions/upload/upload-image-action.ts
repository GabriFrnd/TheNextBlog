'use server';

import { IMAGE_SERVER_URL, IMAGE_UPLOAD_DIRECTORY, IMAGE_UPLOADER_MAX_SIZE } from '@/lib/constants';
import { asyncDelay } from '@/utils/async-delay';

import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

type uploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(formData: FormData): Promise<uploadImageActionResult> {
  await asyncDelay(5000);

  const makeResult = ({ url = '', error = '' }) => ({ url, error });
  const file = formData.get('file');

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos.' });
  }

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido.' });
  }

  if (file.size > IMAGE_UPLOADER_MAX_SIZE) {
    const maxSize = IMAGE_UPLOADER_MAX_SIZE / 1024;
    return makeResult({ error: `Imagem grande. Tamanho máximo permitido: ${maxSize} KB.` });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem inválida.' });
  }

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const uploadFullPath = resolve(process.cwd(), 'public', IMAGE_UPLOAD_DIRECTORY);
  await mkdir(uploadFullPath, { recursive: true });

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPath, uniqueImageName);
  await writeFile(fileFullPath, buffer);

  const url = `${IMAGE_SERVER_URL}/${uniqueImageName}`;
  return makeResult({ url });
}
