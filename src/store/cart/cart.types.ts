export type Item = {
    upc: string;
    description: string;
    quantity: number;
    price: number;
    promotion: Promotion;
}

export type Promotion = {
    description: string;
    amount: number;
}

export type AddItem = {
    ItemSold: Item;
    DiscountApplied: Promotion;
  }
