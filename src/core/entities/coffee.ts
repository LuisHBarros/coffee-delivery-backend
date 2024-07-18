export class Coffee {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    type: CoffeeTypes[];

    constructor(
        name: string,
        description: string,
        price: number,
        image: string,
        type: CoffeeTypes[]
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.type = type;
    }

    setId(id: number) {
        this.id = id;
    }
}

export enum CoffeeTypes {
    Espresso = "espresso",

    Latte = "latte",

    Cappuccino = "cappuccino",

    Americano = "americano",

    Mocha = "mocha",
}
