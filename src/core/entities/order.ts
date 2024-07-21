import { Coffee } from "./coffee";

export class Order {
    id: number;
    client: Client;
    products: Card[];
    address: Address;

    constructor(client: Client, products: Card[], address: Address) {
        this.client = client;
        this.products = products;
        this.address = address;
    }

    setId(id: number) {
        this.id = id;
    }
}

export class Card {
    product: Coffee;
    quantity: number;

    constructor(product: Coffee, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}

export class Address {
    cep: string;
    street: string;
    number: number;
    complement: string;
    district: string;
    city: string;
    state: string;

    constructor(
        cep: string,
        street: string,
        number: number,
        complement: string,
        district: string,
        city: string,
        state: string
    ) {
        this.cep = cep;
        this.street = street;
        this.number = number;
        this.complement = complement;
        this.district = district;
        this.city = city;
        this.state = state;
    }
}

export class Client {
    name: string;
    tel: string;

    constructor(name: string, tel: string) {
        this.name = name;
        this.tel = tel;
    }
}

