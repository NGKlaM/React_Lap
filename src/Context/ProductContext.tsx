import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import Product from '../types';


interface State {
  products: Product[];
}

type Action =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_PRODUCT'; payload: Product };

const initialState: State = {
  products: [],
};

const ProductContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

const productReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>;
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
