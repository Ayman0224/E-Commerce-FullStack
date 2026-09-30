import { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Products() {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  const addToCart = (product) => {
    if (product.stock <= 0) {
      toast.error(`${product.name} is out of stock`);
      return;
    }

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              image: product.image,
              quantity: item.quantity + 1,
            }
          : item
      );

      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          image: product.image,
          quantity: 1,
        },
      ]);
    }

    toast.success(`${product.name} added to cart`);
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      const data = await response.json();

      setProducts(data);
    };

    getProducts();
  }, []);

  return (
    <main className="products-page">
      <ToastContainer
        position="top-right"
        autoClose={2500}
      />

      <div className="products-header">
        <h1>Our Products</h1>
        <p>
          Discover our latest products and add them to your cart.
        </p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              <img
                src={`/images/${product.image}`}
                alt={product.name}
              />
            </div>

            <div className="product-info">
              <h2>{product.name}</h2>

              <p className="product-description">
                {product.description}
              </p>

              <div className="product-bottom">
                <div>
                  <p className="product-price">
                    ${product.price}
                  </p>

                  <p className="product-stock">
                    {product.stock} in stock
                  </p>
                </div>

                <button
                  className={`add-cart-btn ${
                    product.stock === 0
                      ? "out-of-stock-btn"
                      : ""
                  }`}
                  onClick={() => addToCart(product)}
                >
                  {product.stock === 0
                    ? "Out of Stock"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Products;