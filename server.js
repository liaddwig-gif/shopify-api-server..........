import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

app.use(express.static("public"));

// Serve dashboard
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard", "index.html"));
});

// Example API - Get products
app.get("/api/products", async (req, res) => {
  try {
    const response = await fetch(`https://${SHOPIFY_STORE}/admin/api/2025-01/products.json`, {
      headers: {
        "X-Shopify-Access-Token": ACCESS_TOKEN,
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
