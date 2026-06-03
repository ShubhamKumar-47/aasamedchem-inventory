import { prisma } from "@/lib/prisma";

export default async function SellerProductsPage() {
  const products =
    await prisma.product.findMany();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Available Products
      </h1>

      <table className="border w-full">
        <thead>
          <tr>
            <th className="border p-2">
              Name
            </th>

            <th className="border p-2">
              Category
            </th>

            <th className="border p-2">
              Unit
            </th>

            <th className="border p-2">
              Price
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">
                {product.name}
              </td>

              <td className="border p-2">
                {product.category}
              </td>

              <td className="border p-2">
                {product.baseUnit}
              </td>

              <td className="border p-2">
                ₹
                {product.pricePerBase.toString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}