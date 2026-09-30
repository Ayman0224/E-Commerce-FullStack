import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const getUserId = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.userId;
    } catch {
      return null;
    }
  };

  const userId = getUserId();

  const [cart, setCart] = useState(() => {
    if (!userId) {
      return [];
    }

    const savedCart = localStorage.getItem(`cart_user_${userId}`);

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (!userId) {
      return;
    }

    localStorage.setItem(
      `cart_user_${userId}`,
      JSON.stringify(cart)
    );
  }, [cart, userId]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider };
export default CartContext;