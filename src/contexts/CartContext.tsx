import { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  code: string;
  region: string;
}
interface CartContextValue {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (code: string, region: string) => void;
  removeItemCart: (indice: number) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const rawCart = localStorage.getItem("codeList");
    return rawCart ? (JSON.parse(rawCart) as CartItem[]) : [];
  });

  useEffect(() => {
    localStorage.setItem("codeList", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (code: string, region: string): void => {
    setCart((prev) => [...prev, { code, region }]);
  };

  const removeItemCart = (indice: number): void => {
    setCart((prev) => prev.filter((_, i) => indice !== i) )
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeItemCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("O useCart deve ser usado dentro de um provider. Tab1 ou Tab2");
  }
  return context;
};
