const express = require("express");
const cors = require("cors");
const db = require("./db"); // db.js

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint untuk daftar culinary
app.get("/vendor-c/culinary", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM culinary");

    const data = result.rows.map(item => ({
      id: item.id,
      details: {
        name: item.name || "",
        category: item.category || ""
      },
      pricing: {
        base_price: parseInt(item.price) || 0,
        tax: Math.round((parseInt(item.price) || 0) * 0.1)
      },
      stock: item.stock || 0
    }));

    res.json(data);
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint info vendor
app.get("/vendor-c/info", async (req, res) => {
  try {
    const result = await db.query("SELECT COUNT(*) FROM culinary");

    res.json({
      ok: true,
      vendor: "Vendor C - Kuliner",
      total_products: parseInt(result.rows[0].count)
    });
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Listen untuk testing lokal
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app untuk Vercel
module.exports = app;
