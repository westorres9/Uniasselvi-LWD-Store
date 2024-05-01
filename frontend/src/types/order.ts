export class Order {
  id?: number;
  items:OrderItem[] = [];
  client?: Client;
  status?: string;
  get total(): number {
    let sum = 0;
    this.items.forEach((item) => {
      sum += item.subTotal;
    });
    return sum;
  }
}

export class OrderItem {
  constructor(
    public productId: number,
    public quantity: number,
    public name: string,
    public price: number,
    public imageUrl: string
  ) {}
  get subTotal(): number {
    return this.price * this.quantity;
  }
}

export type Client = {
  id: number;
  name: string;
}
