import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';

import { resolve } from 'path';
import { readFile } from 'fs/promises';

const ROOT_DIR = process.cwd(); /* Caminho da raiz do projeto */
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'posts.json',
); /* Caminho para o arquivo 'posts.json' */

const SIMULATE = 0;

export class JsonPostRepository implements PostRepository {
  private async simulateWait() {
    if (SIMULATE <= 0) return;
    await new Promise(resolve => setTimeout(resolve, SIMULATE));
  }

  private async readFromDisk(): Promise<PostModel[]> {
    /* Método privado para leitura de arquivo 'posts.json' */
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8');
    const parsedJson = JSON.parse(jsonContent);
    const { posts } = parsedJson;

    return posts;
  }

  async findAllPublic(): Promise<PostModel[]> {
    /* Método que retorna todos os posts (array) com published = true */
    await this.simulateWait();
    const posts = await this.readFromDisk();

    return posts.filter(post => post.published);
  }

  async findAll(): Promise<PostModel[]> {
    /* Método que retorna posts (array), mesmo que não estejam com published = true */
    await this.simulateWait();
    const posts = await this.readFromDisk();

    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    /* Método que retorna apenas um post baseado no ID */
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.id === id);

    if (!post) throw new Error('Post não encontrado.');
    return post;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    /* Método que retorna apenas um post baseado no 'slug' */
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.slug === slug);

    if (!post) throw new Error('Post não encontrado.');
    return post;
  }
}
