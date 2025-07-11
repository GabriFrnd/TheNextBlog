# 🖥️ Servidor — Iniciando o Projeto do Zero

Este guia descreve os passos necessários para configurar e iniciar o servidor localmente do zero.

## ✅ Pré-requisitos

- **Node.js** instalado (versão recomendada: consulte o `package.json`).
- Acesso a um banco de dados compatível com a aplicação.
- Criar e configurar o arquivo `.env.local`.

## 📦 Instalação de dependências

Instale todos os pacotes necessários:

```sh
npm install
```

## ⚙️ Configuração do ambiente

Crie um arquivo `.env.local` na raiz do projeto e adicione as variáveis de ambiente exigidas (ex: conexão com banco, chaves de API, etc).

## 🧱 Migrações do banco de dados

Execute as migrações para preparar o schema do banco:

```sh
npm run migrate
```

## 🌱 Seed (opcional)

Insira dados iniciais no banco de dados:

```sh
npm run seed
```

> O uso do seed é opcional e depende da necessidade de dados de teste ou padrão.

## 🚀 Build e execução do servidor

Gere a versão de produção do projeto:

```sh
npm run build
```

Inicie o servidor em modo de produção (recomendado apenas para testes locais):

```sh
npm start
```
