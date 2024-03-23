import './App.css';
import { ProductProvider } from './Context/ProductContext';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';

function App() {
  return (
    <>
     <ProductProvider>
      <div>
        <h1>Gaming Gear Store</h1>
        <ProductList />
        <hr />
        <AddProduct />
      </div>
    </ProductProvider>
    </>

  );
}

export default App;
