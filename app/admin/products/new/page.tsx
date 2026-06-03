"use client";

import { useState } from "react";

export default function NewProductPage() {
  const [name, setName] =
    useState("");

  const [sku, setSku] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [baseUnit, setBaseUnit] =
    useState("G");

  const [stock, setStock] =
    useState("");

  const [price, setPrice] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        name,
        sku,
        category,
        baseUnit,
        stock: Number(stock),
        pricePerBase:
          Number(price),
      }),
    });

    alert("Product Added");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg"
      >
        <input
          placeholder="Product Name"
          className="border p-2 w-full"
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          placeholder="SKU"
          className="border p-2 w-full"
          onChange={(e) =>
            setSku(e.target.value)
          }
        />

        <input
          placeholder="Category"
          className="border p-2 w-full"
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        />

        <select
          className="border p-2 w-full"
          value={baseUnit}
          onChange={(e) =>
            setBaseUnit(
              e.target.value
            )
          }
        >
          <option>G</option>
          <option>KG</option>
          <option>ML</option>
          <option>L</option>
          <option>ITEM</option>
        </select>

        <input
          type="number"
          placeholder="Stock"
          className="border p-2 w-full"
          onChange={(e) =>
            setStock(
              e.target.value
            )
          }
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-2 w-full"
          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
        />

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}