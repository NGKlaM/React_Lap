interface Product {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    category: string;
  }
  export type DemoData = {
    products: Product[];
  }; 
  export default Product
  