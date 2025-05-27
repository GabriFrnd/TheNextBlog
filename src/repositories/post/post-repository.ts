import { PostModel } from '@/models/post/post-model';

export interface PostRepository {
  findAllPublic(): Promise<PostModel[]> /* Método que retorna todos os posts (array) com published = true */;
  findBySlugPublic(slug: string): Promise<PostModel> /* Método que retorna apenas um post baseado no 'slug' */;
  findAll(): Promise<PostModel[]> /* Método que retorna posts (array), mesmo que não estejam com published = true */;
  findById(id: string): Promise<PostModel> /* Método que retorna apenas um post baseado no ID */;
}
