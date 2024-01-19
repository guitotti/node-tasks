## 🧩 **Projeto desenvolvido para estudo pessoal.**

Projeto desenvolvido para o desafio referente do módulo de Fundamentos do Node.js, da trilha de Node.js da Rocketseat

### 🎯 Desafio

Desenvolver uma API para realizar o CRUD de suas *tasks* (tarefas).

A API deve conter as seguintes funcionalidades:

- Criação de uma task
- Listagem de todas as tasks
- Atualização de uma task pelo `id`
- Remover uma task pelo `id`
- Marcar pelo `id` uma task como completa
- E o verdadeiro desafio: Importação de tasks em massa por um arquivo CSV via stream

A aplicação deve ser desenvolvida sem a utilização de frameworks; apenas com os módulos nativos do Node.js.

## 🛸 Tecnologias

### ⚛️ Tecnologias & 📚 Bibliotecas e Dependências:

- [Node.js](https://nodejs.org/en/)
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

- [csv-parser](https://csv.js.org/parse/) 
- [nodemon](https://.npmjs.com/package/nodemon)

## :information_source: Passo-a-passo

Para clonar e rodar a aplicação, será necessário [Git](https://git-scm.com), [Node.js v14.16](https://nodejs.org/en/) ou versão mais recente + [NPM v8](https://nodejs.org/en/) ou mais recente instalados. 
Linhas de comando:

```bash
# Clonar o repositório
$ git clone https://github.com/guitotti/node-tasks

# Navegar até o repositório
$ cd node-tasks

# Instalar dependências
$ npm install

# Rodar o projeto em ambiente de desenvolvimento
$ npm run dev
```

Para rodar o script de importação das tarefas via CSV:

```bash

# Navegar até o repositório
$ cd node-tasks

# Rodar o script através do comando abaixo
$ node src/streams/csv-parser.js
```

