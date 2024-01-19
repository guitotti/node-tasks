import fs from "node:fs";
import { parse } from "csv-parse";

const path = new URL("./tasks.csv", import.meta.url);

const stream = fs.createReadStream(path);

const parser = stream.pipe(
  parse({
    delimiter: ",",
    skipEmptyLines: true,
    fromLine: 2,
  })
);

async function processFile() {
  for await (const record of parser) {
    const [title, description] = record;

    await fetch("http://localhost:3333/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    await wait(1000)
    console.log(record);
  }
}

processFile();

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}