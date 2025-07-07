import { isUrlOrRelativePath } from '@/utils/is-url-or-relative-path';
import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'O título deve ter, no mínimo, 3 caracteres.')
    .max(120, 'O título deve ter, no máximo, 120 caracteres.'),
  content: z
    .string()
    .trim()
    .min(3, 'O conteúdo é obrigatório.')
    .transform(val => sanitizeHtml(val)),
  author: z
    .string()
    .trim()
    .min(4, 'O autor precisa de, no mínimo, 4 caracteres.')
    .max(100, 'O nome do autor não deve ter mais que 100 caracteres.'),
  excerpt: z
    .string()
    .trim()
    .min(3, 'O excerto precisa de, no mínimo, 3 caracteres.')
    .max(200, 'O excerto não deve ter mais que 200 caracteres.'),
  coverImageUrl: z.string().trim().refine(isUrlOrRelativePath, {
    message: 'A URL da capa deve ser uma URL ou caminho para imagem.',
  }),
  published: z
    .union([
      z.literal('on'),
      z.literal('true'),
      z.literal('false'),
      z.literal(true),
      z.literal(false),
      z.literal(null),
      z.literal(undefined),
    ])
    .default(false)
    .transform(val => val === 'on' || val === 'true' || val === true),
});

export const PostCreateSchema = PostBaseSchema;

export const PostUpdateSchema = PostBaseSchema.extend({
  // id: z.string().uuid('ID inválido.'),
});
