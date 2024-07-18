import { Elysia } from "elysia";
import { coffeeRoutes } from "./domain/routes/coffee.routes";

const app = new Elysia()
    .get("/", () => "Hello Elysia")
    .use(coffeeRoutes)
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

