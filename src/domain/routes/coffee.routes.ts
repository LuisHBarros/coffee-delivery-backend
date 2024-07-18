import { Elysia } from "elysia";
import { ListCoffee } from "../services/coffee/list-coffee";

export const coffeeRoutes = new Elysia().get("/coffee", () => {
    const sut = new ListCoffee();
});
