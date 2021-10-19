export interface IChangePasswordArgs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IUpdateProfileArgs {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  gender: string;
  region: string;
  city: string;
  country: string;
  address: string;
  imageUrl: string;
}

export interface IAddProduct {
  productName: string;
  productDescription: string;
  productSizes: string[];
  colors: string[];
  category: string;
  stock: 'In-stock' | 'Out-of-stock';
  sold: string;
  tags: string[];
  // revenue: string;
  oldPrice: string;
  newPrice: string;
}
