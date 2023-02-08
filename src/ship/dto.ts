export interface CreateShipInput {
  name: string;
  souls: number;
  price: number;
}

export interface GetShipOutput {
  name: string;
  souls: number;
  price: number;
}