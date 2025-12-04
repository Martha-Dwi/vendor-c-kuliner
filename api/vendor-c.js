const db = require("../db"); // koneksi database

export default async function handler(req, res) {
  try {
    const result = await db.query("SELECT * FROM culinary");

    const data = result.rows.map(item => ({
      id: item.id + 500, // sesuaikan format Vendor C
      details: {
        name: item.name,
        category: item.category
      },
      pricing: {
        base_price: item.price,
        tax: Math.round(item.price * 0.1) // pajak 10%
      },
      stock: item.stock
    }));

    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
