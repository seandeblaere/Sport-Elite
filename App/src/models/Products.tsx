import { makeAutoObservable } from "mobx";

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

class Product {
  id: string;
  name: string;
  sellerId: string;
  price: number;
  age: string;
  brand: string;
  grip: string;
  weight: string;
  imageUrl: string;

  constructor({
    id,
    name,
    sellerId,
    price,
    age,
    brand,
    grip,
    weight,
    imageUrl,
  }: IProduct) {
    this.id = id;
    this.name = name;
    this.sellerId = sellerId;
    this.price = price;
    this.age = age;
    this.brand = brand;
    this.grip = grip;
    this.weight = weight;
    this.imageUrl = imageUrl;

    makeAutoObservable(this);
  }

  changeName(newName: string) {
    this.name = newName;
  }

  get asJson() {
    return {
      id: this.id,
      name: this.name,
      sellerId: this.sellerId,
      price: this.price,
      age: this.age,
      brand: this.brand,
      grip: this.grip,
      weight: this.weight,
      imageUrl: this.imageUrl,
    };
  }
}

export default Product;
