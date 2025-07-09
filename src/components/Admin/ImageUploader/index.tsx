'use client';

import { Button } from '@/components/Button';
import { ImageUpIcon } from 'lucide-react';

import { useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

import { uploadImageAction } from '@/actions/upload/upload-image-action';
import clsx from 'clsx';

type ImageUploaderProps = {
  disabled?: boolean;
};

export function ImageUploader({ disabled = false }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState('');

  function handleChooseFile() {
    const fileInput = fileInputRef.current;

    if (!fileInput) return;
    fileInput.click();
  }

  function handleChange() {
    toast.dismiss();

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    const formData = new FormData();
    const uploadMaxSize = Number(process.env.NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE) || 921600;

    if (!fileInput) {
      setImageUrl('');
      return;
    }

    if (!file) {
      setImageUrl('');
      return;
    }

    if (file.size > uploadMaxSize) {
      const maxSize = (uploadMaxSize / 1024).toFixed(2);
      toast.error(`Imagem grande. Tamanho máximo permitido: ${maxSize} KB.`);

      fileInput.value = '';
      setImageUrl('');

      return;
    }

    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        fileInput.value = '';

        setImageUrl('');
        return;
      }

      setImageUrl(result.url);
      toast.success('Imagem enviada com sucesso!');
    });

    fileInput.value = '';
  }

  return (
    <div className={clsx('flex flex-col', 'gap-4 py-4')}>
      <Button className={clsx('self-start')} type='button' onClick={handleChooseFile} disabled={isUploading || disabled}>
        <ImageUpIcon />
        Enviar Imagem
      </Button>

      {!!imageUrl && (
        <div className={clsx('flex flex-col', 'gap-4')}>
          <p>
            <b>URL da imagem:</b> {imageUrl}
          </p>

          {/* eslint-disable-next-line */}
          <img className={clsx('rounded-lg')} src={imageUrl} alt='Imagem' />
        </div>
      )}

      <input
        className={clsx('hidden')}
        type='file'
        name='file'
        accept='image/*'
        ref={fileInputRef}
        onChange={handleChange}
        disabled={isUploading || disabled}
      />
    </div>
  );
}
