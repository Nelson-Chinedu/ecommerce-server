import { Product_Size, Stock } from '../db/entity/Product';

export interface IUser {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  country: string;
  emailAddress: string;
}

export interface IChangePasswordArgs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IUpdateProfileArgs extends IUser {
  gender: string;
  city: string;
  address: string;
  storeName?: string;
  currency?: string;
  imageUrl: string;
}

export interface IUpdateSettingArgs {
  storeName: string;
  currency: string;
}

export interface IAddProduct {
  name: string;
  description: string;
  sizes: Product_Size[];
  colors: string[];
  category: string;
  stock: Stock;
  sold?: string;
  tags: string[];
  oldPrice: string;
  newPrice: string;
  imageUrl: string;
}
