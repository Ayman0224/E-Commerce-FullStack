import { useContext, useState } from "react";
import CartContext from "../context/CartContext";

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handlePayment = async () => {
    if (cart.length === 0) {
      return;
    }

    const token = localStorage.getItem("token");

    const sandboxResponse = await fetch(
      "https://e-commerce-fullstack5.onrender.com/api/payment/sandbox",
      {
        method: "POST",
      }
    );

    const sandboxData = await sandboxResponse.json();

    if (!sandboxData.success) {
      return;
    }

    const response = await fetch(
      "https://e-commerce-fullstack5.onrender.com/api/payment/pay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cart,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setCart([]);
      setPaymentSuccess(true);

      setTimeout(() => {
        setPaymentSuccess(false);
      }, 3500);
    }
  };

  return (
    <main className="checkout-page">
      {paymentSuccess && (
        <div className="payment-success-toast">
          <div className="success-check">✓</div>

          <div>
            <strong>Payment Successful!</strong>
            <p>Your order has been placed successfully.</p>
          </div>
        </div>
      )}

      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Review your order and complete your payment.</p>
      </div>

      <div className="checkout-content">
        <section className="checkout-order">
          <h2>Your Order</h2>

          <div className="checkout-items">
            {cart.map((product) => (
              <div className="checkout-item" key={product.id}>
                <div className="checkout-item-image">
                  <img
                    src={`/images/${
                      product.image || "iphone15.jfif"
                    }`}
                    alt={product.name}
                  />
                </div>

                <div className="checkout-item-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>

                  <span>
                    ${product.price} × {product.quantity}
                  </span>
                </div>

                <strong>
                  ${product.price * product.quantity}
                </strong>
              </div>
            ))}
          </div>
        </section>

        <aside className="checkout-summary">
          <div className="secure-payment">
            <span>🔒</span>

            <div>
              <strong>Secure Checkout</strong>
              <p>Payment processed securely</p>
            </div>
          </div>

          <h2>Order Summary</h2>

          <div className="checkout-summary-row">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="checkout-summary-total">
            <span>Total</span>
            <strong>${totalPrice}</strong>
          </div>

          <button
            className="payment-btn"
            onClick={handlePayment}
            disabled={cart.length === 0}
          >
            Pay Now
          </button>

          <p className="sandbox-note">
            This checkout uses a mock payment sandbox.
          </p>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;