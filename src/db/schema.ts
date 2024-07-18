import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const coffees = sqliteTable("coffees", {
    id: integer("id").primaryKey({ autoIncrement: true }).unique(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    price: real("price").notNull(),
    image: text("image").notNull(),
    type: text("type").notNull(),
});
