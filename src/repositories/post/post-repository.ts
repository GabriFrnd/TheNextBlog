import { PostModel } from '@/models/post/post-model';

export interface PostRepository {
  findAllPublic(): Promise<PostModel[]> /* Método que retorna todos os posts (array) */;
  findById(id: string): Promise<PostModel> /* Método que retorna apenas um post baseado no ID */;
}
