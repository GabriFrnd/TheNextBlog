import { JsonPostRepository } from '@/repositories/post/json-post-repository';
import { drizzleDataBase } from '.';
import { postsTable } from './schemas';

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll(); /* Todos os posts (publicados ou não) */

  try {
    await drizzleDataBase.delete(postsTable); /* 'delete' sem 'where' */
    await drizzleDataBase.insert(postsTable).values(posts);
  } catch(error) {
    console.log(`${error}.`);
  }
})();
