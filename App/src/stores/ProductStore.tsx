import { makeAutoObservable } from "mobx";
import Product from "../models/Products";

interface IProduct {
  id: string;
  name: string;
  sellerId: string;
  price: number;
  age: string;
  brand: string;
  grip: string;
  weight: string;
  imageUrl: string;
}

class ProductStore {
  products: Product[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setProducts(products: IProduct[]) {
    this.products = products.map((product) => new Product(product));
  }

  addProduct(product: IProduct) {
    this.products.push(new Product(product));
  }

  removeProduct(productId: string) {
    this.products = this.products.filter((product) => product.id !== productId);
  }
}

export default ProductStore;
