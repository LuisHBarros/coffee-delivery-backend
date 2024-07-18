import { Coffee, CoffeeTypes } from "../../entities/coffee";
import { db } from "../../../db/index";
import { coffees as coffeeSchema } from "../../../db/schema";
import { CoffeeRepository } from "../coffee-repository";
import { sql } from "drizzle-orm";

export class CoffeeRepositoryImpl implements CoffeeRepository {
    async save(coffee: Coffee): Promise<void> {
        await db
            .insert(coffeeSchema)
            .values({
                name: coffee.name,
                description: coffee.description,
                price: coffee.price,
                image: coffee.image,
                type: coffee.type.join(", "),
            })
            .execute();
    }
    async findAll(): Promise<Coffee[]> {
        const result = await db.select().from(coffeeSchema).execute();
        return result.map((coffee) => {
            return new Coffee(
                coffee.name,
                coffee.description,
                coffee.price,
                coffee.image,
                [CoffeeTypes[coffee.type as keyof typeof CoffeeTypes]]
            );
        });
    }
    async findById(id: number): Promise<Coffee | null> {
        const coffeeArray = await db
            .select()
            .from(coffeeSchema)
            .where(sql`${coffeeSchema.id} = ${id}`)
            .execute();
        return coffeeArray.length > 0
            ? new Coffee(
                  coffeeArray[0].name,
                  coffeeArray[0].description,
                  coffeeArray[0].price,
                  coffeeArray[0].image,
                  [CoffeeTypes[coffeeArray[0].type as keyof typeof CoffeeTypes]]
              )
            : null;
    }
}
