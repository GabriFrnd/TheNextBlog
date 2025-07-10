'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

type uploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(formData: FormData): Promise<uploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });
  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    return makeResult({ error: 'Faça login novamente.' });
  }

  const file = formData.get('file');

  const uploadMaxSize = Number(process.env.NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE) || 921600;
  const uploadDirectory = process.env.IMAGE_UPLOAD_DIRECTORY || 'uploads';

  const imageServerUrl = process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads';

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos.' });
  }

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido.' });
  }

  if (file.size > uploadMaxSize) {
    const maxSize = uploadMaxSize / 1024;
    return makeResult({ error: `Imagem grande. Tamanho máximo permitido: ${maxSize} KB.` });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem inválida.' });
  }

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const uploadFullPath = resolve(process.cwd(), 'public', uploadDirectory);
  await mkdir(uploadFullPath, { recursive: true });

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPath, uniqueImageName);
  await writeFile(fileFullPath, buffer);

  const url = `${imageServerUrl}/${uniqueImageName}`;
  return makeResult({ url });
}
