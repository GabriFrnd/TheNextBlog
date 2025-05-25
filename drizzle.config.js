import { defineConfig } from 'drizzle-kit';

/*
  . out: Diretório de saída para os arquivos gerados pelo Drizzle;
  . schema: caminho para o arquivo que define o banco de dados;
  . dialect: tipo de banco de dados que será usado;
  . dbCredentials: configura as credenciais do banco de dados;
  . url: usa o valor da variável de ambiente para localizar o arquivo SQLite.
*/

export default defineConfig({
  out: './src/db/drizzle/migrations',
  schema: './src/db/drizzle/schemas.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: './db.sqlite3',
  },
});
