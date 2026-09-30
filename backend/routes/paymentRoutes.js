const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../database");

const router = express.Router();

router.post("/sandbox", (req, res) => {
  res.json({
    success: true,
    message: "Payment approved",
    transactionId: "TXN-" + Date.now(),
  });
});

router.get("/", (req, res) => {
  res.send("Payment route is working");
});

router.post("/pay", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { cart } = req.body;

    const productsFromDatabase = [];

    for (const product of cart) {
      const row = await new Promise((resolve, reject) => {
        db.get(
          "SELECT id, name, price, stock FROM products WHERE id = ?",
          [product.id],
          (err, row) => {
            if (err) {
              reject(err);
            } else {
              resolve(row);
            }
          }
        );
      });

      if (!row) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product.quantity > row.stock) {
        return res.status(400).json({
          message: `Not enough stock for ${row.name}`,
        });
      }

      productsFromDatabase.push({
        ...row,
        quantity: product.quantity,
      });
    }

    const total = productsFromDatabase.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    db.serialize(() => {
      db.run(
        "INSERT INTO orders (user_id, total) VALUES (?, ?)",
        [decoded.userId, total],
        function (err) {
          if (err) {
            return res.status(500).json({
              message: "Order creation failed",
            });
          }

          const orderId = this.lastID;

          productsFromDatabase.forEach((product) => {
            db.run(
              "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
              [
                orderId,
                product.id,
                product.quantity,
                product.price,
              ]
            );

            db.run(
              "UPDATE products SET stock = stock - ? WHERE id = ?",
              [product.quantity, product.id]
            );
          });

          res.json({
            message: "Payment successful",
            userId: decoded.userId,
            orderId,
          });
        }
      );
    });
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
});

module.exports = router;