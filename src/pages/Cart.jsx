import { useContext } from "react";
import CartContext from "../context/CartContext";

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(
      (product) => product.id !== productId
    );

    setCart(updatedCart);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((product) =>
      product.id === productId
        ? {
            ...product,
            quantity: product.quantity + 1,
          }
        : product
    );

    setCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((product) =>
      product.id === productId && product.quantity > 1
        ? {
            ...product,
            quantity: product.quantity - 1,
          }
        : product
    );

    setCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <main className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>Review your products before checkout.</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map((product) => (
            <div className="cart-item" key={product.id}>
              <div className="cart-item-image">
                <img
                  src={`/images/${product.image}`}
                  alt={product.name}
                />
              </div>

              <div className="cart-item-info">
                <h2>{product.name}</h2>
                <p>{product.description}</p>

                <span className="cart-item-price">
                  ${product.price}
                </span>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-control">
                  <button
                    onClick={() => decreaseQuantity(product.id)}
                  >
                    -
                  </button>

                  <span>{product.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(product.id)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>${totalPrice}</strong>
          </div>

          <button
            className="checkout-btn"
            onClick={() => (window.location.href = "/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
}

export default Cart;