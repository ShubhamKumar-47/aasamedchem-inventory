"use client";

import { useEffect, useState } from "react";
import { convertToBaseUnit } from "@/lib/conversions";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  baseUnit: string;
  pricePerBase: string;
}

export default function QuotationPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("ITEM");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        setProducts(data);

        if (data.length > 0) {
          setSelectedProduct(data[0]);
          setUnit(data[0].baseUnit);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    }

    fetchProducts();
  }, []);

  const converted = convertToBaseUnit(
    Number(quantity || 0),
    unit
  );

  const total =
    converted *
    Number(selectedProduct?.pricePerBase || 0);

  const handlePlaceOrder = async () => {
  if (!selectedProduct) {
    alert("Please select a product");
    return;
  }

  if (!quantity || Number(quantity) <= 0) {
    alert("Please enter quantity");
    return;
  }

  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Replace with your actual Seller ID
        userId: "cmpxm1yly00012ds0nyvh5jce",

        productId: selectedProduct.id,

        quantity: converted,

        unit: unit,

        totalPrice: total,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Failed to place order");
      return;
    }

    alert("✅ Order Placed Successfully");

    setQuantity("");
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Quotation Generator
      </h1>

      <div className="max-w-lg space-y-4">
        <div>
          <label className="block mb-2">
            Product
          </label>

          <select
            className="border p-2 w-full"
            value={selectedProduct?.id || ""}
            onChange={(e) => {
              const product = products.find(
                (p) => p.id === e.target.value
              );

              if (product) {
                setSelectedProduct(product);
                setUnit(product.baseUnit);
              }
            }}
          >
            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">
            Quantity
          </label>

          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            className="border p-2 w-full"
            placeholder="Enter quantity"
          />
        </div>

        <div>
          <label className="block mb-2">
            Unit
          </label>

          <select
            value={unit}
            onChange={(e) =>
              setUnit(e.target.value)
            }
            className="border p-2 w-full"
          >
            <option value="ITEM">
              ITEM
            </option>
            <option value="G">
              G
            </option>
            <option value="KG">
              KG
            </option>
            <option value="ML">
              ML
            </option>
            <option value="L">
              L
            </option>
          </select>
        </div>

        <div className="border p-4 mt-6 rounded">
          <h2 className="font-bold text-lg mb-3">
            Quotation Summary
          </h2>

          <p>
            <strong>Product:</strong>{" "}
            {selectedProduct?.name}
          </p>

          <p>
            <strong>Base Unit:</strong>{" "}
            {selectedProduct?.baseUnit}
          </p>

          <p>
            <strong>Price:</strong> ₹
            {selectedProduct?.pricePerBase}
            {" / "}
            {selectedProduct?.baseUnit}
          </p>

          <p>
            <strong>Ordered:</strong>{" "}
            {quantity || 0} {unit}
          </p>

          <p>
            <strong>Converted:</strong>{" "}
            {converted}{" "}
            {selectedProduct?.baseUnit}
          </p>

          <p>
            <strong>Total Price:</strong> ₹
            {total.toFixed(2)}
          </p>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}