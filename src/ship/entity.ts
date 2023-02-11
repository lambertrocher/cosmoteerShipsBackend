export class ShipEntity {
  id: string;
  name: string;
  souls: number;
  price: number;

  constructor(data: {
    id: string;
    name: string;
    souls: number;
    price: number;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.souls = data.souls;
    this.price = data.price;
  }
}