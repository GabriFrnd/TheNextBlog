import { drizzle } from 'drizzle-orm/better-sqlite3';
import { postsTable } from './schemas';

import { resolve } from 'path';
import Database from 'better-sqlite3';

/*
  . migrate: aplica migrações pendentes no banco de dados;
  . generate: gera arquivos de migração baseados nas diferenças entre o esquema do código e o banco de dados;
  . push: aplica mudanças diretamente no banco de dados, sem usar arquivos de migração;
  . pull: extrai o esquema atual do banco e o sincroniza com o código do projeto.
*/

const sqliteDataBasePath = resolve(process.cwd(), 'db.sqlite3');
const sqliteDataBase = new Database(sqliteDataBasePath);

export const drizzleDataBase = drizzle(sqliteDataBase, {
  schema: {
    posts: postsTable,
  },
  logger: true,
});
