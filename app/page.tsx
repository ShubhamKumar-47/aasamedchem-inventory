import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">
        AasaMedChem Inventory System
      </h1>

      <div className="space-x-4">
        <Link
          href="/admin/dashboard"
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Admin Panel
        </Link>

        <Link
          href="/seller/products"
          className="bg-green-600 px-4 py-2 rounded"
        >
          Seller Panel
        </Link>
      </div>
    </div>
  );
}