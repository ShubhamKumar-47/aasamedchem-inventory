import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const totalProducts = await prisma.product.count();

  const totalOrders = await prisma.order.count();

  const pendingOrders = await prisma.order.count({
    where: {
      status: "PENDING",
    },
  });

  const approvedOrders = await prisma.order.count({
    where: {
      status: "APPROVED",
    },
  });

  const revenueOrders = await prisma.order.findMany({
    where: {
      status: "APPROVED",
    },
    select: {
      totalPrice: true,
    },
  });

  const totalRevenue = revenueOrders.reduce(
    (sum, order) =>
      sum + Number(order.totalPrice),
    0
  );

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

        <div className="border rounded-lg p-6">
          <h2 className="text-lg mb-2">
            Products
          </h2>

          <p className="text-4xl font-bold">
            {totalProducts}
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-lg mb-2">
            Orders
          </h2>

          <p className="text-4xl font-bold">
            {totalOrders}
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-lg mb-2">
            Pending
          </h2>

          <p className="text-4xl font-bold text-yellow-500">
            {pendingOrders}
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-lg mb-2">
            Approved
          </h2>

          <p className="text-4xl font-bold text-green-500">
            {approvedOrders}
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-lg mb-2">
            Revenue
          </h2>

          <p className="text-4xl font-bold">
            ₹{totalRevenue}
          </p>
        </div>

      </div>
    </div>
  );
}