const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db"); // db.js

const app = express();
app.use(cors());
app.use(express.json());

app.get("/vendor-c/culinary", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM culinary");

    const data = result.rows.map(item => ({
      id: item.id,
      details: {
        name: item.name,
        category: item.category
      },
      pricing: {
        base_price: parseInt(item.price),
        tax: Math.round(parseInt(item.price) * 0.1)
      },
      stock: item.stock
    }));

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Tambahkan listen hanya untuk testing lokal
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; // tetap export untuk Vercel
