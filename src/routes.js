import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "necessário preencher o título." }));
      }

      if (!description) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: "Necessário escrever a descrição da tarefa.",
          })
        );
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title && !description) {
        return res.writeHead(400).end(
          JSON.stringify({
            message:
              "É necessário preencher o título e a descrição para atualizar a tarefa.",
          })
        );
      }

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res.writeHead(404).end("Tarefa não encontrada.");
      }

      database.update("tasks", id, {
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: new Date(),
      });

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res.writeHead(404).end("Tarefa não encontrada.");
      }

      let completed_at = task.completed_at;
      
      if(completed_at) {
        completed_at = null;
      } else {
        completed_at = new Date();
      }

      // O código comentado abaixo apresenta outra forma válida de verificar o status da tarefa e marcá-la ou não como completa:
      // The commented code below presents another way to verify the task's status, and check it or not as completed

      // const isTaskCompleted = !!task.completed_at;
      // const completed_at = isTaskCompleted ? null : new Date();

      database.update("tasks", id, { completed_at });

      return res.writeHead(204).end();
    },
  },
];
